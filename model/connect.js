const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database connected successfully!'))
  .catch(() => console.log('Database connected failed!'));