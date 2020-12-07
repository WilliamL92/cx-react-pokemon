const fs = require('fs');

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

String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
}
return this.substring(0, index) + replacement + this.substring(index + 1);
}

module.exports = {
    sendBdd: ()=>{
        fs.readFile('pokedex.json', (err, data) => {
            if (err) throw err
            let pokedex = JSON.parse(data)
            let pokemon;
            let _date;
            for(const key in pokedex){
              pokemon = pokedex[key]
              _date = new Date().toDateString()
                knex('pokemons').insert({numero: pokemon.numéro, nom: pokemon.nom, date_ajout: _date}).then((res)=>{

                let attaque = ""
                let capspe = ""
                let legende = ""
                let espece = ""
                let pokemon = ""
                  pokemon = pokedex[key]
                  console.log(pokemon.nom)
                  if(typeof(pokemon.capspe1) != "undefined"){
                    capspe = capspe + pokemon.capspe1;
                  }
                  if(typeof(pokemon.capspe2) != "undefined"){
                    capspe = capspe + pokemon.capspe2;
                  }
                  if(typeof(pokemon.capspe3) != "undefined"){
                    capspe = capspe + pokemon.capspe3;
                  }
                  capspe = capspe.replace(/{/g, "._")
                  capspe = capspe.replace(/}/g, "_.")
                  attaque = JSON.stringify(pokemon.attaques)
                  legende = pokemon.légende.replace(/{/g, "._")
                  legende = legende.replace(/}/g, "_.")
                  attaque = attaque.replace(/{/g, "._")
                  attaque = attaque.replace(/}/g, "_.")
                  attaque = attaque.replace(/'/g, "^^")
                  capspe = capspe.replace(/'/g, "^^")
                  legende = legende.replace(/'/g, "^^")
                  attaque = attaque.replace(/,/g, "%")
                  legende = legende.replace(/,/g, "%")
                  espece = pokemon.espece.replace(/'/g, "%")
                  console.log(pokemon.type)
                knex('pokemons_info').insert({poke_id: knex.select('numero').from('pokemons').where('nom', '=', pokemon.nom), legende: legende, espece: espece, taille: pokemon.taille, poids: pokemon.poids, type: pokemon.type, capspe: capspe, attaques: attaque}).then((then)=>{
                  return this
                })

                return this
              })
          }
              
        })
    }
  }

  module.exports.sendBdd()