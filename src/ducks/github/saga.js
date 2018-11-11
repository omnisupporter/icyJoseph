import { all, takeLatest, call, put, select, take } from "redux-saga/effects";

import {
  selectRepos,
  selectUser,
  FETCH_USER_REPOS,
  SUCCESS_USER_REPOS,
  FAILED_REPOS,
  FETCH_USER_DATA,
  SUCCESS_USER_DATA,
  FAILED_USER_DATA,
  LOAD_TOTAL_CONTRIBUTIONS,
  LOAD_LANGUAGES,
  FETCH_REPOS_TOPICS,
  SUCCESS_REPOS_TOPICS
} from "./";

import {
  getUser,
  getUserRepos,
  getRepoContributors,
  getRepoLanguages,
  getRepoTopics
} from "./api";

import {
  curry,
  flatten,
  filterf,
  mapf,
  pipe,
  sort,
  keys
} from "../../functional";
import { selectToken, FETCH_TOKEN, SUCCESS_TOKEN } from "../auth";

const buildLang = (aggregate, lang) => ({
  lang,
  bytes: aggregate[lang]
});

export function* loadUser({ payload }) {
  yield put({ type: FETCH_TOKEN });
  try {
    yield take(SUCCESS_TOKEN);
    const token = yield select(selectToken);
    const user = yield call(getUser, payload, token);
    yield put({ type: SUCCESS_USER_DATA, payload: user });
  } catch (error) {
    yield put({ type: FAILED_USER_DATA, error });
  }
}

export function* loadRepos({ payload }) {
  yield put({ type: FETCH_TOKEN });
  try {
    yield take(SUCCESS_TOKEN);
    const token = yield select(selectToken);
    const repos = yield call(getUserRepos, payload, token);

    const now = new Date();
    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);

    yield put({ type: SUCCESS_USER_REPOS, payload: repos, expiry: inOneHour });
    yield put({ type: FETCH_REPOS_TOPICS });
  } catch (error) {
    yield put({ type: FAILED_REPOS, error });
  }
}

export function* loadContributions() {
  yield all([take(SUCCESS_USER_REPOS), take(SUCCESS_USER_DATA)]);

  const token = yield select(selectToken);
  const repos = yield select(selectRepos);
  const { login } = yield select(selectUser);

  const ownedByUser = repos.filter(
    ({ owner, fork }) => owner.login === login && !fork
  );

  const contributors = yield all(
    ownedByUser.map(({ name }) => call(getRepoContributors, login, name, token))
  );

  const userContributions = flatten(contributors).filter(
    contributor => contributor.login === login
  );

  const totalContributions = userContributions.reduce(
    (acc, { contributions }) => acc + contributions,
    0
  );

  yield put({ type: LOAD_TOTAL_CONTRIBUTIONS, payload: totalContributions });
}

export function* loadLanguages() {
  yield all([take(SUCCESS_USER_REPOS), take(SUCCESS_USER_DATA)]);

  const token = yield select(selectToken);
  const repos = yield select(selectRepos);
  const { login } = yield select(selectUser);

  const ownedByUser = repos.filter(
    ({ owner, fork }) => owner.login === login && !fork
  );
  const languages = yield all(
    ownedByUser.map(({ name }) => call(getRepoLanguages, login, name, token))
  );

  const aggregate = languages.reduce((acc, val) => {
    return {
      ...acc,
      ...Object.keys(val).reduce(
        (repo, curr) => ({
          ...repo,
          [curr]: acc[curr] ? acc[curr] + val[curr] : val[curr]
        }),
        {}
      )
    };
  }, {});

  const aggregator = curry(buildLang)(aggregate);

  const format = pipe(
    keys,
    curry(mapf)(aggregator),
    curry(filterf)(({ bytes }) => bytes >= 10000),
    curry(sort)("bytes")
  )(aggregate);

  yield put({ type: LOAD_LANGUAGES, payload: format });
}

export function* loadTopics() {
  const token = yield select(selectToken);
  const repos = yield select(selectRepos);
  const { login } = yield select(selectUser);

  const ownedByUser = repos.filter(({ owner }) => owner.login === login);

  const payload = yield all(
    ownedByUser.map(({ name }) => call(getRepoTopics, login, name, token))
  );

  yield put({ type: SUCCESS_REPOS_TOPICS, payload });
}

export function* gitHubSaga() {
  yield all([
    takeLatest(FETCH_USER_REPOS, loadRepos),
    takeLatest(FETCH_USER_DATA, loadUser),
    takeLatest(FETCH_USER_REPOS, loadContributions),
    takeLatest(FETCH_USER_REPOS, loadLanguages),
    takeLatest(FETCH_REPOS_TOPICS, loadTopics)
  ]);
}
