import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    FlatList,
    View,
} from 'react-native';
import Square from './Square';

const data: Array<Square> = [
    new Square({title: "A", key: 1}), 
    new Square({title: "B", key: 2}), 
    new Square({title: "B", key: 3}), 
    new Square({title: "C", key: 4}),
    new Square({title: "D", key: 4}), 
    
];

const formatData = (data: Array<Square>) => {
    let numberOfBlankElements = 64 - data.length;
    let elementOn = 64 - numberOfBlankElements;

    while (elementOn !== 64 && numberOfBlankElements !== 0) {
        let temp = new Square({title: `${elementOn + 1}`, key: elementOn});
        data.push(temp);
        elementOn++;
    }

    return data;
}
const shuffleData = (data: Array<Square>) => {
    let i = data.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }
    return data;
}

interface GridBoardProps {
    items: ReadonlyArray<Square>;
}
export default class GridBoard extends React.Component<GridBoardProps, {}> {
    constructor(props: GridBoardProps) {
        super(props);
        formatData(data);
        shuffleData(data);
    }
    render () {
        return (
            <View>
                <FlatList 
                    numColumns={8}
                    data={data}
                    contentContainerStyle={styles.grid}
                    //keyExtractor={(item, index) => item.id.toString()}
                    renderItem = {itemData => (
                        itemData.item.render()
                    )}
                />
            </ View>
        )
    }
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'column',
        marginBottom: 32,
        marginTop: 16,
        height: 400,
        alignItems: 'center'
    }
});
