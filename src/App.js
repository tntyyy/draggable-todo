import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable';

import './App.css';

function App() {
  const [todo, setTodo] = useState('');
  const [todolist, setTodoList] = useState(JSON.parse(localStorage.getItem('todolist')) || []);

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(todolist));
  }, [todolist]);

  const newItem = () => {
    if (todo.trim() !== '') {
      const newTodo = {
        id: v4(),
        todo: todo,
        color: randomColor({
          luminosity: 'light',
        }),
        defaultPos: {
          x: 400,
          y: -400,
        },
      };
      setTodoList([...todolist, newTodo]);
      setTodo('');
    } else {
      alert('enter something...');
    }
  };

  const deleteTodo = (id) => {
    const newArr = todolist.filter((todo) => todo.id !== id);
    setTodoList(newArr);
  };

  const updatePosition = (data, index) => {
    let newArr = [...todolist];
    newArr[index].defaultPos = { x: data.x, y: data.y };
    setTodoList(newArr);
  };

  const keyPress = (e) => {
    const code = e.which;

    if (code === 13) {
      newItem();
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <input
          value={todo}
          type="text"
          placeholder="enter something"
          onChange={(e) => setTodo(e.target.value)}
          onKeyPress={(e) => keyPress(e)}
        />
        <button className="btn-add" onClick={newItem}>
          add
        </button>
      </div>

      {todolist.map((item, index) => {
        return (
          <Draggable
            key={item.id}
            defaultPosition={item.defaultPos}
            onStop={(e, data) => {
              updatePosition(data, index);
            }}>
            <div className="todoItem" style={{ backgroundColor: item.color }}>
              {`${item.todo}`}
              <button className="delete" onClick={() => deleteTodo(item.id)}>
                X
              </button>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default App;
