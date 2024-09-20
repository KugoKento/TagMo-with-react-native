module.exports = {
  extends: ["expo", "prettier", "eslint-config-prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
  },
};
