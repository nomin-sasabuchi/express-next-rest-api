// Example: feat: fix components/button
// Details JP: https://www.conventionalcommits.org/ja/v1.0.0/
// Details EN: https://www.conventionalcommits.org/en/v1.0.0/
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "bump", // Version bumps
        "config", // Configuration changes
        "chore", // Other changes that don't modify src or test files
        "ci", // Changes to our CI configuration files and scripts
        "docs", // Documentation only changes
        "feat", // A new feature
        "fix", // A bug fix
        "perf", // A code change that improves performance
        "refactor", // A code change that neither fixes a bug nor adds a feature
        "revert", // Reverts a previous commit
        "style", // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
        "test", // Adding missing tests or correcting existing tests
      ],
    ],
  },
};
