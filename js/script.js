const pokemonName = document.querySelector(".pokemon__name");
const pokemonImage = document.querySelector(".pokemon__image");
const pokemonID = document.querySelector(".pokemon__id");
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn__prev");
const buttonNext = document.querySelector(".btn__next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	const data = await response.json();
	return data;
};

const renderPokemon = async (pokemon) => {
	pokemonName.innerHTML = "Loading...";
	pokemonID.innerHTML = "";
	try {
		const pokemonData = await fetchPokemon(pokemon);
		console.log(pokemonData);
		if (pokemonData) {
			pokemonName.innerHTML = pokemonData.name;
			pokemonID.innerHTML = pokemonData.id;
			pokemonImage.src =
				pokemonData["sprites"]["versions"]["generation-v"]["black-white"][
					"animated"
				]["front_default"];
            searchPokemon = pokemonData.id;
		}
	} catch (error) {
		pokemonName.innerHTML = "Not Found :(";
		pokemonImage.style.display = "none";
		pokemonID.innerHTML = "";
	}
};

form.addEventListener("submit", (event) => {
	event.preventDefault();
	renderPokemon(inputSearch.value.toLowerCase());
	form.reset();
});

buttonPrev.addEventListener("click", () => {
    if(searchPokemon >1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener("click", () => {
	searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
