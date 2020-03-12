const {
  Article
} = require('../../model/article');

const pagination = require('mongoose-sex-page')


module.exports = async (req, res) => {
  // 标识当前页面
  req.app.locals.currentLink = 'article';

  // 接收客户端传递过来的页码
  const page = req.query.page;

  // 联合多级查询 .populate('author') 查询作者的详细信息
  // page 方法指定当前页
  // size指定每页数据条数
  // display指定客户端要显示的页码数量
  // exec 向数据库发送请求
  let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();

  // 渲染文章列表页面模板
  res.render('admin/article.art', {
    articles: articles
  });

}