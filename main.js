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
    
    const rowLength = myField.getRowLength() - 1;
    let colLength = myField.getColLength() -1;

    myField.printCurrentField();
    do {

    //get user input
    let userInput = prompt('Which direction would you like to move: u, d, l, or r? : ');
    
    //allocate field location based on user input result
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

    //update user position and print new table or display win/loose status
    if(myField.gameTable[myField.rowIndex][myField.colIndex] === hole)
    {
        console.log('You have fallen down a hole, Game Over!');
        break;
    }
    else if (myField.gameTable[myField.rowIndex][myField.colIndex] === hat) 
    {
        console.log('You found the hat, You Win!');
        break;
    }
        
    else {
        myField.gameTable[myField.rowIndex][myField.colIndex] = pathCharacter;
        console.clear();
        myField.printCurrentField();
    }
}

while (myField.gameTable[myField.rowIndex][myField.colIndex] != hole || myField.gameTable[myField.rowIndex][myField.colIndex] != hat);

};

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

runGame();