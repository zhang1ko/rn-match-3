import React, { Component } from 'react';
import{
    StyleSheet
} from 'react-native';
import { Tile_Size } from './values';

export const styles = StyleSheet.create({
    item: {
      padding: 5,
      margin: 5,
      width: Tile_Size,
      height: 35,
      borderColor: 'black',
      borderWidth: 1,
      alignItems: 'center'
    }
});