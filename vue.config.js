module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      const newArgs = [...args];
      newArgs[0].title = 'CG-course-algorithm';
      return newArgs;
    });
  },
};
