import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { updateToDoList, deleteToDoList, queryAllToDoList } from '../database/allSchemas';
import realm from '../database/allSchemas';
import Swipeout from 'react-native-swipeout';

let FlatList = props => {
    const { itemIndex, id, name, creationDate, popupDialogComponent, onPressItem } = props;
    showEditModal = () => {

    }
    showDeleteConfirmation = () => {
        Alert.alert(
            'Delete',
            'Delete a todoList',
            [
                {
                    text: 'No', onPress: () => { }, // Do nothing
                    style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {

                    }
                }
            ]
        )
    }
    return (
        <Swipeout right={[
            {
                text: 'Edit',
                backgroundColor: 'rgb(81, 134, 237)',
                onPress: showEditModal
            },
            {
                text: 'Delete',
                backgroundColor: 'rgb(217, 80, 64)',
                onPress: showDeleteConfirmation
            }
        ]}
            autoClose={true}
        >

        </Swipeout>
    );
}

export default class ToDoListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: []
        }
    }
    reloadData = () => {
        queryAllToDoList().then((todoList) => {
            this.setState({ todoList: todoList });
        }).catch((error) => {
            this.setState({ todoList: [] });
        });
        console.log('reload');
    }
    render() {
        return (
            <View>
                <HeaderComponent />
                <FlatList
                    style={styles.flatList}
                    data={this.state.todoList}
                    popupDialogComponent={this.refs.popupDialogComponent}
                    // ...item all item properties to FlatListItem
                    renderItem={({ item, index }) => <FlatListItem  {...item} itemIndex={index}
                        onPressItem={() => {
                            alert('You pressed item');
                        }}
                    />}
                    // Make id as item's key
                    keyExtractor={item => item.id}
                />
                <PopupDialogComponent ref={'popupDialogComponent'} />
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    flatList: {
        flex: 1,
        flexDirection: 'column'
    }
});
