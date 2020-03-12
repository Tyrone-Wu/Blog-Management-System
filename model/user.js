//创建用户集合
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const Joi = require('joi');


// 创建集合规则
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  state: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('User', userSchema);

// async function creatUser() {
//   const salt = await bcrypt.genSalt(10);
//   const pass = await bcrypt.hash('123456', salt);
//   const user = await User.create({
//     username: 'admin',
//     email: 'admin@pku.edu.cn',
//     password: pass,
//     role: 'admin',
//     state: 0
//   });
// }

// creatUser();

const validateUser = user => {
  //定义对象的验证规则
  const schema = {
    username: Joi.string().min(2).max(12).required().error(new Error('username invalid')),
    email: Joi.string().email().required().error(new Error('email invalid')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('password invalid')),
    role: Joi.string().valid('normal', 'admin').required().error(new Error('role invalid')),
    state: Joi.number().valid(0, 1).required().error(new Error('state invalid'))
  };

  return Joi.validate(user, schema);
}

module.exports = {
  // User:User
  User,
  validateUser
}