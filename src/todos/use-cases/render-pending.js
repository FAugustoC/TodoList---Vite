import todoStore, { Filters } from '../../store/todo.store';

/**
 * 
 * @param {String} elementId 
 */


let element;

export const renderPendingTodo = ( elementId ) => {

    if ( !element )
        element = document.querySelector( elementId );

    if ( !element )
        throw new Error (`Element ${ elementId } not found`);

    element.innerHTML = todoStore.getTodos( Filters.Pending ).length;

}