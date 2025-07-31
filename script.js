const note = document.querySelector(".hello-note");
const cardsContainer = document.querySelector(".cards-container");
const blurContent = document.querySelector(".blur-content");
let step = 0;

// create cards
const cardContents = ["Card 1", "Card 2", "Card 3", "Card 4", "Card 5"];
cardContents.forEach(content => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = content;
  cardsContainer.appendChild(card);
});

const nav=document.createElement("div");
nav.classList.add("deck-nav");
nav.innerHTML=`
<button id="prevBtn">previous</button>
<button id="nextBtn">Next</button>`;
nav.style.display="none";
document.body.appendChild(nav);

document.getElementById("prevBtn").addEventListener("click",showprevCard);
document.getElementById("nextBtn").addEventListener("click",shownextCard);

function showCard(index) {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, i)=>{
        card.style.opacity=(i===index)? "1":"0";
        card.style.transform=(i===index)
        ?"translate(-25%, -25%) scale(2)"
        : "translate(-25%, -25%) scale(1)";
        
    });
}

function shownextCard(){
    currentCardIndex=(currentCardIndex+1) % cardContents.length;
    showCard(currentCardIndex);
}

function showprevCard(){
    currentCardIndex=(currentCardIndex-1+cardContents.length) % cardContents.length;
    showCard(currentCardIndex);
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space"||e.key===" ") {
    e.preventDefault(); // stops scroll
    if (step === 0) {
      note.classList.add("show");
      step = 1;
    } 
    else if (step === 1) {
      note.classList.remove("show");
      setTimeout(() => {
        note.classList.add("hidden");
        cardsContainer.classList.remove("hidden");
        setTimeout(() => {
          cardsContainer.classList.add("show");
          blurContent.classList.add("blur");
        }, 50);
      }, 500);
      step = 2;
    } 
    else if (step===2){
        //zoom mode ON
        cardsContainer.classList.add("zoom");
        document.body.classList.add("blur-background");
        nav.style.display="flex";
        showCard(currentCardIndex);
        step=3;
    } 
    else if (step===3) {
        // exit zoom mode
        cardsContainer.classList.remove("zoom");
        document.body.classList.remove("blur-background");
        nav.style.opacity="1";
        card.style.transform="";

    }
  }
});
const cards = document.querySelectorAll('.card');
let activeIndex = 0; // start with first card

document.querySelector('#nextBtn').addEventListener('click', () => {
  // Remove active class from all cards
  cards.forEach(card => card.classList.remove('active'));

  // Set active card
  activeIndex = (activeIndex + 1) % cards.length;  // loop back to start
  cards[activeIndex].classList.add('active');
});
document.querySelector('#prevBtn').addEventListener('click', () => {
  cards.forEach(card => card.classList.remove('active'));
  activeIndex = (activeIndex - 1 + cards.length) % cards.length;
  cards[activeIndex].classList.add('active');
});
