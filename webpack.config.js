const path = require('path')
module.exports = {
	entry : {
		aubanner : ['./src/aubanner/aubanner.js']
	},
	output : {
		//__dirname，就是当前webpack.config.js文件所在的绝对路径
		filename : '[name].min.js',
		path: __dirname + '/build'
	}
}