import React from 'react';
import ReactDOM from 'react-dom';

interface AppProps {
    color: string;
    optionalProp?: string;
}

// We could use a state interface and specify as 2nd generic type
// when declaring React.Component<AppProps, AppState>, but preference
// in this course is to override the state property within the class
// interface AppState {
//     counter: number;
// }

// What App would look like defined as a functional component
// const App = (props: AppProps): JSX.Element => {
//     return <div>{ props.color }</div>;
// }

class App extends React.Component<AppProps> {
    state = { counter: 0 };

    onIncrement = () => {
        this.setState( { counter: this.state.counter + 1 } );
    }

    onDecrement = () => {
        this.setState( { counter: this.state.counter - 1 } );
    }

    render() {
        return (
            <div>
                <button onClick={this.onIncrement}>Increment</button>
                <button onClick={this.onDecrement}>Decrement</button>
                { `${this.props.color} / ${this.state.counter}` }
            </div>
        );
    }
}

ReactDOM.render(<App color="red"/>, document.querySelector('#root'));