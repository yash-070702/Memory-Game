const cards=document.querySelectorAll(".card");

let cardOne ;
let cardTwo;
let matchedCard=0;
let disableDeck=false // we are sing this to prevent theuser to click on the other card until the cards will not flip back again

function flipCard(e){
   let clickedCard=e.target;

   //this if condition will prevent to click on the same card
   if(clickedCard!==cardOne && !disableDeck)
   {
    clickedCard.classList.add("flip");
    if(!cardOne){
     return cardOne=clickedCard;
    }
    cardTwo=clickedCard;
    disableDeck=true;
   let cardOneImg=cardOne.querySelector("img").src;
   let cardTwoImg=cardTwo.querySelector("img").src;

matchCards(cardOneImg,cardTwoImg);
   }
   
}

function matchCards(img1,img2){
    if(img1===img2){
        matchedCard++;
        if(matchedCard===8){
            setTimeout(()=>{
                return  shuffleCard();
            },1000);
         
        }

        cardOne.removeEventListener("click",flipCard);
        cardTwo.removeEventListener("click",flipCard);
        cardOne = cardTwo = "";    // setting the value of both the cards to blank
        return   disableDeck=false;   // we are returning so tht after match of the cards lower codewill not work
    }

    // shaking the cards if they dont match
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    //turn backing th ecards if they dont match
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";    // setting the value of both the cards to blank
        disableDeck = false;
    }, 1200);
   
}

function shuffleCard(){
 cardOne = cardTwo ="";
 matchedCard=0;
 disableDeck=false;

 let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
 arr.sort(() => Math.random() > 0.5 ? 1 : -1); //sorting the array in the random manner to arrange images randomly 

 cards.forEach((card,index)=>{
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `./images/img-${arr[index]}.png`;
    card.addEventListener("click",flipCard);
});
}
shuffleCard(); //generating images at random places

cards.forEach(card=>{
  
    card.addEventListener("click",flipCard);
});

