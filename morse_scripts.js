

function cinvertAndPlay() {
    const textInput = document.getElementById('textInput').value;
    const morseCode = text
}

const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.', '!': '-.-.--',
    '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
    ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
    '"': '.-..-.', '@': '.--.-.', ' ': '/'
};

const textToMorse = (text) => {
    return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
};

const morseToText = (morse) => {
    const morseToChar = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]));
    return morse.split(' ').map(code => morseToChar[code] || code).join('');
};

const encodeToMorse = () => {
    const textInput = document.getElementById('text-input').value;
    const result = textToMorse(textInput);
    document.getElementById('result').innerText = result;
};

const decodeFromMorse = () => {
    const morseInput = document.getElementById('morse-input').value;
    const result = morseToText(morseInput);
    document.getElementById('result').innerText = result;
};

const copyToClipboard = () => {
    const resultText = document.getElementById('result').innerText;
    const textarea = document.createElement('textarea');
    textarea.value = resultText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Copied to clipboard!');
};




function playMorseCode(morseCode) {

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const dotDuration = 100; // milliseconds

    const dashDuration = dotDuration * 3;

    const frequency = 1000; // Hz

 

    function playTone(duration) {

        const oscillator = audioContext.createOscillator();

        oscillator.type = 'sine';

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        oscillator.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(audioContext.currentTime + duration / 1000);

    }

 

    function playMorseChar(char) {

        if (char === '.') {

            playTone(dotDuration);

        } else if (char === '-') {

            playTone(dashDuration);

        }

        return new Promise(resolve => setTimeout(resolve, dotDuration)); // Inter-letter spacing

    }

 

    async function play() {

        for (const char of morseCode) {

            if (char === ' ') {

                await new Promise(resolve => setTimeout(resolve, dashDuration)); // Inter-word spacing

            } else {

                await playMorseChar(char);

            }

        }

    }

 

    play();

}