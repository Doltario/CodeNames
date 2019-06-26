document.addEventListener('DOMContentLoaded', () => {
    const cardNumber = 7;

    const gridLimit = 25;

    let redToWrite = cardNumber;
    let blueToWrite = cardNumber;
    let blackToWrite = 1;

    let wordIndex = 0;

    var wordsList = [];

    const colorsMap = { black : 'black', red: 'red', blue: 'blue'};

    const grid = []; // { value: Word, color: Blue, Red, Black}

    _fillGrid = () => {
        grid.forEach((caseItem, index) => {
            if (caseItem.color == null) {
                let r = Math.random();
                if (r < 0.20 && redToWrite > 0) {
                    grid[index].color = colorsMap.red;
                    redToWrite--;
                } else if (r < 0.4 && blueToWrite > 0) {
                    grid[index].color = colorsMap.blue;
                    blueToWrite--;
                } else if (r < 0.6 && blackToWrite > 0) {
                    grid[index].color = colorsMap.black;
                    blackToWrite--;
                }
            }
        })
    }

    fillGrid = () => { // to fill grid with color if there are too few blue or red
        while (redToWrite > 0 || blueToWrite > 0 || blackToWrite > 0) {
            _fillGrid();
        }
    }

    _writeCase = (word, color) => {
        const caseItem = { color: color, word: word };
        grid.push(caseItem);
    }

    writeCase = () => {
        const word = wordsList[wordIndex];
        wordIndex++;

        let r = Math.random();
        if (r < 0.20 && redToWrite > 0) {
            _writeCase(word, colorsMap.red);
            redToWrite--;
        } else if (r < 0.4 && blueToWrite > 0) {
            _writeCase(word, colorsMap.blue);
            blueToWrite--;
        } else if (r < 0.6 && blackToWrite > 0) {
            _writeCase(word, colorsMap.black);
            blackToWrite--;
        } else {
            _writeCase(word, null);
        }
    }

    mainProcess = () => {
        for (let i = 0; i < gridLimit; i++) {
            writeCase();
        }

        fillGrid();

        console.log(grid);

        const wordsContainer = document.querySelector('.word-list');

        for (let i = 0; i < grid.length; i++) {
            const gridItem = grid[i];
            wordsContainer.innerHTML = `<div class="word-card" color="${gridItem.color}"> ${gridItem.word} </div>` + wordsContainer.innerHTML
        }

        const cards = document.querySelectorAll('.word-card');
        
        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', (evt) => {
                if (evt.target.getAttribute("color") === 'blue') {
                    evt.target.style.backgroundColor = "#1147B6";    
                } else if (evt.target.getAttribute("color") === 'red') {
                    evt.target.style.backgroundColor = "#F9543E";
                } else {
                    evt.target.style.backgroundColor = evt.target.getAttribute("color") !== 'null' ? evt.target.getAttribute("color") : "#FFDC25";
                }
                evt.target.style.color = "#FFEDED";
            })
        }
    } 

    fillWords = () => {
        const url = window.location + "words"
        fetch(url) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.json())
            .then(function(data) {
                wordsList = data.words
                mainProcess();
            })
        .catch(function(error) {
            console.log(error)
        });
    }

    fillWords()



    
});