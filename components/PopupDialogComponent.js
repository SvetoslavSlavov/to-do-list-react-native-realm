import React, { Component } from 'react';
import { 
    StyleSheet, View, Text, TouchableOpacity, 
    Platform, Image, TextInput 
} from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
// Database
import { insertNewToDoList, updateToDoList } from '../database/allSchemas';

export default class PopupDialogComponent extends Component {
    constructor(props) {
        this.state = {
            id: 0,
            name: '',
            isAddNew: true
        };
    }
    render() {
        const { dialogTitle } = this.state;
        return() {
            <PopupDialog
                dialogTitle={<DialogTitle title={dialogTitle} />}
                width={0.7} height={180}
                ref={'popupDialog'}
            >
                <View style={styles.container}>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'Enter ToDoList name'}
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name}
                    />
                </View>
            </PopupDialog>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        padding: 10,
        margin: 10, 
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        backgroundColor: 'steelblue',
        padding: 10,
        margin: 10
    },
    textLabel: {
        color: 'white',
        fontSize: 18
    }
});
