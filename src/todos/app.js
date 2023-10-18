/**
 * 
 * @param {String} elementId 
 */

import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPendingTodo } from './use-cases';

const ElementIDs = {
    TodoFilters: '.filtro',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    PendingCountLabel: '#pending-count',
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        UpdatePendingCount();
    };

    const UpdatePendingCount = () => {
        renderPendingTodo( ElementIDs.PendingCountLabel );
    };

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUl = document.querySelector(ElementIDs.TodoList);
    const cCompletted = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLi = document.querySelectorAll(ElementIDs.TodoFilters);


    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUl.addEventListener('click', (event) => {
        const isDestroyE = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if (!element || !isDestroyE) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    cCompletted.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLi.forEach( element => {
        element.addEventListener('click', (element) => {
            filtersLi.forEach( el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch (element.target.text){
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                    break;

                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                    break;

                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                    break;
            }

            displayTodos();

        })
    });




};