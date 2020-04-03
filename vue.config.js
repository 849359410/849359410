module.exports = {
  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,
  lintOnSave: undefined,
	devServer: {
		overlay: {
			warnings: false,
			errors: false
		},
		open: ["production", "prod"].includes(process.env.NODE_ENV),
		host: "0.0.0.0",
		port: 8008,
		https: false,
		hotOnly: false,
		proxy: {
			"/pluto_api/": {
				target: "http://192.168.1.88:9987",
				changeOrigin: true
			},
		}
	}
};
