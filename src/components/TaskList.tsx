import { useState } from 'react';
import { FiCheckSquare, FiTrash } from 'react-icons/fi';
import '../styles/tasklist.scss';



interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask():void {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle)
    return

    setTasks([...tasks, {
      isComplete: false,
      title: newTaskTitle,
      id: Math.floor(Math.random() * 1000)
    }])

    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const taskIndex = tasks.findIndex(value => value.id === id)
    const newTasks = [...tasks]
    newTasks[taskIndex].isComplete = !newTasks[taskIndex].isComplete

    setTasks([...newTasks])
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const taskIndex = tasks.findIndex(value => value.id === id)
    const newTasks = [...tasks]
    newTasks.splice(taskIndex,1)

    setTasks([...newTasks])
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