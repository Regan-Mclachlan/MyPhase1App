const pokedex = document.getElementById("pokedex")

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        if (i === 131) {
            promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/lapras`).then((response) => response.json()))
        }
        else if(i === 69){
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/bellsprout`).then((response) => response.json()))
        }
        else if(i === 148){
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
    const pokemonli = pokemon.map ( 
        (pokelist) => `<li class="pictures" onclick="selectPokemon(${pokelist.id})">
        <img class="pokeImage" src="${pokelist.image}"/></li>` 
        ).join('');

    pokedex.innerHTML = pokemonli;
};

const selectPokemon = async (id) => {
    // console.log(id)
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const response = await fetch(url)
    const pokelist = await response.json()
    displayPopup(pokelist)
}


const displayPopup = (pokelist) => {
    const type = pokelist.types.map( type => type.type.name).join(", ");
    // console.log(type)
    const htmlpopUP = `
    <div class="popup">
        <button id="closeButton" onclick="closePopup()"> X </button>
            <div class=pokeInfo>
                <h1> ${pokelist.id}. ${pokelist.name}</h1>
                <p>Type: ${type}</p>
                <p>Stats</p>
                <p>${pokelist.hp}, ${pokelist.hpVal}</p>
                <p>${pokelist.attack}, ${pokelist.stats[1].base_stat}</p>
                <p>${pokelist.defence}, ${pokelist.defenceVal}</p>
                <p>${pokelist.spAttack}, ${pokelist.spAttackVal}</p>
                <p>${pokelist.spDefence}, ${pokelist.spDefenceVal}</p>
                <p>${pokelist.speed}, ${pokelist.speedVal}</p>
            </div>
    </div>`;
    console.log(htmlpopUP)
}
fetchPokemon()