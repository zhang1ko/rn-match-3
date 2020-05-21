import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native';

interface SquareProps {
    title: string;
    //onPress: Function;
}

export default class Square extends React.Component<SquareProps, {}> {
    constructor(props: SquareProps){
        super(props);
        
     }

     render () {
        return (
            <TouchableNativeFeedback /*onPress={this.props.onPress}*/ >
                <View style={styles.item} > 
                    <Text>{this.props.title}</Text> 
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    item: {
      padding: 10,
      margin: 10,
      width: 35,
      backgroundColor: "#ccc",
      borderColor: 'black',
      borderWidth: 1
    }
});
