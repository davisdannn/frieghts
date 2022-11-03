const pool = require('./db')
const Router = require('express').Router()
const Pool = require('pg').Pool

Router.get('/', (req,res) => {
    res.json('Bitfreights server running')
})


Router.get('/customers', async(req,res) => {
    try {
      const data = await pool.query("SELECT * FROM customers ORDER BY sent ASC")
      res.json(data.rows)
    } catch (error) {
        res.json(error)
        console.log(error);
        
    }
})



Router.get('/tracking', async(req,res) => {
    try {
      const data = await pool.query("SELECT * FROM tracking  ORDER BY date ASC")
      res.json(data.rows)
    } catch (error) {
        res.json(error)
        console.log(error);
        

    }
})

Router.post('/new/insert', async(req,res) => {
    try {
        const {customer, location, date, status, time} = req.body
      const data = await pool.query("INSERT INTO tracking (customer, location, date, status, local_time) VALUES($1,$2,$3,$4,$5) RETURNING * ",[customer,location,date,status, time])
      res.json(data.rows[0])
    } catch (error) {
        res.json(error)
        console.log(error);
        

    }
})


Router.post('/delete/record', async(req,res) => {
    const {id} = req.query
    try {
      const data = await pool.query("DELETE FROM tracking WHERE id = $1 RETURNING *", [id])
      res.json(data.rows[0])
    } catch (error) {
        res.json(error)
        console.log(error);
        

    }
})


Router.post('/customer', async(req,res) => {
    const {id} = req.query
    try {
      const data1 = await pool.query("DELETE FROM tracking WHERE customer = $1 RETURNING *", [id])
      const data2 = await pool.query("DELETE FROM customers WHERE name = $1 RETURNING *", [id])
      res.json('Customer removed successfully!')
    } catch (error) {
        res.json(error)
        console.log(error);
        

    }
})

Router.post('/update/record', async(req,res) => {
    try {
        const {customer, location, date, status, time, id} = req.body
      const data = await pool.query("UPDATE tracking SET customer  = $1, location = $2, date = $3, status = $4, local_time = $5 WHERE id = $6 RETURNING * ",[customer,location,date,status, time, id])
      res.json(data.rows[0])
    } catch (error) {
        res.json(error)
        console.log(error);
        

    }
})



Router.post('/info', async(req,res) => {
    try {
        const {id} = req.query
      const data = await pool.query("SELECT * FROM info WHERE customers = $1", [id])
      res.json(data.rows)
    } catch (error) {
        res.json(error)
        console.log(error);
        

    }
})


Router.post('/new/customer', async(req,res) => {

    const tracking = Math.floor(Math.random() * 693945483927)
    const stepper = 0

    try {
        const {  sent, type, weight, content, reciever_name, reciever_address, shipper} = req.body
      const data = await pool.query("INSERT INTO customers (stepper, name, sent, type, weight, content, reciever_name, reciever_address,shipper, tracking) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9, $10)  RETURNING * ", [stepper,reciever_name, sent,type,weight,content, reciever_name, reciever_address,shipper, tracking])
      res.json(data.rows[0])
    } catch (error) {
        res.json(error)
        console.log(error);
        

    }
})


Router.post('/new/update', async(req,res) => {

   

    try {
        const {id, step} = req.body
      const data = await pool.query("UPDATE customers SET stepper = $1 WHERE id = $2 RETURNING *", [step, id])
      res.json(data.rows[0].stepper)
    } catch (error) {
        res.json(error)
        console.log(error);
        

    }
})


Router.post('/auth', async(req, res) => {
    
    try {
        const { password} = req.body 

        if(!password) return
        const data = await pool.query("SELECT * FROM auth WHERE  password = $1", [password])
        
        if(data.rows.length > 0) {
            res.json(true)
        } else {
            res.json(false)
        }
    } catch (error) {

        console.log(error);
        
    }
})



module.exports = Router;




