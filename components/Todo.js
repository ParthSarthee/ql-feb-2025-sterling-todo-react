"use client";
import { useState, useEffect } from "react";


// Fetch the list of todos from the server
// A way to create new todo on the server
// Update existing todo on the server
// Delete existing todo on the server


function TodoCard() {

    const [todos, setTodos] = useState([]);

    // GET, POST, PUT, DELETE
    async function fetchTodos() {
        try {
            const res = await fetch("http://localhost:3000/todo");
            const data = await res.json();
            console.log(data);
            setTodos(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => { fetchTodos() }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-3 bg-white p-5 border-2 border-indigo-500 w-[300px]">
            <h1 className="text-center text-indigo-500 font-bold text-3xl">REACT TODO</h1>
            <TodoList todos={todos} setTodos={setTodos} />
            <TodoForm todos={todos} setTodos={setTodos} />
        </div>
    )
}

function TodoList({ todos, setTodos }) {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-2">
            {todos.map((todo) => <TodoItem key={todo._id} todo={todo} todos={todos} setTodos={setTodos} />)}
        </div>
    )
}

function TodoItem({ todo, todos, setTodos }) {
    async function handleTodoDone(e) {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/todo/${todo._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ done: !todo.done })
            })
            const data = await res.json();
            const newTodos = todos.map((td) => {
                if (td._id === data._id) return data;
                else return td;
            })
            setTodos(newTodos);
        } catch (e) {
            console.log(e);
        }
    }

    async function handleTodoDelete(e) {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/todo/${todo._id}`, { method: "DELETE" });
            const data = await res.json();
            const newTodos = todos.filter((td) => td._id !== data._id);
            setTodos(newTodos);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={"flex justify-between gap-3 w-full items-center p-2 border border-indigo-400 " +
            ((todo.done == true) ? "bg-green-200" : "")} >
            <h1>{todo.task}</h1>
            <div className="flex gap-2">
                <button onClick={handleTodoDone} className="w-6 h-6 bg-green-500 text-white">O</button>
                <button onClick={handleTodoDelete} className="w-6 h-6 bg-red-500 text-white">X</button>
            </div>
        </div>
    )
}

function TodoForm({ todos, setTodos }) {
    const [task, setTask] = useState("");
    async function handleNewTodo(e) {
        e.preventDefault();
        const newTodo = { task: task };
        try {
            const res = await fetch("http://localhost:3000/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTodo)
            })
            const data = await res.json();
            console.log(data);
            setTodos([...todos, data]);
        } catch (e) {
            console.log(e);
        }
        setTask("");
    }

    return (
        <div className="w-full flex gap-2">
            <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Todo..." type="text" className="w-full p-2 border border-indigo-400" />
            <button onClick={handleNewTodo} className="w-full p-2 bg-indigo-500 text-white">Add Todo</button>
        </div>
    )
}

export default TodoCard;
export { TodoList, TodoItem, TodoForm };