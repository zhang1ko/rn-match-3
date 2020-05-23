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
import Square from './components/Square';
import Game from './components/Game'


interface AppState {
    
}

export default class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            
        }
    }

    render () {
        return (
            <View>
                <Game />
            </ View>
        );
    }
};

const styles = StyleSheet.create({

});
