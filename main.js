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

    static fieldGenerator(rows, cols, percentage) {
        let area = rows * cols;
        let numOfHoles = Math.floor(area * (percentage / 100));
        let fieldArray = [];
    
        // Generate the field array with fieldCharacter
        for (let i = 0; i < rows; i++) {
            let innerArray = [];
            for (let j = 0; j < cols; j++) {
                innerArray.push(fieldCharacter);
            }
            fieldArray.push(innerArray);
        }
    
        // Randomly allocate holes
        while (numOfHoles > 0) {
            const randomRowIndex = Math.floor(Math.random() * rows);
            const randomColIndex = Math.floor(Math.random() * cols);
    
            if (fieldArray[randomRowIndex][randomColIndex] !== hole &&
                fieldArray[randomRowIndex][randomColIndex] !== pathCharacter) {
                fieldArray[randomRowIndex][randomColIndex] = hole;
                numOfHoles--;
            }
        }
    
        // Randomly allocate the starting position and hat position
        let hatRow, hatCol, startRow, startCol;
        do {
            hatRow = Math.floor(Math.random() * rows);
            hatCol = Math.floor(Math.random() * cols);
            startRow = Math.floor(Math.random() * rows);
            startCol = Math.floor(Math.random() * cols);
        } while ((hatRow === startRow && hatCol === startCol) || 
                 (fieldArray[startRow][startCol] === hole));
    
        // Set the starting position and hat position
        fieldArray[startRow][startCol] = pathCharacter;
        fieldArray[hatRow][hatCol] = hat;
    
        return fieldArray;
    }
}

//  function to get user input
const getUserInput = () => {
    let userInput = prompt('Which direction would you like to move: u, d, l, or r? : ');
    if(!['u', 'd', 'l', 'r'].includes(userInput)) {
        userInput = prompt('You have not made a valid selection! Please select: u, d, l, or r :');
    }
    return userInput;
};

// function to update field location based on user input
const updateField = (direction, myField) => { // Add myField parameter
    const rowLength = myField.getRowLength() - 1;
    const colLength = myField.getColLength() - 1;

    // Calculate the new position based on the direction
    let newRow = myField.rowIndex;
    let newCol = myField.colIndex;
    switch(direction) {
        case 'u': 
            newRow = Math.max(0, myField.rowIndex - 1);
            break;
        case 'd':
            newRow = Math.min(rowLength, myField.rowIndex + 1);
            break;
        case 'l':
            newCol = Math.max(0, myField.colIndex - 1);
            break;
        case 'r':
            newCol = Math.min(colLength, myField.colIndex + 1);
            break;
    }

    // Check if the new position is valid
    if (myField.gameTable[newRow][newCol] !== hole) {
        // Update the position if valid
        myField.rowIndex = newRow;
        myField.colIndex = newCol;
    }
};

// function to check game status

const checkGameStatus = (myField) => {
    if (myField.gameTable[myField.rowIndex][myField.colIndex] === hole) {
        console.log('You have fallen down a hole, Game Over!');
        return true;
    } else if (myField.gameTable[myField.rowIndex][myField.colIndex] === hat) {
        console.log('You found the hat, You Win!');
        return true;
    }
    return false;
};

// function to run the game
const runGame = () => {
    // Generate the field array
    const fieldArray = Field.fieldGenerator(50, 30, 30);
    // Create a new Field object
    const myField = new Field(fieldArray);
    // Set the starting position as the current position of the path character
    myField.rowIndex = myField.gameTable.findIndex(row => row.includes(pathCharacter));
    myField.colIndex = myField.gameTable[myField.rowIndex].indexOf(pathCharacter);
    
    myField.printCurrentField();

    do {
        const userInput = getUserInput();
        updateField(userInput, myField); // Pass myField to updateField

        if (checkGameStatus(myField)) {
            break;
        }

        myField.gameTable[myField.rowIndex][myField.colIndex] = pathCharacter;
        console.clear();
        myField.printCurrentField();
    } while (true);
};

// Original code base below

// const runGame = () => {
    
//     const rowLength = myField.getRowLength() - 1;
//     let colLength = myField.getColLength() -1;

//     myField.printCurrentField();
//     do {

//     //get user input
//     let userInput = prompt('Which direction would you like to move: u, d, l, or r? : ');
    
//     //allocate field location based on user input result
//     switch(userInput) {
//         case 'u': 
//             if(myField.rowIndex != 0) {
//                 myField.rowIndex -= 1;
//             }
//             break;
//         case 'd':
//             if(myField.rowIndex != rowLength) {
//                 myField.rowIndex += 1;
//             }
//             break;
//         case 'l':
//             if(myField.colIndex != 0) {
//                 myField.colIndex -= 1;
//             }
//             break;
//         case 'r':
//             if(myField.colIndex != colLength) {
//                 myField.colIndex += 1;
//             }
//             break;
//         default:
//             userInput = prompt('You have not made a valid selection! Please select: u, d, l, or r :');
//     }

//     //update user position and print new table or display win/loose status
//     if(myField.gameTable[myField.rowIndex][myField.colIndex] === hole)
//     {
//         console.log('You have fallen down a hole, Game Over!');
//         break;
//     }
//     else if (myField.gameTable[myField.rowIndex][myField.colIndex] === hat) 
//     {
//         console.log('You found the hat, You Win!');
//         break;
//     }
        
//     else {
//         myField.gameTable[myField.rowIndex][myField.colIndex] = pathCharacter;
//         console.clear();
//         myField.printCurrentField();
//     }
// }

// while (myField.gameTable[myField.rowIndex][myField.colIndex] != hole || myField.gameTable[myField.rowIndex][myField.colIndex] != hat);

// };

runGame();