import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}


function getRandomIntInclusive(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomico = 0;
const randomicoMin = 1, randomicoMax = 100;
let xArray : Array<number> = [];

let list: Array<Task>;

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  /*
  Como eu fiz para alterar
  if(newTaskTitle == "ok"){
    setNewTaskTitle("");
  }
  */

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if(!newTaskTitle){ //ou if(newTaskTitle == ""){
      //alert('É obrigatorio inserir um titulo.');
      return;
    }
    

    if(xArray.length == randomicoMax){
      alert("Número maximo de task atingido");
      setNewTaskTitle("");
      return;
    } 

    randomico = getRandomIntInclusive(randomicoMin,randomicoMax);
    

    while (xArray.indexOf(randomico) != -1) {
      randomico = getRandomIntInclusive(randomicoMin,randomicoMax);
    }

    console.log('array:',xArray,'indexof',xArray.indexOf(randomico));

    /*
    //Fiz assim e funciona
    list = tasks;
    list.push({id:randomico,title:newTaskTitle,isComplete:false});

    setTasks(list);*/

    //forma mais certa----------------

    const newTask = {
      id: randomico,
      title: newTaskTitle,
      isComplete:false
    }
    setTasks(oldState => [...oldState, newTask]);
    //--------------------------------

    setNewTaskTitle("");
    console.log(randomico,list);
    xArray.push(randomico);
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    /*
    Forma q eu fiz
    list = tasks;
    
    list.map( val => { 
      
      if(val.id == id){
        val.isComplete =  val.isComplete ? false : true;
        setTasks(list);
        setNewTaskTitle("ok");
      }

    });
    */
    //Forma Certa ----------------------
    const newtask = tasks.map(task => task.id === id ? {
      ...task, isComplete: !task.isComplete
    } : task);

    setTasks(newtask);
    //----------------------------------
    
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    /*
    //Como eu fiz
    list = tasks;
    list.map( (elemento, indice) => { 
      
      if(elemento.id == id){
        list.splice(indice,1);
        xArray.splice(indice,1);
        setTasks(list);
        setNewTaskTitle("ok");
        return;
      }

    });
    */
    //Forma mais certa-----------------
    tasks.map( (elemento, indice) => { 
      if(elemento.id == id){
        xArray.splice(indice,1);
      }
    });

    const filteredTask = tasks.filter(task => task.id !==id);
    setTasks(filteredTask);

    //---------------------------------

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}