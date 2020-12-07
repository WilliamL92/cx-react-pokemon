import React from 'react'
import { Link } from "react-router-dom"

class Pokedex extends React.Component{
    constructor(props){
      super(props)
      this.state={data: ""}
    }
  
    callApi(){
      fetch("http://localhost:9000/pokemons")
      .then(response => response.json())
      .then(data => this.setState({ data }));
    }
  
    componentWillMount(){
      this.callApi()
    }
  render() {
  console.log(this.state.data.data)
    const pokemonsList = this.state.data.data
    let pokeName = []
    let pokeNumber = []
    let _numero
    for(let key in pokemonsList){
      if(pokemonsList[key].numero.toString().length == 1){
        pokemonsList[key].numero = "00" + pokemonsList[key].numero
      }
      else if(pokemonsList[key].numero.toString().length == 2){
        pokemonsList[key].numero = "0" + pokemonsList[key].numero
      }
      pokeName.push(pokemonsList[key])
    }
  
    return (
      <div>
        <header>
        </header>  
        {pokeName.map(function(name, index){
          return <div>
                  <p>{name.nom}</p>
                  <Link to={`/pokemon/${name.numero}`}><img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${name.numero}.png`}></img></Link>
                 </div>;
        })}
      </div>
    );
  }
  }

export default Pokedex