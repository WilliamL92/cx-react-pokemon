const express = require("express")
const router = express.Router()
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'pokemons',
      port: '5000'
    }
  });

router.get("/", (req, res, next)=>{
    // res.send("Api is working")
    knex.select('numero','nom').from('pokemons').then((data)=>{
        res.send({content: "Api is working", data: data})
    })
    // console.log('req')
})

module.exports = router