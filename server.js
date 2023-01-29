const app = require('./app')
require('dotenv').config()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const PORT = process.env.PORT

mongoose.Promise = global.Promise
const connection = mongoose.connect(process.env.MONGO_URL
  );

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) =>
    {console.log(`Server not running. Error message: ${err.message}`),
    process.exit(1)}
  )
