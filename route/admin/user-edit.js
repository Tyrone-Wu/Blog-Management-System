const {
  User
} = require('../../model/user');

module.exports = async (req, res) => {

  // 标识当前页面
  req.app.locals.currentLink = 'user'

  //获取地址栏的ID参数
  const {
    message,
    id
  } = req.query;

  //如果当前传递了ID  修改
  if (id) {
    let user = await User.findOne({
      _id: id
    });

    res.render('admin/user-edit', {
      message: message,
      user: user,
      link: '/admin/user-modify?id=' + id,
      button: "修改"
    });

  } else {
    res.render('admin/user-edit', {
      message: message,
      link: '/admin/user-edit',
      button: "添加"

    });
  }
}