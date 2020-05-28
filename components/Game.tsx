import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
} from 'react-native';
import GridBoard from './GridBoard';
import Square from './Square';

interface GameState {
    onBoardSquares: Array<Square>;
}

export default class Game extends React.Component<{}, GameState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            onBoardSquares: []
        }
        this.formatData(this.state.onBoardSquares);
        this.shuffleData(this.state.onBoardSquares)
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
        return data;
    }
    
    moveSquare = (location: number, direction: string) => {
        switch(direction){
            case 'up':
                return this.swapSquare(this.state.onBoardSquares, location, -8);
            case 'down':
                return this.swapSquare(this.state.onBoardSquares, location, 8);
            case 'left':
                return this.swapSquare(this.state.onBoardSquares, location, -1);
            case 'right':
                return this.swapSquare(this.state.onBoardSquares, location, 1);
            default:
                return this.state.onBoardSquares;
        }
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

    render () {
        return (
            <View>
                <GridBoard items={this.state.onBoardSquares} />
            </ View>
        );
    }
};

const styles = StyleSheet.create({

});
