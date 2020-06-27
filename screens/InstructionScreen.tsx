import React, { Component } from 'react';

import I18n from '../translations/i18n';
import { getLanguages } from 'react-native-i18n';

import { View, Text } from 'react-native';
import {styles} from './ScreenStyles';


getLanguages().then(languages => {
    console.log(languages);
  });

export default class InstructionScreen extends React.Component<object> {
    render() {
        return (
            <View style={[styles.screen, {justifyContent: 'flex-start'}]}>
                <Text>{ I18n.t('howToPlay') } </Text>
                <Text>{ I18n.t('instructions') }</Text>
                
            </View>
        );
    }
}