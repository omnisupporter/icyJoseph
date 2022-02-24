declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GA_TRACKING_ID: string;
    MEILISEARCH_URL: string;
    MEILISEARCH_KEY: string;
    MEILISEARCH_INDEX: string;
  }
}

declare namespace IcyJoseph {
  export type Rank = {
    rank: number;
    name: string;
    color: string;
    score: number;
  };

  type Ranks = {
    overall: Rank;
    languages: Record<string, Rank>;
  };

  type CodeWars = {
    name: string;
    username: string;
    honor: number;
    clan: string;
    leaderboardPosition: number;
    ranks: Ranks;
    codeChallenges: { totalCompleted: number };
  };

  export type LanguageEdge = {
    node: {
      id: string;
      name: string;
      color: string;
    };
    size: number;
  };

  export type Repository = {
    id: string;
    name: string;
    description: string | undefined | null;
    owner: {
      login: string;
    };
    isArchived: boolean;
    isDisabled: boolean;
    isFork: boolean;
    isPrivate: boolean;
    diskUsage: number;
    homepageUrl: string;
    url: string;
    languages: {
      /**
       * The query backing this type up, uses only up-to 3 languages
       */
      edges: Array<LanguageEdge | null>;
      totalSize: number;
      totalCount: number;
    };
  };

  type ContributionCollection = {
    startedAt: string;
    endedAt: string;
    joinedGitHubContribution: {
      occurredAt: string;
    };
    totalCommitContributions: number;
    restrictedContributionsCount: number;
    totalRepositoryContributions: number;
    contributionYears: number[];
    commitContributionsByRepository: Array<{
      contributions: {
        totalCount;
      };
      repository: Repository;
    }>;
  };

  export type GitHub = {
    bio: string;
    name: string;
    company: string;
    location: string;
    login: string;
    avatarUrl: string;
    contributionsCollection: ContributionCollection;
  };

  export type Tokei = {
    language: string;
    blanks: number;
    code: number;
    comments: number;
    inaccurate: boolean;
  };

  export type FitbitProfile = {
    age: number;
    ambassador: boolean;
    autoStrideEnabled: boolean;
    avatar: string;
    avatar150: string;
    avatar640: string;
    averageDailySteps: number;
    challengesBeta: boolean;
    clockTimeDisplayFormat: string;
    corporate: boolean;
    corporateAdmin: boolean;
    dateOfBirth: string;
    displayName: string;
    displayNameSetting: string;
    distanceUnit: string;
    encodedId: string;
    features: {
      exerciseGoal: true;
    };
    firstName: string;
    foodsLocale: string;
    fullName: string;
    gender: string;
    glucoseUnit: string;
    height: number;
    heightUnit: string;
    isBugReportEnabled: boolean;
    isChild: boolean;
    isCoach: boolean;
    languageLocale: string;
    lastName: string;
    legalTermsAcceptRequired: boolean;
    locale: string;
    memberSince: string;
    mfaEnabled: boolean;
    offsetFromUTCMillis: number;
    sdkDeveloper: boolean;
    sleepTracking: string;
    startDayOfWeek: string;
    strideLengthRunning: number;
    strideLengthRunningType: string;
    strideLengthWalking: number;
    strideLengthWalkingType: string;
    swimUnit: string;
    temperatureUnit: string;
    timezone: string;
    topBadges: Array<{
      badgeGradientEndColor: string;
      badgeGradientStartColor: string;
      badgeType: string;
      category: string;
      cheers: [];
      dateTime: string;
      description: string;
      earnedMessage: string;
      encodedId: string;
      image100px: string;
      image125px: string;
      image300px: string;
      image50px: string;
      image75px: string;
      marketingDescription: string;
      mobileDescription: string;
      name: string;
      shareImage640px: string;
      shareText: string;
      shortDescription: string;
      shortName: string;
      timesAchieved: number;
      value: number;
    }>;
    waterUnit: string;
    waterUnitName: string;
    weight: number;
    weightUnit: string;
  };

  export type Fitbit = { user: FitbitProfile };

  type ActivityLevel = {
    minutes: number;
    name: "very" | "fairly" | "lightly" | "sedentary";
  };

  export type HeartRateZones = {
    max: number;
    min: number;
    minutes: number;
    name: "Peak" | "Cardio" | "Fat Burn" | "Out of Range";
    caloriesOut: number;
  };

  type BaseActivity = {
    activeDuration: number;
    activityLevel: ActivityLevel[];
    activityName: string;
    activityTypeId: number;
    logId: number;
    calories: number;
    duration: number;
    startTime: string;
    steps: number;
    heartRateZones: HeartRateZones;
    averageHeartRate: number;
  };

  export interface SwimActivity
    extends Omit<BaseActivity, "steps" | "heartRateZones"> {
    pace: number;
    poolLength: number;
    poolLengthUnit: string;
    speed: number;
    swimLenghts: number;
    distance: number;
  }

  export type ActivityWithoutSteps = Omit<BaseActivity, "steps">;

  export type Activities = BaseActivity | ActivityWithoutSteps | SwimActivity;

  export type ActivityLog = Activities[];

  export type HeartRatePoint = {
    dateTime: string;
    value: {
      heartRateZones: HeartRateZones[];
      restingHeartRate: number;
    };
  };

  export type HeartRateActivity = {
    "activities-heart": Array<HeartRatePoint>;
  };

  type Option<T> = T | null;

  export type Post = {
    // Unchangeable publication date
    publish_date: Option<number>;
    // Last time post was edited
    update_date: Option<number>;
    // Post title as seen by the reader
    title: string;
    // Post human readable resource name
    slug: string;
    // To be used when previewing thepost
    summary: string;
    // Post content
    content: Option<string>;
    // Optional image to use for previews
    image: Option<string>;
    // What subjects is the post about
    tags: Array<string>;
    // Who wrote the post
    authors: Array<string>;
  };
}
