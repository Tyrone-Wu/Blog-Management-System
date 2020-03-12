// 引入第三放模块解析post上传数据
const formidable = require('formidable')
const path = require('path')
const {
  Article
} = require('../../model/article')

module.exports = (req, res) => {
  // 1.创建表单解析对象
  const form = new formidable.IncomingForm();
  // 2.配置上传文件保存路径 
  form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
  // 3. 保留上传文件的后缀
  form.keepExtensions = true;
  // 4.解析表单
  form.parse(req, async (err, fields, files) => {
    // fields 对象类型   保存普通标单数据
    // files 对象类型  保存和上传文件相关的数据
    // res.send(files.cover.path.split('pubilc')[1])
    await Article.create({
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate,
      cover: files.cover.path.split('pubic')[1],
      content: fields.content,
    })
    res.redirect('/admin/article')
  })
}