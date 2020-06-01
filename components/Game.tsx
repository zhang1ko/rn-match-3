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
    score: number;
}

export default class Game extends React.Component<{}, GameState> {
    _isMounted = false;
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
        if (this._isMounted){
            this.setState({onBoardSquares: data})
        }
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

    checkMatch = (data: Array<Square>) => {
        console.log("check match");
        let temp: string;
        let matches = 1; 
        let i: number;
        let hasMatch = false;

        temp = data[0].type;
        hasMatch = false;

        // horizontal check
        for (i = 1; i < 64; i++) {
            if (temp !== (data[i].type) && matches > 2) {
                temp = data[i].type;
                console.log("match found");
                hasMatch = true;
                matches = 1;
            }
            else if (i % 8 == 7 && temp == data[i].type && matches > 1) {
                console.log("match found");
                hasMatch = true;
                matches++;
                matches = 1;
            }
            else if (i % 8 == 0) {    //new row
                temp = data[i].type;
                matches = 1;
            }
            else if (temp == data[i].type) {
                matches++;
            }
            else {
                temp = data[i].type;
                matches = 1;
            }
        }
        // vertical check
        for (i = 0; i < 8; i++) {
            let j: number;
            // new column reset
            temp = data[i].type;
            matches = 1;

            for (j = 1; j < 8; j++){
                if (temp !== (data[i + (j*8)].type) && matches > 2) {
                    temp = data[i + (j*8)].type;
                    console.log("vertical match found");
                    hasMatch = true;
                    matches = 1;
                }
                else if ((j*8) > 55 && temp == data[i + (j*8)].type && matches > 1) {
                    console.log("vertical match found");
                    hasMatch = true;
                    matches++;
                    matches = 1;
                }
                else if ( temp == data[i + (j*8)].type && data[i + (j*8)].type !== '0') {
                    matches++;
                }
                else {
                    temp = data[i + (j*8)].type;
                    matches = 1;
                }
            }
        }

        if (this._isMounted){
            this.setState({onBoardSquares: data})
        }
        return data;
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
        if (this._isMounted){
            this.setState({onBoardSquares: data})
        }
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
        if (this._isMounted){
            this.setState({onBoardSquares: data})
        }
        return data;
    }

    componentDidMount() { 
        this._isMounted = true;

        this.formatData(this.state.onBoardSquares);
        this.checkMatch(this.state.onBoardSquares);
        this._gameStarted = true;
     }
    componentWillUnmount() {  
        this._isMounted = false;
    }

    render () {
        return (
            <View>
                <Text style={styles.screen}>Score: {this.state.score * 10}</Text>
                <GridBoard items={this.state.onBoardSquares} />
            </ View>
        );
    }
};

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'row',
        padding: 10,
        marginLeft: 50,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold'
    }
});
