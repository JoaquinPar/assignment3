let countdownInterval;

async function getPokemon(limit) {
    reset();

    document.getElementById("clicks").innerText = 0;
    document.getElementById("pairs-matched").innerText = 0;
    document.getElementById("pairs-total").innerText = limit;
    document.getElementById("pairs-remain").innerText = limit;

    if (limit == 6) {
        document.getElementById("game-grid").style.width = "800px";
        document.getElementById("game-grid").style.height = "600px";
        document.getElementById("timer").innerText = 30 + " sec.";
    } else if (limit == 9) {
        document.getElementById("game-grid").style.width = "1000px";
        document.getElementById("game-grid").style.height = "600px";
        document.getElementById("timer").innerText = 60 + " sec.";
    } else {
        document.getElementById("game-grid").style.width = "600px";
        document.getElementById("game-grid").style.height = "400px";
        document.getElementById("timer").innerText = 15 + " sec.";
    }

    let offset = Math.floor(Math.random() * 1000) + 1;
    console.log(offset);
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    let jsonObj = await response.json();
    let pokemon = jsonObj.results;

    console.log(pokemon);

    let template = document.getElementById("poke-card");

    for (let i = 0; i < limit * 2; i++) {
        let clone = template.content.cloneNode(true);

        clone.getElementById("front").id = `img${i + 1}`;
        document.getElementById("game-grid").appendChild(clone);
    }

    let cardWidth;
    if (limit === 6) {
        cardWidth = "25%";
    } else if (limit === 9) {
        cardWidth = "16.66%";
    } else {
        cardWidth = "33.33%";
    }

    // Select all card elements and apply the width
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.width = cardWidth;
    });

    let added;

    for (let i = 0; i < pokemon.length; i++) {
        added = 0;
        let response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon[i].name}`);
        let jsonObj2 = await response2.json();

        for (let j = 0; added < 2; j++) {
            let number = Math.floor(Math.random() * limit * 2) + 1;
            let toChange = document.getElementById(`img${number}`);

            if (toChange.getAttribute("src") == "") {
                toChange.src = jsonObj2.sprites.other['official-artwork'].front_default;
                added++;
            } else {
                number = Math.floor(Math.random() * limit * 2) + 1;
            }
        }
    }

    document.getElementById("difficulty").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
}

function reset() {
    clearInterval(countdownInterval);
    document.getElementById("game-grid").innerHTML = "";
    document.getElementById("difficulty").classList.remove("hidden");
    document.getElementById("game").classList.add("hidden");
    document.getElementById("clicks").innerText = "";
    document.getElementById("timer").innerText = "";
    document.getElementById("pairs-matched").innerText = "";
    document.getElementById("pairs-total").innerText = "";
    document.getElementById("pairs-remain").innerText = "";
}

function start() {
    setup();
    countdownInterval = setInterval(countdown, 1000);
}
let powerUpActivated = false;

function countdown() {
    let timer = document.getElementById("timer");
    let timeLeft = parseInt(timer.innerText);
    let pairsTotal = document.getElementById("pairs-total").innerText;
    let pairsMatched = document.getElementById("pairs-matched").innerText;

    if (timeLeft > 0) {
        timeLeft--;
        timer.innerText = `${timeLeft} sec.`;

        if (!powerUpActivated && pairsMatched > Math.floor(pairsTotal / 2)) {
            timeLeft += 5;
            timer.innerText = `${timeLeft} sec.`;
            powerUpActivated = true;
        }

        if (pairsMatched == pairsTotal) {
            clearInterval(countdownInterval);
            document.getElementById("difficulty").classList.remove("hidden");
            document.getElementById("game").classList.add("hidden");
            let cards = document.querySelectorAll(".card");
            cards.forEach(card => {
                card.style.pointerEvents = "none";
            });

            alert("You have won!");
        }
    } else {
        clearInterval(countdownInterval);
        document.getElementById("difficulty").classList.remove("hidden");
        document.getElementById("game").classList.add("hidden");
        let cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.style.pointerEvents = "none";
        });

        alert("You have lost! Try again!");
    }
}

function colorChanger(color) {
    document.querySelectorAll("button").forEach(btn => {
        btn.classList.forEach(cls => {
            if (cls.startsWith("bg-")) {
                btn.classList.remove(cls);
            }
        });

        btn.classList.add(`bg-${color}`);
    });

    let grid = document.getElementById("game-grid");
    grid.classList.forEach(cls => {
        if (cls.startsWith("ring-")) {
            grid.classList.remove(cls);
        }
    });
    grid.classList.add(`ring-2`, `ring-${color}`);
}