import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Multiselect } from 'multiselect-react-dropdown';
import useDebounce from './useDebounce';
import Details from './Details';

const List = (props) => {
    const [ pokemonList, setPokemonList ] = useState([]);

    const [ search, setSearch ] = useState('');
    const [ types, setTypes ] = useState([]);
    const [ weaknesses, setWeaknesses ] = useState([]);
    const [ selectedPokemon, setSelectedPokemon ] = useState();

    const debouncedSearchTerm = useDebounce(search, 300);

    let fetchedPokemonList = [];
    useEffect(() => {
        try {
            axios.get(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
            .then(res => {
                console.log('res.data: ', res.data);
                fetchedPokemonList = res.data.pokemon;
                if (debouncedSearchTerm) {
                    console.log('debounced: ', debouncedSearchTerm);
                    let debouncedList = fetchedPokemonList.filter(pokemon => {
                        return pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                    })
                    setPokemonList(debouncedList);
                } else {   
                setPokemonList(fetchedPokemonList);
                }
            })
        } catch {
            alert('No data found!');
            setPokemonList([]);
        }
    }, [debouncedSearchTerm])

    const handleSearch = searchTerm => {
        setSearch(searchTerm)
    };

    const handleFilter = selectedTypes => {
        setTypes(selectedTypes)
        selectedTypes.forEach(type => {
            const filteredList = pokemonList.filter(pokemon => {
                return pokemon.type.includes(type.value)
            })
        setPokemonList(filteredList);
        })
    };

    const handleRemoveFilter = selectedTypes => {
        setTypes(selectedTypes)
        try {
            axios.get(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
            .then(res => {
                console.log('res.data: ', res.data);
                fetchedPokemonList = res.data.pokemon;
        if (selectedTypes.length === 0) {
            setPokemonList(fetchedPokemonList)
        }
        selectedTypes.forEach(type => {
            const filteredList = fetchedPokemonList.filter(pokemon => {
                return pokemon.type.includes(type.value)
            })
                setPokemonList(filteredList);
            })
            })
        } catch {
            alert('No data found!');
            setPokemonList([]);
        }
    }

    const handleWeaknessFilter = selectedWeakness => {
        setWeaknesses(selectedWeakness)
        selectedWeakness.forEach(weakness => {
            const filteredList = pokemonList.filter(pokemon => {
                return pokemon.weaknesses.includes(weakness.value)
            })
        setPokemonList(filteredList);
        })
    };

    const handleRemoveWeaknessFilter = selectedWeakness => {
        setWeaknesses(selectedWeakness)
        try {
            axios.get(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
            .then(res => {
                console.log('res.data: ', res.data);
                fetchedPokemonList = res.data.pokemon;
        if (selectedWeakness.length === 0) {
            setPokemonList(fetchedPokemonList)
        }
        selectedWeakness.forEach(weakness => {
            const filteredList = fetchedPokemonList.filter(pokemon => {
                return pokemon.weaknesses.includes(weakness.value)
            })
                setPokemonList(filteredList);
            })
            })
        } catch {
            alert('No data found!');
            setPokemonList([]);
        }
    }

    const buttonClickedHandler = pokemon => {
        setSelectedPokemon(pokemon)
    }

    const backToListHandler = () => {
        setSelectedPokemon(null)   
    }

    let renderList;

    if (pokemonList.length > 0) {
        renderList = pokemonList.map(mon => (
            <div key={mon.id} className="pokemon-box">
                <p>Num: {mon.num}</p> 
                <p>Name: {mon.name}</p> 
                <p>Type: {mon.type.length > 1 ? mon.type.join(', ') : mon.type}</p>
                <p>Weaknesses: {mon.weaknesses.length > 1 ? mon.weaknesses.join(', ') : mon.weaknesses}</p>
                <button onClick={() => buttonClickedHandler(mon)}>View Details</button>
            </div>
        ))
    } else {
        renderList = (
            <div>
                <p>No Pokemon Found!</p>
            </div>
        )
    }

    const dropdownOptions = [
        {id: 1, value: 'Grass' },
        {id: 2, value: 'Fire' },
        {id: 3, value: 'Water' },
        {id: 4, value: 'Psychic' },
        {id: 5, value: 'Electric' },
        {id: 6, value: 'Flying' },
        {id: 7, value: 'Ice' },
        {id: 8, value: 'Ground' },
        {id: 9, value: 'Rock' },
        {id: 10, value: 'Poison' },
        {id: 11, value: 'Bug' },
        {id: 12, value: 'Fighting' },
        {id: 13, value: 'Normal' },
        {id: 14, value: 'Dragon' },
        {id: 15, value: 'Ghost' },
    ]

    return (
        <div>
        <div className="flex-center-container">
            <div className="filters">Search: <input onChange={e => handleSearch(e.target.value)} value={search} /></div>
            <div className="filters">Filter by Type:
            <Multiselect options={dropdownOptions} selectedValues={types} onSelect={handleFilter} onRemove={handleRemoveFilter} displayValue="value" />
            </div>
            <div className="filters">Filter by Weaknesses: 
            <Multiselect options={dropdownOptions} selectedValues={weaknesses} onSelect={handleWeaknessFilter} onRemove={handleRemoveWeaknessFilter} displayValue="value" />
            </div>
        </div>
            <div className="flex-center-container-column">
            {selectedPokemon ? <Details pokemon={selectedPokemon} back={backToListHandler} /> : renderList}
            </div>
        </div>
    );
}

export default List;