import React, { useState } from 'react';
import PropTypes from "prop-types";
import './App.css';
import pokemon from "./pokemon.json";
import {FaStar} from "react-icons/fa";

const PokemonRow = ({pokemon}) =>(
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name:PropTypes.shape({
      english: PropTypes.string
    }),
    type: PropTypes.arrayOf(PropTypes.string)
  })
}

const createArray = length => [...Array(length)];

const Star = ({parent,selected,starOrder,onSelect = f => f}) => (
  <FaStar color={selected && parent === 1 ? "red" : "lightgrey"} onClick={onSelect}/>
);


function App() {
  const [filter, filterSet] = React.useState("");
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <div
      style={{
        margin:"auto",
        width: 800,
        paddingTop:"1rem"
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <input 
        value={filter}
        onChange={(evt) => filterSet(evt.target.value)}
      />

      <table width="100%">
        <thead>
          <tr> 
            <th>Name</th>
            <th>Type</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {pokemon
          .filter((pokemon)=>
          (pokemon.name.english.toLowerCase().includes(filter.toLowerCase())
          ))
          // .slice(0,20)
          .map((pokemon,i) => (
            <tr key={pokemon.id} >
              <td>{pokemon.name.english}</td>
              <td>{pokemon.type.join(", ")}</td>
              <td>
                {createArray(5).map((n, j) => (
                  <Star 
                    key={j}
                    parent={i}
                    selected={selectedStars > j}
                    starOrder={j+1}
                    onSelect={() => setSelectedStars(j + 1)}
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
