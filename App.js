/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
} from 'react-native';
import GridBoard from './components/GridBoard';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onBoardSquares: []
        }
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
