import { fromByteArray } from "base64-js";

import { yearRange } from "helpers";
import { GET_USER, GET_YEAR_CONTRIBUTIONS } from "lib/github/queries";

import { ICY_JOSEPH } from "./constants";

const redactedGitHubRepositoryData = (
  data: IcyJoseph.GitHub["contributionsCollection"]["commitContributionsByRepository"]
) => {
  return data
    .filter(({ repository }) => {
      const ownedByViewer = repository.owner.login === ICY_JOSEPH;

      const active = !repository.isArchived && !repository.isDisabled;

      if (ownedByViewer) return active;

      const isPublic = !repository.isPrivate;

      return isPublic;
    })
    .map((entry) => {
      const hideUrl =
        entry.repository.isPrivate ||
        entry.repository.isArchived ||
        entry.repository.isDisabled;

      const ownedByViewer = entry.repository.owner.login === ICY_JOSEPH;

      return {
        ...entry,
        repository: {
          ...entry.repository,
          url: hideUrl ? "" : entry.repository.url,
          homepageUrl: ownedByViewer ? entry.repository.homepageUrl : "",
        },
      };
    });
};

type GitHubProfile = Omit<
  IcyJoseph.GitHub,
  "repositoryDiscussionComments" | "repositories"
> & {
  repositoryDiscussionComments: {
    totalCount: number;
    repositories: string[];
  };
};

type GitHubLanguages = Array<IcyJoseph.LanguageEdge>;

const btoa = (str: string) => {
  const bytes = new TextEncoder().encode(str);

  return fromByteArray(bytes);
};

const githubAuth = {
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Basic ${btoa(
      `icyJoseph:${process.env.GITHUB_TOKEN || ""}`
    )}`,
    "Content-Type": "application/json",
  },
};

export const queryGitHub = <Response>(
  query: string,
  variables: Record<string, string>
): Promise<{ data: Response }> =>
  fetch(`${githubAuth.baseURL}/graphql`, {
    method: "POST",
    headers: githubAuth.headers,
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());

export const gitHubProfile = async (): Promise<{
  profile: GitHubProfile;
  languages: GitHubLanguages;
}> => {
  const githubData = await queryGitHub<{ user: IcyJoseph.GitHub }>(GET_USER, {
    login: ICY_JOSEPH,
    ...yearRange(),
  }).then(({ data }) => data.user);

  const { repositories, ...otherData } = githubData;

  const profile: GitHubProfile = {
    ...otherData,
    contributionsCollection: {
      ...githubData.contributionsCollection,
      commitContributionsByRepository: redactedGitHubRepositoryData(
        githubData.contributionsCollection.commitContributionsByRepository
      ),
    },
    repositoryDiscussionComments: {
      totalCount: githubData.repositoryDiscussionComments.totalCount,
      repositories: [
        ...new Set(
          githubData.repositoryDiscussionComments.nodes.map(
            ({ discussion }) => discussion.repository.name
          )
        ),
      ],
    },
  };

  const languagesAggregate: Map<string, IcyJoseph.LanguageEdge> = new Map();

  repositories.nodes.forEach((curr) => {
    if (curr.isArchived) return;

    curr.languages.edges.forEach((lang) => {
      if (!lang) return;

      const current = languagesAggregate.get(lang.node.name) || lang;

      if (current !== lang) {
        current.size += lang.size;
      }

      languagesAggregate.set(lang.node.name, current);
    });
  });

  const topLanguages = Array.from(languagesAggregate.entries())
    .sort((lhs, rhs) => rhs[1].size - lhs[1].size)
    .map(([_, value]) => value)
    .slice(0, 4);

  const languages = topLanguages;

  return {
    profile,
    languages,
  };
};

type ContributionData = IcyJoseph.GitHub["contributionsCollection"];

export const gitHubContributions = async (
  year: number
): Promise<ContributionData> => {
  const variables = { ...yearRange(year), login: ICY_JOSEPH };

  const { data } = await queryGitHub<{
    user: Pick<IcyJoseph.GitHub, "contributionsCollection">;
  }>(GET_YEAR_CONTRIBUTIONS, variables);

  const githubData = {
    ...data.user.contributionsCollection,
    commitContributionsByRepository: redactedGitHubRepositoryData(
      data.user.contributionsCollection.commitContributionsByRepository
    ),
  };

  return githubData;
};
