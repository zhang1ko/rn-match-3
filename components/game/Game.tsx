import React, { Component } from 'react';
import {
View,
Text,
} from 'react-native';
import GridBoard from './GridBoard';
import Square from './Square';
import {gameStyles} from './GameStyles';

const row = 8;
const column = 8;
const boardSize = row*column;
enum Directions {
    Up = -column,
    Down = column,
    Left = -1,
    Right = 1,
}
enum squareType {
    red = 1,    
    blue = 2,
    yellow = 3,
    green = 4,
    white = 5,
    grey = 0
}
function randomEnum<Number>(anEnum: Number): Number[keyof Number] {
    const enumValues = Object.keys(anEnum)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as Number[keyof Number][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
}

interface GameState {
    onBoardSquares: Array<Square>;
    score: number;
}

export default class Game extends React.Component<{}, GameState> {
    _gameStarted = false;

    constructor(props: {}) {
        super(props);
        this.state = {
            onBoardSquares: [],
            score: 0
        }
    }
    
    swapSquare = (data: Array<Square>, location: number, direction: number) => {
        let temp: Square;
        let tempKey: number;
        let tempKey1: number;
    
        tempKey = data[location].key;
        temp = data[location];
        tempKey1 = data[location + direction].key;
        
        data[location] = data[location + direction];
        data[location].setKey(tempKey);
        
        data[location + direction] = temp;
        data[location + direction].setKey(tempKey1);
        console.log("swap func called")
        
        this.setState({onBoardSquares: data})
        
        if (this._gameStarted) 
            setTimeout(() => {this.checkMatch(data)}, 300);
        else
            this.checkMatch(data);
        return data;
    }
    /*
    animateValuesToLocations() {
        this.state.onBoardSquares.forEach((row, i) => {
            Animated.timing(e.location, {
                toValue: { x: TILE_WIDTH * i, y: TILE_WIDTH * j },
                duration: 250
            }).start();        
        });
    }*/
    
    moveSquare = (location: number, direction: string) => {
        switch(direction){
            case 'up':
                return this.swapSquare(this.state.onBoardSquares, location, Directions.Up);
            case 'down':
                return this.swapSquare(this.state.onBoardSquares, location, Directions.Down);
            case 'left':
                return this.swapSquare(this.state.onBoardSquares, location, Directions.Left);
            case 'right':
                return this.swapSquare(this.state.onBoardSquares, location, Directions.Right);
            default:
                return this.state.onBoardSquares;
        }
    }

    checkMatch = (data: Array<Square>) => {
        console.log("check match");
        let hasMatch = false;

        hasMatch = this.horizontalCheck(data);
        if (!hasMatch)
            hasMatch = this.verticalCheck(data);
        else
            this.verticalCheck(data);


        if (hasMatch) {
            if (this._gameStarted){
                setTimeout(() => {this.dropDown(data)}, 500);
            }
            else {
                this.dropDown(data);
            }
        }
        this.setState({onBoardSquares: data})
        
        return data;
    }

    horizontalCheck = (data: Array<Square>) => {
        let temp: string;
        let matches = 1; 
        let hasMatch = false;

        temp = data[0].type;

        for (let currPos = 1; currPos < row*column; currPos++) {
            if (temp !== (data[currPos].type) && matches > 2) { // if the match has eneded and the number of matches is 3 or greater
                temp = data[currPos].type;
                console.log("match found");
                hasMatch = true;
                this.removeMatch(data, (currPos - matches), matches, Directions.Right);
                matches = 1;
            }
            else if (currPos % column == 7 && temp == data[currPos].type && matches > 1) { //if it is the end of the row and it is a match
                console.log("match found");
                hasMatch = true;
                matches++;
                this.removeMatch(data, (currPos - matches + 1), matches, Directions.Right);
                matches = 1;
            }
            else if (currPos % column == 0) {    //new row
                temp = data[currPos].type;
                matches = 1;
            }
            else if (temp == data[currPos].type) {    // if match is found, increment match by 1
                matches++;
            }
            else{   // no match is found
                temp = data[currPos].type;
                matches = 1;
            }
        }
        return hasMatch;
    }

    verticalCheck = (data: Array<Square>) => {
        let temp: string;
        let matches = 1; 
        let hasMatch = false;

        temp = data[0].type;

        // vertical check
        for (let currPos = 0; currPos < row; currPos++) { 
            // new column reset
            temp = data[currPos].type;
            matches = 1;

            for (let aboveCurrPos = 1; aboveCurrPos < column; aboveCurrPos++){
                if (temp !== (data[currPos + (aboveCurrPos*column)].type) && matches > 2) { // if the match has eneded and the number of matches is 3 or greater
                    temp = data[currPos + (aboveCurrPos*column)].type;
                    console.log("vertical match found");
                    hasMatch = true;
                    this.removeMatch(data, (currPos + (aboveCurrPos*column) - matches * column), matches, Directions.Down);
                    matches = 1;
                }
                else if ((aboveCurrPos*column) > 55 && temp == data[currPos+ (aboveCurrPos*column)].type && matches > 1) { // if it is the end of the column and it is a match
                    console.log("vertical match found");
                    hasMatch = true;
                    matches++;
                    this.removeMatch(data, (currPos + (aboveCurrPos*column) - (matches-1) * column), matches, Directions.Down);
                    matches = 1;
                }
                else if ( temp == data[currPos + (aboveCurrPos*column)].type && data[currPos + (aboveCurrPos*column)].type !== squareType.grey.toString() ) { // if a match is found
                    matches++;
                }
                else {
                    temp = data[currPos + (aboveCurrPos*column)].type;
                    matches = 1;
                }
            }
        }
        return hasMatch;
    }

    removeMatch = (data: Array<Square>, startLocation: number, numOfMatches: number, direction: number) => {
        let move = direction;
        if (move == column) {
            console.log("vertical");
        }

        for (let currPos = 0; currPos < numOfMatches * move; currPos+=move) {
            data[startLocation + currPos] = new Square({title: `0`, key: (startLocation + currPos), swap: this.moveSquare});
        }
        
        if (this._gameStarted) {
            this.setState({score: this.state.score + numOfMatches});
        }
        this.setState({onBoardSquares: data})
        
        return data;
    }

    dropDown = (data: Array<Square>) => {
        console.log("drop down func called");
        let currPos: number;
        let hasDropDown: boolean;
        
        for (currPos = (row * column) -1; currPos >= 0; currPos--) {
            if ( data[currPos].type == squareType.grey.toString() ) {
                if (currPos > column -1) {
                    let aboveCurrPos: number;
                    for( aboveCurrPos = 1; aboveCurrPos*column <= currPos; aboveCurrPos++) {
                        if ( data[currPos - aboveCurrPos*column].type !== squareType.grey.toString() ) {
                            data[currPos] = data[currPos - aboveCurrPos*column];
                            data[currPos].setKey(currPos);
                            data[currPos - aboveCurrPos*column] = new Square({title: `0`, key: (currPos - aboveCurrPos*column), swap: this.moveSquare});
                            hasDropDown = true;
                            break;
                        }
                    }
                }
            }
        }
        this.setState({onBoardSquares: data})
        if (hasDropDown = true) {
            if (this._gameStarted) 
                setTimeout(() => {this.newSquare(data), this.checkMatch(data)}, 500);
                
            else
                this.newSquare(data);
                this.checkMatch(data)
        }
        return data;
    }

    newSquare = (data: Array<Square>) => {
        let currPos: number;

        for (currPos = 0; currPos < column; currPos++) {
            if (data[currPos].type == squareType.grey.toString()) {
                data[currPos] = new Square({title: `${randomEnum(squareType)}`, key: currPos, swap: this.moveSquare});
                if (this._gameStarted) 
                    setTimeout(() => {this.dropDown(data)}, 10);
                else
                    this.dropDown(data);
            }
        }
        
        this.setState({onBoardSquares: data})
        return data;
    }

    formatData = (data: Array<Square>) => {
        let numberOfBlankElements = boardSize - data.length;
        let elementOn = (row * column) - numberOfBlankElements;
        let elementType: number;

        while (elementOn !== (row * column) && numberOfBlankElements !== 0) {
            elementType = randomEnum(squareType);
            let temp = new Square({title: `${elementType}`, key: elementOn, swap: this.moveSquare});
            data.push(temp);
            elementOn++;
        }
        this.setState({onBoardSquares: data})
        
        return data;
    }

    shuffleData = (data: Array<Square>) => {
        let temp: Square;
        let tempKey: number;
        let tempKey1: number;

        let currPos = data.length - 1;
        for (; currPos > 0; currPos--) {
            const randPos = Math.floor(Math.random() * (currPos + 1));
            tempKey = data[currPos].key;
            temp = data[currPos];
            tempKey1 = data[randPos].key;

            data[currPos] = data[randPos];
            data[currPos].setKey(tempKey);

            data[randPos] = temp;
            data[randPos].setKey(tempKey1);
        }
        this.setState({onBoardSquares: data})
        
        return data;
    }

    componentDidMount() { 
        this.formatData(this.state.onBoardSquares);
        this.checkMatch(this.state.onBoardSquares);
        this._gameStarted = true;
        
     }
    componentWillUnmount() {  
        this._gameStarted = false;
    }

    render () {
        return (
            <View>
                <Text style={gameStyles.screen}>Score: {this.state.score * 10}</Text>
                <GridBoard items={this.state.onBoardSquares} />
            </ View>
        );
    }
};
