let selectedCard01 = null;
let selectedCard02 = null;
let v01;
let v02;

function setListenerToCard(){
    const cardAreaArr = document.querySelectorAll(".card-area");
    for(const cardArea of cardAreaArr){
        cardArea.addEventListener("click" , function(evt){
            
            //같은카드 또 선택하면, 아무것도 안하기
            if(selectedCard01 !== null && se){
                return;
            }

            //선택된카드 및 값 설정하기
            if(selectedCard01 === null){
                selectedCard01 = cardArea;
                v01 = selectedCard01.children[0].children[0].innerHTML;
            }else if(selectedCard01 !== null && selectedCard02 ){
                selectedCard02 = cardArea;
                v02 = selectedCard02.children[0].children[0].innerHTML;
            }

            //카드 뒤집어서 숫자 보여주기
            const temp = evt.currentTarget;
            temp.classList.add("flip");

            //1번카드,2번카드 채워져있으면 다시 안보이게 뒤집기
            if(selectedCard01 !== null && selectedCard02 !== null){
                setTimeout(() => {
                  const  x = selectedCard01;
                  const  y = selectedCard02;

                    x.remove("flip");
                    y.remove("flip");
                    
                }, timeout);
            },1000);

            //값 일치하면 숨기기
            if(selectedCard01 !== null && selectedCard02 
                const removeCard01 = selectedCard01;
                const removeCard02 = selectedCard02;
                setTimeout(() => {
                    removeCard01.classList.add("hide");
                    removeCard01.children[0].classList.add("hide");
                    removeCard01.children[0].children[0].classList.add("hide");
                    removeCard01.children[0].children[1].classList.add("hide");

                    removeCard02.classList.add("hide");
                    removeCard02.children[0].classList.add("hide");
                    removeCard02.children[0].children[0].classList.add("hide");
                    removeCard02.children[0].children[1].classList.add("hide");
                }, 100);
            }

            //카드 두장 골랐으면, 변수들 초기화 시키기
            if(selectedCard01 !== null && selectedCard02 !== null){
                selectedCard01 = null;
                selectedCard02 = null;
                v01 = null;
                v02 = null;
            }
            
            
        });
    }
}

const main = document.querySelector("main");

function generateCardList(){
    const cardCnt = document.querySelector("#cardCnt").value;
    if(cardCnt > 50){
        alert("최대 50개 ,,,개발자 괴롭히기를 멈춰주세요 ,,");
        return;
    }
    main.innerHTML = "";

    const cardContentArr = [];
    for(let i = 1; i <= cardCnt; i++){
        cardContentArr.push(i);
    }

    const arr = cardContentArr.concat(cardContentArr);

    shuffleArr(arr);

    for(const temp of arr){
        main.innerHTML += `
            <div class="card-area">
                <div class="card">
                    <div class="card-back">${temp}</div>
                    <div class="card-front">?</div>
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
