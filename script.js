const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');

let wordQueue;
let highlightPosition;

function startGame() {
    console.log('Game Started!')

    let quoteText = "ece bebekcim";
    wordQueue = quoteText.split(' '); // ['ece', 'bebekcim']
    quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join('');// [<span>ece</span <span>bebekcim</span>]

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
    wordQueue.shift(); // remove the first item from the array, making the next item
    input.value = '';

    quote.childNodes[highlightPosition].className = "";
    highlightPosition++;
    quote.childNodes[highlightPosition].className = 'highlight';

}

start.addEventListener('click', startGame);
input.addEventListener('input', checkInput);
