const pokedex = document.getElementById("pokedex")
console.log(pokedex)


const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 147; i++) {

        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response) => response.json()));
    }

    Promise.all(promises).then((results) => {
            const pokemon = results.map((data) => ({
                name: data.name,
                id: data.id,
                image: data.sprites.front_default,
                type: data.types.map( (type) => type.type.name).join(", ")
                
            }));
           displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon)
    const pokemonHTMLString = pokemon.map ( 
        (pokelist) => `
        <p>
        <img src="${pokelist.image}"/>
        <h1> ${pokelist.id}. ${pokelist.name}</h1>
        <p>Type: ${pokelist.type}</p>
        </p>
        `
    );
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon()