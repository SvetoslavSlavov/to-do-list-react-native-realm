import Realm from 'realm';
import { resolve } from 'rsvp';
// Schemas' name
export const TODO_LIST_SCHEMA = 'TodoList';
export const TODO_SCHEMA = 'Todo';
// Define your models and their properties
export const TodoSchema = {
    name: TODO_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int', // primary key
        name: { type: 'string', indexed: true },
        done: { type: 'bool', default: false },
    }
};
export const TodoListSchema = {
    name: TODOLIST_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int', // primary key
        name: 'string',
        creationDate: 'date',
        todos: { type: 'list', objectTypes: TODO_SCHEMA },  // One to many (ToDoList has 'many' Todos)
    }
};
// path - where the database is located
const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoListSchema, TodoSchema],
    schemaVersion: 0, // optional
};
// function for TodoList
// params
// resolve -> success 
// reject -> failed
export const insertNewTodoList = newTodoList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TodoListSchema, newTodoList);
            resolve(newTodoList);
        });
    }).catch((error) => reject(error));
});
export const updateTodoList = todoList => new Promise ((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        // Get a ToDoList from specific ID
        let updateTodoList = realm.objectForPrimaryKey(TODO_LIST_SCHEMA, todoList.id);
        // You can update some other fields, if needed
        updateTodoList.name = todoList.name;
        // it is not necessary to set a value in resolve
        resolve();
    }).catch((error) => reject(error));
});

export const deleteTodoList = todoListId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            // This will get all records in ToDoList table
            let deletingToDoList = realm.objectForPrimaryKey(TodoListSchema, todoListId);
            realm.delete(deletingToDoList);
            resolve();          
        });
    }).catch((error) => reject(error));
});
export const queryAllTodoLists = () => new Promise ((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodoLists = realm.objects(TODO_LIST_SCHEMA);
        resolve(allTodoLists);
    }).catch((error) => {
        reject(error);
    });
});
