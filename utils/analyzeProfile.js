const analyzeProfile = (user, repos) => {
  let totalStars = 0;
  let totalForks = 0;
  const languages = {};
  const now = new Date();
  const recentActivityWindowDays = 90;
  const recentRepos = [];

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count || 0;
    totalForks += repo.forks_count || 0;

    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }

    const pushedAt = repo.pushed_at ? new Date(repo.pushed_at) : null;
    const daysSincePush = pushedAt
      ? (now.getTime() - pushedAt.getTime()) / (1000 * 60 * 60 * 24)
      : Number.POSITIVE_INFINITY;

    if (daysSincePush <= recentActivityWindowDays) {
      recentRepos.push(repo);
    }
  });

  const topLanguage =
    Object.keys(languages).sort((a, b) => languages[b] - languages[a])[0] ||
    "Not Available";

  const topRepo = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )[0];

  let developerCategory = "General Developer";

  if (topLanguage === "JavaScript" || topLanguage === "TypeScript") {
    developerCategory = "Web Developer";
  } else if (topLanguage === "Python") {
    developerCategory = "Python / AI Developer";
  } else if (topLanguage === "Java") {
    developerCategory = "Java Developer";
  } else if (topLanguage === "C++") {
    developerCategory = "C++ Developer";
  }

  const lastPushedAt = repos
    .map((repo) => repo.pushed_at)
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a))[0];

  const recentActivityScore = Math.min(100, recentRepos.length * 10);
  const profileScore = Math.min(
    100,
    user.public_repos * 2 +
      user.followers * 2 +
      totalStars * 3 +
      recentActivityScore
  );

  return {
    totalStars,
    totalForks,
    topLanguage,
    languagesUsed: JSON.stringify(languages),
    topRepo: topRepo ? topRepo.name : "Not Available",
    developerType: developerCategory,
    developerCategory,
    profileScore,
    recentActivity: {
      windowDays: recentActivityWindowDays,
      recentReposCount: recentRepos.length,
      recentActivityScore,
      lastPushedAt: lastPushedAt || "Not Available",
    },
  };
};

export default analyzeProfile;
