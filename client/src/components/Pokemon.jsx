import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"

class Pokemon extends React.Component{
    constructor({props, match}){
      super(props)
      this.state={data: ""}
    }
  
    callApi(){
      fetch("http://localhost:9000/pokemon/"+this.props.match.params.id)
      .then(response => response.json())
      .then(data => this.setState({ data }));
    }
  
    componentWillMount(){
      this.callApi()
    }
  render() {
    const pokemonsList = this.state.data.data
    console.log(this.state.data.data)
    let pokeName = []
    let pokeNumber = []
    let _numero
    for(let key in pokemonsList){
      if(pokemonsList[key].poke_id.toString().length == 1){
        pokemonsList[key].poke_id = "00" + pokemonsList[key].poke_id
      }
      else if(pokemonsList[key].poke_id.toString().length == 2){
        pokemonsList[key].poke_id = "0" + pokemonsList[key].poke_id
      }
      pokeName.push(pokemonsList[key])
    }
  
    return (
      <div>
        <header>
        </header>  
            <Link to="/pokedex">Retour</Link>
             <div>
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.props.match.params.id}.png`}></img>

                {pokeName.map(function(name, index){
                    return <div>
                        <p>Capacité spéciale: {name.capspe}</p>
                        <p>Espece: {name.espece}</p>
                        <p>Taille: {name.taille}</p>
                        <p>Poids: {name.poids}</p>
                        <p>Id pokémon: {name.poke_id}</p>
                    </div>;
        })}

            </div>
      </div>
    );
  }
  }

export default Pokemon