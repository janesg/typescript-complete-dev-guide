import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
    todos: Todo[];
    // fetchTodos is a Redux Thunk-type action creator rather than a normal
    // action creator object...instead it returns a function that eventually dispatches
    // an action.
    // Problem is that React Redux doesn't know what a Redux Thunk type
    // action creator is... so we can't use:
    //  fetchTodos: typeof fetchTodos;
    fetchTodos: Function;
    deleteTodo: typeof deleteTodo;
}

interface AppState {
    fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = { fetching: false };
    }

    componentDidUpdate(prevProps: AppProps): void {
        if (!prevProps.todos.length && this.props.todos.length) {
            this.setState({ fetching: false });
        }
    }

    onFetchClicked = (): void => {
        this.props.fetchTodos();
        this.setState({ fetching: true });
    } 

    onTodoClicked = (id: number): void => {
        this.props.deleteTodo(id);
    }

    renderList(): JSX.Element[] {
        return this.props.todos.map((todo: Todo) => {
            return (
                <div 
                    onClick={() => this.onTodoClicked(todo.id)}
                    key={ todo.id }>
                    { todo.title }
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <button onClick={ this.onFetchClicked }>Fetch</button>
                <div>{ this.state.fetching ? 'Loading...' : null }</div>
                { this.renderList() }
            </div>
        );
    }
}

const mapStateToProps = ( { todos }: StoreState): { todos: Todo[] } => {
    return { todos };
};

export const App = connect(
    mapStateToProps,
    { fetchTodos, deleteTodo }    
)(_App);