import React from 'react';

const Details = props => {
    
    return (
        <div className="pokemon-box">
            <p>Name: {props.pokemon.name}</p>
            <p>Num: {props.pokemon.num}</p>
            <img src={props.pokemon.img} height="auto" width="auto" />
            <p>Type: {props.pokemon.type.length > 1 ? props.pokemon.type.join(', ') : props.pokemon.type}</p>
            <p>Weaknesses: {props.pokemon.weaknesses.length > 1 ? props.pokemon.weaknesses.join(', ') : props.pokemon.weaknesses}</p>
            <p>Height: {props.pokemon.height}</p>
            <p>Weight: {props.pokemon.weight}</p>
            {props.pokemon.prev_evolution ? 
            <div>
                <p>Previous Evolution(s):</p>
                {props.pokemon.prev_evolution.map((mon, index) => {
                return (<p key={index}>Name: {mon.name} / Num: {mon.num}
                </p>)
                })}
            </div>
                 : null}
            {props.pokemon.next_evolution ? 
            <div>
            <p>Next Evolution(s):</p>
            {props.pokemon.next_evolution.map((mon, index) => {
                return (<p key={index}>Name: {mon.name} / Num: {mon.num}
                </p>)
                })}
            </div>
             : null}
            <button onClick={props.back}>Back to List</button>
        </div>
    );
}

export default Details;