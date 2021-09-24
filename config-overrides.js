module.exports = {
    webpack: function(config, env) {
        config.optimization.splitChunks = {
            cacheGroups: {
               default: false
            }
        };
        config.optimization.runtimeChunk = false;
        config.output = {
            ...config.output,
            filename: `static/algopay.js`,
          };
          config.plugins.map((plugin, i) => {
            if (plugin.filename && plugin.filename.includes('static/css')) {
              config.plugins[i].filename = `static/algopay.css`;
            }
          });
        return config;
    }
}



