require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())


//routes
app.use('/user', require('./routes/userRoute'))


//connect to mongoo
const URI = process.env.MONGODB_URL
mongoose.connect(URI,  err => {
    if(err) throw err;
    console.log("connectred to mongo")
})




const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));