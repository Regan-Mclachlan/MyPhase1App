const pokedex = document.getElementById("pokedex")



const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        if (i === 148) {
            promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/dragonair`).then((response) => response.json()))
        }
        else {
            promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response) => response.json()))
        }
    }

    Promise.all(promises).then((results) => {
            const pokemon = results.map((data) => ({
                name: data.name,
                id: data.id,
                image: data.sprites.front_default,
                type: data.types.map( (type) => type.type.name).join(", "),
                hp: data.stats[0].stat.name,
                attack: data.stats[1].stat.name,
                defence: data.stats[2].stat.name,
                spAttack: data.stats[3].stat.name,
                spDefence: data.stats[4].stat.name,
                speed: data.stats[5].stat.name,
                hpVal: data.stats[0].base_stat,
                attackVal: data.stats[1].base_stat,
                defenceVal: data.stats[2].base_stat,
                spAttackVal: data.stats[3].base_stat,
                spDefenceVal: data.stats[4].base_stat,
                speedVal: data.stats[5].base_stat,
            }));
           displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon)
    const pokemonli = pokemon.map ( 
        (pokelist) => `<img src="${pokelist.image}"/>` 
        ).join('');

    pokedex.innerHTML = pokemonli;
};

fetchPokemon()
