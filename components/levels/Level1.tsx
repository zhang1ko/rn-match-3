import React, { Component } from 'react';
import {
View,
Image
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import {levelStyle} from './LevelStyle';

import Game from '../game/Game'
import { Slime } from '../image'


interface Level1Props {
    navigation: NavigationScreenProp<any,any>,
    health: number,
    maxTurn: number
};

export default class Level1 extends React.Component<Level1Props, object> {
    render(){
        const gameProps = {
            goBack: this.props.navigation,
            health: 1000,
            maxTurn: 10
        }
        return (
            <View>
                <Image
                    style={ levelStyle.image }
                    source={Slime}
                />
                <Game {...gameProps}/>
            </View>
        );
    }
}