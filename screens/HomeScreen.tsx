import React, { Component } from 'react';

import I18n from '../translations/i18n';

import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import {styles} from './ScreenStyles';


interface HomeScreenProps {
    navigation: NavigationScreenProp<any,any>
};

export default class HomeScreen extends React.Component<HomeScreenProps, object> {
    
    render() {
        return (
            <View style={styles.screen}>
                <TouchableOpacity style={ styles.button }
                        onPress={() => this.props.navigation.navigate('Game')}>
                    <Text> {I18n.t('play')} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.button }
                        onPress={() => this.props.navigation.navigate('Instructions')}>
                    <Text> {I18n.t('howToPlay')} </Text>
                </TouchableOpacity>
            </View>
        );
    }
}