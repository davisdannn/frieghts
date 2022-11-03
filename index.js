const express = require('express')
const Home = require('./routes')
const customer = require('./routes')
const tracking = require('./routes')
const info = require('./routes')
const track = require('./routes')
const create = require('./routes')
const stepper = require('./routes')
const deleRec = require('./routes')
const upeRec = require('./routes')
const remove = require('./routes')
const auth = require('./routes')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()



const app = express()

app.use(cors({
    origin : '*'
}))
app.use(express.json())


app.use('/', Home)
app.use('/fetch', customer)
app.use('/customer', tracking)
app.use('/shipping', info)
app.use('/progress', track)
app.use('/create', create)
app.use('/stepper', stepper)
app.use('/progress', deleRec)
app.use('/progress', upeRec)
app.use('/remove', remove)
app.use('/admin', auth)



app.listen( process.env.PORT || 4000, () => {
    console.log('server runnung at Port 4000');
})