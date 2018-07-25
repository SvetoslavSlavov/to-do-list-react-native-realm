
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { insertNewTodoList, updateTodoList } from './database/allSchemas';
import PopupDialogComponent from './components/PopupDialogComponent';

export default class App extends Component {
  render() {
    return (
      <PopupDialogComponent />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
