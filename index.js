const { getLoader, loaderNameMatches } = require('react-app-rewired');
const cloneDeep = require('lodash.clonedeep');

const cssModuleExtension = /\.module\.css$/;

function createRewireCssModules(loaderOptions = {}) {
  return function(config, env) {
    let cssModuleRule = getLoader(config.module.rules, rule => {
      return String(rule.test) === String(cssModuleExtension);
    });

    if (!cssModuleRule) {
      const cssRule = getLoader(config.module.rules, rule => {
        return String(rule.test) === String(/\.css$/);
      });

      cssModuleRule = cloneDeep(cssRule);

      cssRule.exclude = cssModuleExtension;

      cssModuleRule.test = cssModuleExtension;

      const cssModuleLoader = getLoader([cssModuleRule], rule => {
        return loaderNameMatches(rule, 'css-loader');
      });

      cssModuleLoader.options = Object.assign({
        localIdentName: '[local]___[hash:base64:5]',
        modules: true,
        ...loaderOptions,
      }, cssModuleLoader.options);

      const oneOfRule = config.module.rules.find(
        rule => rule.oneOf !== undefined,
      );

      if (oneOfRule) {
        oneOfRule.oneOf.unshift(cssModuleRule);
      } else {
        config.module.rules.push(cssModuleRule);
      }
    }

    return config;
  };
}

const rewireCssModules = createRewireCssModules();

rewireCssModules.withLoaderOptions = createRewireCssModules;

module.exports = rewireCssModules;
