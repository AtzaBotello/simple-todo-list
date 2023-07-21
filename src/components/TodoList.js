import {useEffect, useState} from 'react';


export const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [input, setInput] = useState('');

    const getData = async() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(response => response.json())
        .then(json => {
            setTodoList(json);
        });
    }

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const onSaveTodo = () => {
        if (input.length === 0) {
            return false;
        } 
        setTodoList([...todoList, {id: todoList.length + 1, title: input}]);
        setInput('');
    }

    const renderListItem = () => {
        return todoList.map((item, index) => <li key={item.id}>{item.title}</li>);
    }

    useEffect(() => {
        console.log("Todo List Changed");
    }, [todoList]);

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <h2>Todo List</h2>
            <div className='row justify-content-center'>
                <div className='col-10'>
                    <input value={input} onChange={handleInput} />
                    <button className='btn btn-primary' onClick={onSaveTodo}>Save</button>
                </div>
            </div>
            <ul>
                {renderListItem()}
            </ul>
        </>
    )
}