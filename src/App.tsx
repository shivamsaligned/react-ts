import React, {FC, useState} from 'react';
import './App.css';
import { Button } from '@mui/material';

const App:FC = () => {

   const [task ,setTask] = useState<string>("")
   const [deadline ,setDeadline] = useState<number>(0)
   const [todolist ,setTodoList] = useState<string>("")

  return (
    <div className="App">
      <div className="header">
        <div className='inputContainer'>
          <input type="text" placeholder='Task...' />
          <input type="number" placeholder='Deadline (in Days)...' />
        </div>
        <Button variant='contained'>Add Task</Button>
      </div>
      <div className="todoList"></div>
    </div>
  );
}

export default App;
