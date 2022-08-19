const pokemonName = document.querySelector(".pokemon__name");
const pokemonImage = document.querySelector(".pokemon__image");
const pokemonID = document.querySelector(".pokemon__id");
const pokemonHP = document.querySelector(".pokemon__hp");
const pokemonAttack = document.querySelector(".pokemon__attack");
const pokemonDefense = document.querySelector(".pokemon__defense");
const pokemonSpecialDefense = document.querySelector(".pokemon__spdefense");
const pokemonSpecialAttack = document.querySelector(".pokemon__spattack");
const pokemonSpeed = document.querySelector(".pokemon__speed");
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
	pokemonHP.innerHTML = "";
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
			pokemonHP.innerHTML = pokemonData["stats"][0]["base_stat"];
			pokemonAttack.innerHTML = pokemonData["stats"][1]["base_stat"];
			pokemonDefense.innerHTML = pokemonData["stats"][2]["base_stat"];
			pokemonSpecialAttack.innerHTML = pokemonData["stats"][3]["base_stat"];
			pokemonSpecialDefense.innerHTML = pokemonData["stats"][4]["base_stat"];
			pokemonSpeed.innerHTML = pokemonData["stats"][5]["base_stat"];
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
	if (searchPokemon > 1) {
		searchPokemon -= 1;
		renderPokemon(searchPokemon);
	}
});

buttonNext.addEventListener("click", () => {
	searchPokemon += 1;
	renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
