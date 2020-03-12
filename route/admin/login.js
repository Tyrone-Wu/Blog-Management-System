// 导入用户集合构造函数
const {
  User
} = require('../../model/user');

const bcrypt = require('bcrypt');


module.exports =
  async (req, res) => {
    // 接收请求参数
    const {
      email,
      password
    } = req.body;

    if (email.trim().length == 0 || password.trim().length == 0) {
      return res.status(400).render('admin/error', {
        msg: 'Email or password wrong!'
      });
    };
    // 根据邮箱地址查询用户信息  查询到为对象类型  否则为空
    let user = await User.findOne({
      email
    });
    if (user) {
      //将客户端传递过来的密码和用户信息的密码比对
      // if (password == user.password) {
      let isValid = await bcrypt.compare(password, user.password);

      //如果密码比对成功
      if (isValid) {
        //将用户名存储在请求对象中
        req.session.username = user.username;
        // res.send('success')
        // 重定向到用户列表页
        req.app.locals.userInfo = user;

        res.redirect('/admin/user');

        // res.render('admin/user')
      } else {
        res.status(400).render('admin/error', {
          msg: 'Email or password wrong!'
        })
      }
    } else {
      res.status(400).render('admin/error', {
        msg: 'Email or password wrong!'
      })
    }

  };


var name = "windowds"
var obj = {
  name: "obj",
  fn: function () {
    var that = this
    console.log(that)
    console.log(this.name);

    return function () {
      console.log(this);
      console.log(this.name);
    }
  }
}

console.log('3' + obj.fn()());