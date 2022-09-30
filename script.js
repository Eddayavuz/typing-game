const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');
const scoreBoard = document.getElementById('scoreBoard');

let wordQueue;
let highlightPosition;
let score = 10;

input.className = "reset"


function startGame() {
    console.log('Game Started!')

    let quoteText = "ece benim bebekcimdir";
    wordQueue = quoteText.split(' '); // ['ece', 'bebekcim']
    quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join('');// [<span>ece</span <span>bebekcim</span>]
    scoreBoard.innerHTML = score;
    highlightPosition = 0;
    quote.childNodes[highlightPosition].className = 'highlight'

}
function checkInput() {
    const currentWord = wordQueue[0];
    const typedValue = input.value.trim();
    if (currentWord !== typedValue) {
        input.className = currentWord.startsWith(typedValue) ? "correct" : "error";
        return;
    }


    quote.childNodes[highlightPosition].className = "";
    highlightPosition++;
    quote.childNodes[highlightPosition].className = 'highlight';
    
    wordQueue.shift(); // remove the first item from the array, making the next item.
    document.addEventListener('keyup', event => { //when the space key pressed.
        if (event.code === 'Space') {
          input.value = ''; //remove the text from textbox.
          input.className = "reset"
        }
      })
}

start.addEventListener('click', startGame);
input.addEventListener('input', checkInput);

