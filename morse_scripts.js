const morseCodeMapping = {
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

// Function to convert text to Morse code
function textToMorse(text) {
    return text.toUpperCase().split('').map(char => morseCodeMapping[char] || char).join(' ');
}

// Function to play Morse code as audio
function playMorseCode(morseCode) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const dotDuration = 100; // duration for dot (milliseconds)
    const dashDuration = dotDuration * 3; // duration for dash
    const pauseBetweenElements = dotDuration; // pause between dots/dashes
    const pauseBetweenLetters = dashDuration; // pause between letters
    const pauseBetweenWords = dotDuration * 7; // pause between words
    const frequency = 600; // tone frequency (Hz)

    let currentTime = audioContext.currentTime;

    function playTone(duration) {
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.value = frequency;
        oscillator.connect(audioContext.destination);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration);
        currentTime += duration;
    }

    function playSilence(duration) {
        currentTime += duration;
    }

    // Loop through each character in the Morse code and play the corresponding tone
    for (const char of morseCode) {
        if (char === '.') {
            playTone(dotDuration / 1000); // play dot sound
        } else if (char === '-') {
            playTone(dashDuration / 1000); // play dash sound
        } else if (char === ' ') {
            playSilence(pauseBetweenWords / 1000); // silence between words
        }
        playSilence(pauseBetweenElements / 1000); // silence between dots/dashes
    }
}

// Main function that handles converting text and playing Morse code
function convertAndPlay() {
    const textInput = document.getElementById('text-input').value;
    const morseCode = textToMorse(textInput);
    document.getElementById('result').innerText = morseCode;
    playMorseCode(morseCode); // Play Morse code as audio
}

// Function to encode text to Morse and display the result
function encodeToMorse() {
    const textInput = document.getElementById('text-input').value;
    const result = textToMorse(textInput);
    document.getElementById('result').innerText = result;
}

// Function to decode Morse code to text
function morseToText(morse) {
    const morseToChar = Object.fromEntries(Object.entries(morseCodeMapping).map(([k, v]) => [v, k]));
    return morse.split(' ').map(code => morseToChar[code] || code).join('');
}

// Function to handle Morse code decoding
function decodeFromMorse() {
    const morseInput = document.getElementById('morse-input').value;
    const result = morseToText(morseInput);
    document.getElementById('result').innerText = result;
}

// Function to copy the result to the clipboard
function copyToClipboard() {
    const resultText = document.getElementById('result').innerText;
    const textarea = document.createElement('textarea');
    textarea.value = resultText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Copied to clipboard!');
}