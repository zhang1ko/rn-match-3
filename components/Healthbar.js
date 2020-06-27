import React, { Component } from 'react';
import {
View,
Text,
Animated,
} from 'react-native';
/*
interface HealthBarProp {
    currentHealth: number;
}
class HealthBar extends React.Component<{}, HealthBarProp> {
    constructor(props: HealthBarProp) {
        super(props);
        this.state = {
            currentHealth: new Animated.Value(this.props.currentHealth)
        }
    }

  }
*/
const available_width = 300;

export default class HealthBar extends Component {
    // add these:
    state = {
        maxHealth: this.props.currentHealth,
        currentHealth: this.props.currentHealth
    };

    constructor(props) {
      super(props);
      this.maxHealth = this.props.currentHealth;
      this.currentHealth = new Animated.Value(this.props.currentHealth);
    }

    getCurrentHealthStyles = () => {
        var animated_width = this.currentHealth.interpolate({
            inputRange: [0, this.state.maxHealth/2, this.state.maxHealth],
            outputRange: [0, available_width / 2, available_width]
        });
  
        const color_animation = this.currentHealth.interpolate({
            inputRange: [0, this.state.maxHealth/2, this.state.maxHealth],
            outputRange: [
                "rgb(199, 45, 50)",
                "rgb(224, 150, 39)",
                "rgb(101, 203, 25)"
            ]
        });
  
        return {
            width: animated_width,
            marginLeft: 50,
            height: 8, //height of the health bar
            backgroundColor: color_animation
        };
    };

    render() {
        return (
            <View>
                <View >
                    <Animated.View style={[this.getCurrentHealthStyles()]} />
                    <Text style={ {marginLeft: 50} }>
                        { Math.round(this.state.currentHealth) } / {this.state.maxHealth}
                    </Text>
                </View>
            </View>
        );
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentHealth !== this.props.currentHealth) { // check if health is updated
            Animated.timing(this.currentHealth, {
                duration: 1500, // 1.5 seconds
                useNativeDriver: false,
                toValue: this.props.currentHealth // final health when the animation finishes
            }).start(); // start the animation
  
            this.currentHealth.addListener(progress => {
                this.setState({
                    currentHealth: progress.value
                });
            });
        }
    }
}
