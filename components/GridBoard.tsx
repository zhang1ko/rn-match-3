import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    FlatList,
    View,
} from 'react-native';
import Square from './Square';

const data = [
    { key : '1'}, { key : '2'}, { key : '3'}, { key : 'D'}, { key : 'E'}, { key : 'F'}, 
    { key : 'G'}, { key : 'H'}, { key : 'I'}, { key : 'J'}, { key : 'K'}, { key : 'L'}, 
    { key : 'M'}, { key : 'N'}, { key : 'O'}, { key : 'P'},
    { key : 'A'}, { key : 'B'}, { key : 'C'}, { key : 'D'}, { key : 'E'}, { key : 'F'}, 
    { key : 'G'}, { key : 'H'}, { key : 'I'}, { key : 'J'}, { key : 'K'}, { key : 'L'}, 
    { key : 'M'}, { key : 'N'}, { key : 'O'}, { key : 'P'},
    
];

const formatData = (data: {key: string}[]) => {

    let numberOfBlankElements = 64 - data.length;
    while (numberOfBlankElements !== 64 && numberOfBlankElements !== 0) {
      data.push({ key: `Bl-${numberOfBlankElements + 1}` });
      numberOfBlankElements++;
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
                            <Text> {itemData.item.key} </Text>
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
    grid: {
        flexDirection: 'column',
        marginBottom: 32,
        marginTop: 16,
        height: 400,
        alignItems: 'center'
    }
});
