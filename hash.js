const bcrypt = require('bcrypt');

//接收一个数值作为参数  越大随机生成的字符串复杂度越高  默认10

async function run() {
  const salt = await bcrypt.genSalt(10);

  //要加密的明文   随机字符串   返回加密后的密码
  const result = await bcrypt.hash('21312', salt)
  console.log(salt);
  console.log(result);

}

run();