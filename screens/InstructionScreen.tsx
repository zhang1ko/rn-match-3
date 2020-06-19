import React, { Component } from 'react';
import {
View,
Text,
} from 'react-native';
import {styles} from './ScreenStyles';

export default class InstructionScreen extends React.Component<object> {
    render() {
        return (
            <View style={[styles.screen, {justifyContent: 'flex-start'}]}>
                <Text>How to Play/怎么玩 </Text>
                <Text>Swap squares to make three or more same-colored squares in a row. 
                    Every move has to make a match of three or more squares. 
                    Clear squares to obtain points and reach the poimnts thresshold to 
                    level up. Each level higher means you need more matches to advance. 
                    There is a limited number of moves one can make in each level.
                    {"\n"}
                    {"\n"}
                    游戏中，玩家需要对相同的 ‘方形’ 进行匹配，水平方向或垂直方向达到三个或三个以上，
                    就可以匹配成功并获得分数。匹配得越多，分数就越高，这样有利于游戏继续进行。
                    对珠宝游戏感兴趣的小伙伴们，可以来挑战一下自己咯！ 
                </Text>
                
            </View>
        );
    }
}