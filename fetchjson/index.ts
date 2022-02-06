import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const logTodo = (id: number, title: string, finished: boolean) => {
    console.log(`\tId = ${id}\n\tTitle = ${title}\n\tFinished = ${finished}`);
}

axios.get(url).then(response => {
    const { id, title, completed: finished } = response.data as Todo;
    logTodo(id, title, finished);
});
