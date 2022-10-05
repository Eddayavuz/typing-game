const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');
const message = document.getElementById('message');

const quotes = [
    'Things are only impossible until they are not',
    'It is possible to commit no errors and still lose. That is not a weakness. That is life',
    'There is a way out of every box, a solution to every puzzle; it is just a matter of finding it.',
    'Without freedom of choice there is no creativity',
    'Logic is the beginning of wisdom, not the end',
    'Improve a mechanical device and you may double productivity. But improve yourself, you gain a thousandfold',
    'Compassion: that is the one thing no machine ever had. Maybe it is the one thing that keeps us ahead of them.',
];

let wordQueue;
let highlightPosition;
let startTime;
let wrongInput;
let quoteLen;

function startGame() {
    console.log('Game Started!')
    input.setSelectionRange(0, 0);
    input.focus();
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteText = quotes[quoteIndex];
    
    message.innerHTML = "<img></img>"

    wordQueue = quoteText.split(' '); // ['type', 'me']
    quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join('');// 
    quoteLen = quoteText.replaceAll(" ", "").replaceAll(".","").replaceAll(",","").replaceAll(";","").replaceAll(":","").replaceAll("!","");
    console.log("current quote len =", quoteLen.length);
    
    highlightPosition = 0;
    quote.childNodes[highlightPosition].className = 'highlight';

    document.body.className = "";
    wrongInput = 0;

    setTimeout(() => {start.className = "button";},2000);
    startTime = new Date().getTime();

}

function checkInput() {
   
    const currentWord = wordQueue[0].replaceAll(".","").replaceAll(",","").replaceAll(";","").replaceAll(":","").replaceAll("!","");
    const typedValue = input.value.trim();

    
    if (currentWord !== typedValue) {
        
        if (currentWord.startsWith(typedValue))
        {
            input.className = "";
        }else{
            input.className = "error";
            wrongInput++;
        }  
        return;
      
    }
    wordQueue.shift(); // remove the first item from the array, making the next item
    input.value = '';

    quote.childNodes[highlightPosition].className = "";
    
    if (wordQueue.length == 0){
        gameOver();
        return;
    }

    highlightPosition++;
    quote.childNodes[highlightPosition].className = 'highlight';
}

function gameOver(){
    const elapsedTime = new Date().getTime() - startTime;
    document.body.className = "winner";
    console.log("wrongInput =", wrongInput);
    message.innerHTML = ` 
    You finished in ${elapsedTime / 1000} seconds. With %${(wrongInput*quoteLen.length)/100} mistakes.<br><span class= 'congrats'>Congrats you earned a badge!<br><br><img class='badge' src='https://i.ibb.co/8jDPrJ0/rocket-badge.png'></img></span>
    `}

start.addEventListener('click', startGame);
input.addEventListener('input', checkInput);
