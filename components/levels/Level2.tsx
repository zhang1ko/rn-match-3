import React, { Component } from 'react';
import {
View,
Image
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import {levelStyle} from './LevelStyle';

import Game from '../game/Game'
import { Wolf } from '../image'

interface Level2Props {
    navigation: NavigationScreenProp<any,any>,
    health: number,
    maxTurn: number
};

export default class Level2 extends React.Component<Level2Props, object> {
    render(){
        const gameProps = {
            goBack: this.props.navigation,
            health: 1500,
            maxTurn: 12
        }
        return (
            <View>
                <Image
                    style={ levelStyle.image }
                    source={Wolf}
                />
                <Game {...gameProps}/>
            </View>
        );
    }
}