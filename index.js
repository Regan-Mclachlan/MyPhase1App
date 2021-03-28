const pokedex = document.getElementById("pokedex")

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        if (i === 131) {
            promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/lapras`).then((response) => response.json()))
        }
        else if(i === 13){
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/weedle`).then((response) => response.json()))
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
                id: data.id,
                image: data.sprites.front_default,
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
            <div class="picturesPop">
                <img class="pokeImagePop" src="${pokelist.sprites.front_default}"/>
                <h1> ${pokelist.id}. ${pokelist.name.toUpperCase()}</h1>
                <p>Type: ${type}</p>
                <p>Stats</p>
                <div id="stats">
                <p class="hp">${pokelist.stats[0].stat.name.toUpperCase()}: ${pokelist.stats[0].base_stat} <p class="bar" style="width:${pokelist.stats[0].base_stat*2}px; height: 10px";> </p> </p>
                <p class="attack">${pokelist.stats[1].stat.name.toUpperCase()}: ${pokelist.stats[1].base_stat}<p class="bar" style="width:${pokelist.stats[1].base_stat*2}px; height: 10px";> </p>
                <p class="defence">${pokelist.stats[2].stat.name.toUpperCase()}: ${pokelist.stats[2].base_stat}<p class="bar" style="width:${pokelist.stats[2].base_stat*2}px; height: 10px";> </p>
                <p class="SpAttack">${pokelist.stats[3].stat.name.toUpperCase()}: ${pokelist.stats[3].base_stat}<p class="bar" style="width:${pokelist.stats[3].base_stat*2}px; height: 10px";> </p>
                <p class="SpDefence">${pokelist.stats[4].stat.name.toUpperCase()}: ${pokelist.stats[4].base_stat}<p class="bar" style="width:${pokelist.stats[4].base_stat*2}px; height: 10px";> </p>
                <p class="speed">${pokelist.stats[5].stat.name.toUpperCase()}: ${pokelist.stats[5].base_stat}<p class="bar" style="width:${pokelist.stats[5].base_stat*2}px; height: 10px";> </p>
                </div>
            </div>
    </div>`;
    pokedex.innerHTML = htmlpopUP + pokedex.innerHTML;
    bar = document.getElementsByClassName("bar");
    for (i = 0; i <= bar.length; i++){
    barWidth = [parseInt(bar[`${i}`].style.width)]
        createBarColor()
        // console.log(barWidth)
}}
const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}
function createBarColor() {
    if (barWidth <= 80){
        bar[`${i}`].style.backgroundColor = "red";
    }
    else if (barWidth <= 160){
        bar[`${i}`].style.backgroundColor = "yellow"
    }
    else{
        bar[`${i}`].style.backgroundColor = "rgb(7, 205, 7)"
    }
}


fetchPokemon()