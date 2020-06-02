import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
} from 'react-native';
import GridBoard from './GridBoard';
import Square from './Square';
import {gameStyles} from './Styles';

const row = 8;
const column = 8;

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
                return this.swapSquare(this.state.onBoardSquares, location, -column);
            case 'down':
                return this.swapSquare(this.state.onBoardSquares, location, column);
            case 'left':
                return this.swapSquare(this.state.onBoardSquares, location, -1);
            case 'right':
                return this.swapSquare(this.state.onBoardSquares, location, 1);
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


        this.setState({onBoardSquares: data})
        
        return data;
    }

    horizontalCheck = (data: Array<Square>) => {
        let temp: string;
        let matches = 1; 
        let hasMatch = false;

        temp = data[0].type;

        for (let i = 1; i < row*column; i++) {
            if (temp !== (data[i].type) && matches > 2) { // if the match has eneded and the number of matches is 3 or greater
                temp = data[i].type;
                console.log("match found");
                hasMatch = true;
                matches = 1;
            }
            else if (i % column == 7 && temp == data[i].type && matches > 1) { //if it is the end of the row and it is a match
                console.log("match found");
                hasMatch = true;
                matches++;
                matches = 1;
            }
            else if (i % column == 0) {    //new row
                temp = data[i].type;
                matches = 1;
            }
            else if (temp == data[i].type) {    // if match is found, increment match by 1
                matches++;
            }
            else{   // no match is found
                temp = data[i].type;
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
        for (let i = 0; i < row; i++) { 
            // new column reset
            temp = data[i].type;
            matches = 1;

            for (let j = 1; j < column; j++){
                if (temp !== (data[i + (j*column)].type) && matches > 2) { // if the match has eneded and the number of matches is 3 or greater
                    temp = data[i + (j*column)].type;
                    console.log("vertical match found");
                    hasMatch = true;
                    matches = 1;
                }
                else if ((j*column) > 55 && temp == data[i + (j*column)].type && matches > 1) { // if it is the end of the column and it is a match
                    console.log("vertical match found");
                    hasMatch = true;
                    matches++;
                    matches = 1;
                }
                else if ( temp == data[i + (j*column)].type && data[i + (j*column)].type !== '0') { // if a match is found
                    matches++;
                }
                else {
                    temp = data[i + (j*column)].type;
                    matches = 1;
                }
            }
        }
        return hasMatch;
    }

    
    formatData = (data: Array<Square>) => {
        let numberOfBlankElements = 64 - data.length;
        let elementOn = 64 - numberOfBlankElements;
        let elementType: string;

        while (elementOn !== 64 && numberOfBlankElements !== 0) {
            elementType = (Math.floor(Math.random() * 5) + 1).toString();
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

        let i = data.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            tempKey = data[i].key;
            temp = data[i];
            tempKey1 = data[j].key;

            data[i] = data[j];
            data[i].setKey(tempKey);

            data[j] = temp;
            data[j].setKey(tempKey1);
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
