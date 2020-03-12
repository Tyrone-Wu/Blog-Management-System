const {
  User
} = require('../../model/user');


module.exports = async (req, res) => {

  // 标识当前页面
  req.app.locals.currentLink = 'user'

  //接收客户端传递过来的页码
  let page = req.query.page || 1;

  //每页数据条数
  let pageSize = 5;

  //查询用户数据总数
  let count = await User.countDocuments({});

  // 总页数
  let total = Math.ceil(count / pageSize);

  //查询开始位置
  let start = (page - 1) * pageSize;

  //将用户信息从数据库中查询
  let users = await User.find({}).limit(pageSize).skip(start);

  res.render('admin/user', {
    users: users,
    page: page,
    total: total
  })
};