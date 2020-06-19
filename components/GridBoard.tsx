import React, { Component } from 'react';
import{
    StyleSheet,
    FlatList,
    View,
} from 'react-native';
import Square from './square/Square';

interface GridBoardProps {
    items: Array<Square>;
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
                    data={this.props.items}
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
        marginTop: 0,
        height: 400,
        alignItems: 'center'
    }
});
