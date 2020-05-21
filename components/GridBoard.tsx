import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    FlatList,
    View,
} from 'react-native';
import Square from './Square';

const data = [
    { key : 'A'}, { key : 'B'}, { key : '3'}, { key : 'D'}, { key : 'E'}, { key : 'F'}, 
    { key : 'G'}, { key : 'H'}, { key : 'I'}, { key : 'J'}, { key : 'K'}, { key : 'L'}, 
    { key : 'M'}, { key : 'N'}, { key : 'O'}, { key : 'P'},
    
];

const formatData = (data: {key: string}[]) => {
    let numberOfBlankElements = 64 - data.length;
    let elementOn = 64 - numberOfBlankElements;

    while (elementOn !== 64 && numberOfBlankElements !== 0) {
      data.push({ key: `${elementOn + 1}` });
      elementOn++;
      
    }

    return data;
}

interface GridBoardProps {
    // set any for now
    items: ReadonlyArray<any>;
}
export default class GridBoard extends React.Component<GridBoardProps, {}> {
    constructor(props: GridBoardProps) {
        super(props);
    }
    render () {
        return (
            <View>
                <FlatList 
                    numColumns={8}
                    data={formatData(data)}
                    contentContainerStyle={styles.grid}
                    //keyExtractor={(item, index) => item.id.toString()}
                    renderItem = {itemData => (
                        <View style ={styles.item}>
                            <Square title={itemData.item.key} />
                        </View>
                    )}
                />
            </ View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 5,
        margin: 5,
        width: 35,
        height: 35,
        backgroundColor: "#ccc",
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center'
    },
    itemRed: {
        padding: 5,
        margin: 5,
        width: 35,
        height: 35,
        backgroundColor: "#FF0000",
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center'
    },
    grid: {
        flexDirection: 'column',
        marginBottom: 32,
        marginTop: 16,
        height: 400,
        alignItems: 'center'
    }
});
