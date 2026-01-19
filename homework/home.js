function setListenerToCard(){
    const cardAreaArr = document.querySelectorAll(".card-area");

    for(const cardArea of cardAreaArr){
        cardArea.addEventListener("click", function(){

            if(isLocked) return;
            if(cardArea.style.visibility === "hidden") return;

            // 그림 뒤집기
            cardArea.classList.add("flip");

            // 첫 선택
            if(selectedCard === null){
                selectedCard = cardArea;
                return;
            }

            // 같은 그림 다시 클릭 방지
            if(selectedCard === cardArea) return;

            isLocked = true;

            const num1 = selectedCard.querySelector(".card-back").innerText;
            const num2 = cardArea.querySelector(".card-back").innerText;

            // 같은 숫자
            if(num1 === num2){
                setTimeout(() => {
                    selectedCard.style.visibility = "hidden";
                    cardArea.style.visibility = "hidden";
                    resetSelection();
                }, 300);
            }
            // 다른 숫자
            else{
                setTimeout(() => {
                    selectedCard.classList.remove("flip");
                    resetSelection();
                }, 500);
            }
        });
    }
}

const main = document.querySelector("main");

function generateCardList(){
    const cardCnt = document.querySelector("#cardCnt").value;

    if(cardCnt > emojiList.length){
        alert("이모티콘 개수가 부족해요 😅");
        return;
    }

    main.innerHTML = "";

    const arr = emojiList.slice(0, cardCnt);
    const cardArr = arr.concat(arr);

    shuffleArr(cardArr);

    for(const emoji of cardArr){
        main.innerHTML += `
            <div class="card-area">
                <div class="card">
                    <div class="card-back">${emoji}</div>
                    <div class="card-front">❓</div>
                </div>
            </div>
        `;
    }
}

function shuffleArr(arr){
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  return arr;
}

function handleClick(){
    generateCardList();
    setListenerToCard();
}

let selectedCard = null; // 현재 선택된 그림 1장
let isLocked = false;  

function resetSelection(){
    selectedCard = null;
    isLocked = false;
}

const emojiList = [
    "🍎","🍌","🍇","🍓","🍑",
    "🍒","🥝","🍍","🥥","🍉",
    "🐶","🐱","🐰","🦊","🐻",
    "🐼","🐸","🐵","🐤","🦄"
];

