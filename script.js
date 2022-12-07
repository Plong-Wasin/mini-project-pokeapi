(() => {
    const template = document.querySelector("#pokemon-card-template");
    const pokemonCardContainer = document.querySelector(
        "#pokemon-card-container"
    );
    // (async() => {
    //     const promise = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0");
    //     const res = await promise.json();

    // })();
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
        .then((res) => res.json())
        .then((data) => {
            data.results.forEach((pokemon) => {
                fetch(pokemon.url)
                    .then((res) => res.json())
                    .then((data) => {
                        const clone = template.content.cloneNode(true);
                        clone.querySelector(".pokemon-name").innerText =
                            data.name;
                        clone.querySelector(".pokemon-image").src =
                            data.sprites.back_default;
                        clone.querySelector(".pokemon-image").alt = data.name;
                        clone.querySelector(".pokemon-image").alt = data.name;
                        clone.querySelector(".pokemon-image").dataset.front =
                            data.sprites.front_default;
                        clone.querySelector(".pokemon-image").dataset.back =
                            data.sprites.back_default;
                        // if hover over image, change image to front
                        clone
                            .querySelector(".pokemon-image")
                            .addEventListener("mouseover", function () {
                                this.src = this.dataset.front;
                            });
                        // if hover over image, change image to back
                        clone
                            .querySelector(".pokemon-image")
                            .addEventListener("mouseout", function () {
                                this.src = this.dataset.back;
                            });
                        clone.querySelector(
                            ".pokemon-card"
                        ).dataset.pokemonName = data.name;
                        pokemonCardContainer.appendChild(clone);
                    });
            });
        });
    document.querySelector("#search").addEventListener("input", function () {
        const searchValue = this.value;
        const pokemonCards = document.querySelectorAll(".pokemon-card");
        pokemonCards.forEach((pokemonCard) => {
            const pokemonName = pokemonCard.dataset.pokemonName;
            if (pokemonName.includes(searchValue)) {
                pokemonCard.parentElement.style.display = "block";
            } else {
                pokemonCard.parentElement.style.display = "none";
            }
        });
    });
})();
