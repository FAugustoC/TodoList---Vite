import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('Init Store');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;
    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state))
}

const getTodos = (filter = Filters.All) => {

    switch (filter) {

        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);

        default:
            throw new Error(`Option ${filter} is not valid`);
    }

};

const addTodo = (description) => {
    if (!description) throw new Error('Description required');
    state.todos.push(new Todo(description));
    saveLocalStorage();
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveLocalStorage();
};

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveLocalStorage();
};

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveLocalStorage();
};

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveLocalStorage();
};

const getCurrentFilter = (todoId) => {
    return state.filter;

};

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}