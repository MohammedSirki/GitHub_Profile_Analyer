const analyzeProfile = (user, repos) => {
  let totalStars = 0;
  let totalForks = 0;
  const languages = {};

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count || 0;
    totalForks += repo.forks_count || 0;

    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  const topLanguage =
    Object.keys(languages).sort((a, b) => languages[b] - languages[a])[0] ||
    "Not Available";

  const topRepo = repos.sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )[0];

  let developerType = "General Developer";

  if (topLanguage === "JavaScript" || topLanguage === "TypeScript") {
    developerType = "Web Developer";
  } else if (topLanguage === "Python") {
    developerType = "Python / AI Developer";
  } else if (topLanguage === "Java") {
    developerType = "Java Developer";
  } else if (topLanguage === "C++") {
    developerType = "C++ Developer";
  }

  const profileScore = Math.min(
    100,
    user.public_repos * 2 + user.followers * 2 + totalStars * 3
  );

  return {
    totalStars,
    totalForks,
    topLanguage,
    languagesUsed: JSON.stringify(languages),
    topRepo: topRepo ? topRepo.name : "Not Available",
    developerType,
    profileScore,
  };
};

export default analyzeProfile;
