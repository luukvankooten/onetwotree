const path = require("path");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          const oneOfRule = webpackConfig.module.rules.find(
            (rule) => rule.oneOf
          );
          if (oneOfRule) {
            const tsxRule = oneOfRule.oneOf.find(
              (rule) => rule.test && rule.test.toString().includes("tsx")
            );

            const newIncludePaths = [
              // relative path to my yarn workspace library
              path.resolve(__dirname, "../../packages/validation"),
              path.resolve(__dirname, "../../packages/domain"),
            ];
            if (tsxRule) {
              if (Array.isArray(tsxRule.include)) {
                tsxRule.include = [...tsxRule.include, ...newIncludePaths];
              } else {
                tsxRule.include = [tsxRule.include, ...newIncludePaths];
              }
            }
          }
          return webpackConfig;
        },
      },
    },
  ],
};
