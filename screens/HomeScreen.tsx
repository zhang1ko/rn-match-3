import React, { Component } from 'react';
import {
View,
Text,
TouchableOpacity
} from 'react-native';
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
                    <Text>Play/开始</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.button }
                        onPress={() => this.props.navigation.navigate('Instructions')}>
                    <Text>How to Play/怎么玩</Text>
                </TouchableOpacity>
            </View>
        );
    }
}