document.addEventListener('DOMContentLoaded', () => {
    const cardNumber = 7;

    const gridLimit = 25;

    let redToWrite = cardNumber;
    let blueToWrite = cardNumber;
    let blackToWrite = 1;

    const wordsList = [
        'zrg',
        'ergojk',
    ];

    const colorsMap = { black : 'black', red: 'red', blue: 'blue'};

    const grid = []; // { value: Word, color: Blue, Red, Black}

    fillWords = () => {
        //call api
        // fill wordsList
    }

    _writeCase = (word, color) => {
        const caseItem = { color: color, word : word };
        grid.push(caseItem);
    }

    writeCase = () => {
        const word = wordsList[Math.floor(Math.random() * wordsList.length)];
        const writtenCase = null;

        var r = Math.random();
        if (r < 0.20 && redToWrite > 0) {
            _writeCase(word, colorsMap.red);
            redToWrite--;
        } else if (r < 0.4 && blueToWrite > 0) {
            _writeCase(word, colorsMap.blue);
            blueToWrite--;
        } else if (r < 0.6 && blackToWrite > 0) {
            _writeCase(word, null);
            blackToWrite--;
        } else if (r < 0.9) {
            _writeCase(word, colorsMap.black);
        }
    }

    const wordsContainer = document.querySelector('word-list');

    for (let i = 0; i < gridLimit; i++) {
        console.log(i);
        
        writeCase();
    }
    console.log(grid);
});