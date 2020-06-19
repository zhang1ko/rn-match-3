import React, { Component } from 'react';
import {
View,
Image
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import {levelStyle} from './LevelStyle';

import Game from '../game/Game'
import { Dragon } from '../image'


interface Level3Props {
    navigation: NavigationScreenProp<any,any>,
    health: number,
    maxTurn: number
};

export default class Level3 extends React.Component<Level3Props, object> {
    render(){
        const gameProps = {
            goBack: this.props.navigation,
            health: 2000,
            maxTurn: 14
        }
        return (
            <View>
                <Image
                    style={ levelStyle.image }
                    source={Dragon}
                />
                <Game {...gameProps}/>
            </View>
        );
    }
}