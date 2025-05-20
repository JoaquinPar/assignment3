function setup() {
    let pairsMatched = 0;
    let clicks = 0;
    let lock;
    let firstCard = undefined;
    let secondCard = undefined;
    
    $(".card").on(("click"), function () {
        if ($(this).find(".front_face")[0] === firstCard || lock) {
            return;
        }

        if (!firstCard || (firstCard == $(this).find(".front_face")[0])) {
            firstCard = $(this).find(".front_face")[0];
            $(this).toggleClass("flip");
            clicks++;
        } else {
            secondCard = $(this).find(".front_face")[0]
            $(this).toggleClass("flip");
            lock = true;
            clicks++;

            if (firstCard.src == secondCard.src && firstCard.id != secondCard.id) {
                $(`#${firstCard.id}`).parent().off("click");
                $(`#${secondCard.id}`).parent().off("click");
                pairsMatched++;
                firstCard = undefined;
                secondCard = undefined;
                lock = false;
            } else {
                setTimeout(() => {
                $(`#${firstCard.id}`).parent().toggleClass("flip");
                $(`#${secondCard.id}`).parent().toggleClass("flip");
                firstCard = undefined;
                secondCard = undefined;
                
                setTimeout(() => {
                    lock = false;
                }, 500);

                }, 1000);
            }
        }

        document.getElementById("pairs-matched").innerText = pairsMatched;
        document.getElementById("pairs-remain").innerText =
            document.getElementById("pairs-total").innerText - pairsMatched;
        document.getElementById("clicks").innerText = clicks;
  });
}
