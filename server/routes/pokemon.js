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

router.get("/:id", (req, res, next)=>{
    // res.send("Api is working")
    knex.select('*').from('pokemons_info').where('poke_id', '=', req.params.id).then((data)=>{
        res.send({content: "Api is working", data: data})
    })
    // console.log('req')
})

module.exports = router