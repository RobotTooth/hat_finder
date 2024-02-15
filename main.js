const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(gameTable) {
        this.gameTable = gameTable;
        this.rowIndex = 0;
        this.colIndex= 0;
    }

    getRowLength() {
        return this.gameTable.length;
    }

    getColLength() {
        return this.gameTable[this.rowIndex].length;
    }

    printCurrentField() {
        for(let square of this.gameTable) {
            console.log(square.join(''));
        }
    }
}

const runGame = () => {
        
    const myField = new Field([
        ['*', '░', 'O'],
        ['░', 'O', '░'],
        ['░', '^', '░'],
    ]);
    const rowLength = myField.getRowLength() - 1;
    let colLength = myField.getColLength() -1;

    myField.printCurrentField();
    let userInput = prompt('Which direction would you like to move: u, d, l, or r? : ');
    
    switch(userInput) {
        case 'u': 
            if(myField.rowIndex != 0) {
                myField.rowIndex -= 1;
            }
            break;
        case 'd':
            if(myField.rowIndex != rowLength) {
                myField.rowIndex += 1;
            }
            break;
        case 'l':
            if(myField.colIndex != 0) {
                myField.colIndex -= 1;
            }
            break;
        case 'r':
            if(myField.colIndex != colLength) {
                myField.colIndex += 1;
            }
            break;
        default:
            userInput = prompt('You have not made a valid selection! Please select: u, d, l, or r :');
    }


};



runGame();