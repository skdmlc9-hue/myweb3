
//  * 상태 변수

let selectedCard = null;
let isLocked = false;


//  * 카드 클릭 이벤트

function setListenerToCard(){
    const cardAreaArr = document.querySelectorAll(".card-area");

    for(const cardArea of cardAreaArr){
        cardArea.addEventListener("click", () => {

            //  완전 차단
            if(isLocked) return;
            if(cardArea.classList.contains("removed")) return;
            if(cardArea === selectedCard) return;

            // 카드 열기
            cardArea.classList.add("flip");

            // 첫 선택
            if(selectedCard === null){
                selectedCard = cardArea;
                return;
            }

            // 비교 시작
            isLocked = true;

            const firstCard = selectedCard;
            const secondCard = cardArea;

            const val1 = firstCard.querySelector(".card-back").innerText;
            const val2 = secondCard.querySelector(".card-back").innerText;

            // 같은 카드
            if(val1 === val2){
                setTimeout(() => {
                    firstCard.classList.add("removed");
                    secondCard.classList.add("removed");
                    firstCard.classList.remove("flip");
                    secondCard.classList.remove("flip");
                    resetSelection();
                }, 300);
            }
            // 다른 카드
            else{
                setTimeout(() => {
                    firstCard.classList.remove("flip");
                    secondCard.classList.remove("flip");
                    resetSelection();
                }, 500);
            }
        });
    }
}


//  * 상태 초기화

function resetSelection(){
    selectedCard = null;
    isLocked = false;
}


//  * 카드 생성

const main = document.querySelector("main");

const emojiList = [
    "🍎","🍌","🍇","🍓","🍑",
    "🍒","🥝","🍍","🥥","🍉",
    "🐶","🐱","🐰","🦊","🐻",
    "🐼","🐸","🐵","🐤","🦄"
];

function generateCardList(){
    const cardCnt = Number(document.querySelector("#cardCnt").value);

    if(cardCnt > emojiList.length){
        alert("이모티콘 개수가 부족해요 😅");
        return;
    }

    main.innerHTML = "";
    resetSelection(); // ⭐ 새 게임 시작 시 상태 초기화

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

/**********************
 * 셔플
 **********************/
function shuffleArr(arr){
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**********************
 * 버튼
 **********************/
function handleClick(){
    generateCardList();
    setListenerToCard();
}
