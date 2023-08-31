const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const descriptionPokemon = document.getElementById('description')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <a href="#description">
        <li class="pokemon ${pokemon.type}" onclick="carregarDescripion(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    </a>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})





function carregarDescripion(pokemonEspecificoId) {
     
     
    const pokemonEscolhido = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonEspecificoId}`)
       .then((response) => response.json())
       .then((pokemonJsonDetail) => {
           console.log(pokemonJsonDetail)
       
           const newDescricao = `

           <div id="description" class="${pokemonJsonDetail.types[0].type.name}">
           <div class="info ${pokemonJsonDetail.types[0].type.name}">
               <div>
                   <div class="tipo-numero">
                       <p>${pokemonJsonDetail.types[0].type.name}</p>
                       <p>#${pokemonJsonDetail.id}</p>   
                   </div>
                   <h2>${pokemonJsonDetail.name}</h2>
                  
                   <ul class="caracteristicas">
                       <li><div class="espaco-texto-lista">Height:</div>  <span> ${pokemonJsonDetail.height/10}m</span></li>
                       <li><div class="espaco-texto-lista">Weight:</div>  <span> ${pokemonJsonDetail.weight/10}kg</span></li>
                       <li><div class="espaco-texto-lista">Abilities:</div>  <span> ${pokemonJsonDetail.abilities[0].ability.name}</span></li>
                   </ul>
               </div>

               
           </div>
           <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonJsonDetail.id}.svg"
                   alt="Foto do ${pokemonJsonDetail.name}">
           <div class="stats ${pokemonJsonDetail.types[0].type.name}">

               <ul>
                   <li><div class="stats-dados">HP:</div>  <div id="hp" class="bar-stats" style="width:${pokemonJsonDetail.stats[0].base_stat}px;"></div><span> ${pokemonJsonDetail.stats[0].base_stat}</span></li>
                   <li><div class="stats-dados">Attack:</div>  <div id="atack" class="bar-stats" style="width:${pokemonJsonDetail.stats[1].base_stat}px;"></div><span> ${pokemonJsonDetail.stats[1].base_stat}</span></li>
                   <li><div class="stats-dados">Defense:</div>  <div id="defense" class="bar-stats" style="width:${pokemonJsonDetail.stats[2].base_stat}px;"></div><span> ${pokemonJsonDetail.stats[2].base_stat}</span></li>
                   <li><div class="stats-dados">Special Attack:</div>  <div id="atack" class="bar-stats" style="width:${pokemonJsonDetail.stats[3].base_stat}px;"></div><span> ${pokemonJsonDetail.stats[3].base_stat}</span></li>
                   <li><div class="stats-dados">Special Defense:</div>  <div id="hp" class="bar-stats" style="width:${pokemonJsonDetail.stats[4].base_stat}px;"></div><span> ${pokemonJsonDetail.stats[4].base_stat}</span></li>
                   <li><div class="stats-dados">Speed:</div>  <div id="atack" class="bar-stats" style="width:${pokemonJsonDetail.stats[5].base_stat}px;"></div><span> ${pokemonJsonDetail.stats[5].base_stat}</span></li>
                 </ul>

           </div>
           </div>
           `
           
           descriptionPokemon.innerHTML = newDescricao;
       })
}