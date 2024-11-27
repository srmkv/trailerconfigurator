// config-overrides.js
module.exports = function override(config) {
  // Отключение source map обработки для antd
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.oneOf)) {
      rule.oneOf.forEach(oneOf => {
        if (oneOf.use) {
          oneOf.use.forEach(loader => {
            if (
              typeof loader === 'object' &&
              loader.loader &&
              loader.loader.includes('source-map-loader')
            ) {
              // Исключаем antd из source-map-loader
              loader.options = {
                ...loader.options,
                filterSourceMappingURL: (url) => !/antd/.test(url),
              };
            }
          });
        }
      });
    }
  });
  return config;
};
