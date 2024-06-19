const morseCode = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 
            'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 
            'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', 
            '9': '----.', ' ': '/', "'": '.----.'
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
            navigator.clipboard.writeText(resultText).then(() => {
                alert('Copied to clipboard!');
            }).catch(err => {
                alert('Failed to copy text: ', err);
            });
        };
