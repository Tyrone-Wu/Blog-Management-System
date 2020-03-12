const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const dateFormat = require("dateformat");
const template = require("art-template");

//创建网站服务器
const app = express();

//数据库连接
require("./model/connect");

// 处理post请求参数
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//配置session
app.use(
  session({
    secret: "secret key"
  })
);

//告诉express框架模板所在位置
app.set("views", path.join(__dirname, "views"));

//告诉express框架模板默认后缀
app.set("view engine", "art");

//当渲染后缀为art的模板时  所使用的模板引擎时什么
app.engine("art", require("express-art-template"));
// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源文件
app.use(express.static(path.join(__dirname, "public")));

//导入自路由对象
const home = require("./route/home");
const admin = require("./route/admin");

//拦截请求  判断用户登录状态
app.use("/admin", require("./middleware/loginGuard"));

// 为路由匹配路径
app.use("/home", home);
app.use("/admin", admin);

//错误处理中间件
app.use((err, req, res, next) => {
  const result = JSON.parse(err);
  let params = [];
  for (const attr in result) {
    if (attr != "path") {
      params.push(attr + "=" + result[attr]);
    }
  }
  res.redirect(`${result.path}?${params.join("&")}`);
});

app.listen(8888);

console.log("***********************************");

console.log("localhost started at: 8888...");