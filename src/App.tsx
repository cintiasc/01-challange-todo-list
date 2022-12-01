import { useState, ChangeEvent, InvalidEvent, FormEvent } from 'react';
import { PlusCircle } from 'phosphor-react';
import { Header } from './components/Header';
import { Task } from './components/Task';
import styles from './App.module.css';
import './global.css';
import clipBoard from './assets/Clipboard.svg';


interface taskList{
  id: number;
  description: string;
  status: boolean;
}


function App() {
  const[id, setId] = useState(0);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [taskList, setTaskList] = useState<taskList[]>([]);
  const [tasksDone, setTasksDone] = useState(0);
  
  function handleNewTaskDescriprion(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('')
    setNewTaskDescription(event.target.value);
    const newId = id + 1
    setId(newId)
  }
    
  function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Ops, preencha os dados da nova tarefa!')
  }
    
  function handleAddTaskToList(event: FormEvent){
    event.preventDefault()
    const addNewTask = {
      id: id,
      description: newTaskDescription,
      status: false
    }
        
    setTaskList([...taskList, addNewTask])
    console.log(taskList)
    setNewTaskDescription('')
  }

  function changeTaskStatus(id: number){
    const index = taskList.findIndex((taskList) => {
      return taskList.id === id
    });
    const tempTaskList = [...taskList];

    tempTaskList[index].status = !tempTaskList[index].status
    setTaskList(tempTaskList)
    countTasklsDone(tempTaskList)    
  }
  function handleDeleteTask(idToDelete: number){
    const tempTaskList = taskList.filter(task =>{
      return task.id != idToDelete
    })
    setTaskList(tempTaskList);
    countTasklsDone(tempTaskList)
  }

  function countTasklsDone(taskListUpdated: taskList[]){
    const amountOfTasksDone = taskListUpdated.filter(tasks =>{
      return tasks.status === true
    }).length

    setTasksDone(amountOfTasksDone);
  }


  const isNewTaskEmpty = newTaskDescription === '';
  return (
    <div>
      <Header />
        <form onSubmit={handleAddTaskToList} className={styles.form}>
          <textarea
            placeholder='Adicione uma nova tarefa'
            value={newTaskDescription}
            onChange={handleNewTaskDescriprion}
            onInvalid={handleNewTaskInvalid}
          />
          <button disabled={isNewTaskEmpty} type='submit'>
            Criar <PlusCircle size={16} />
          </button>
        </form>

      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.tasksCreated}>
            Tarefas criadas <span>{taskList.length}</span>
          </div>
          <div className={styles.tasksDone}>
            Tarefas concluídas <span>{tasksDone}</span>
          </div>
        </div>
      </div>
      <div className={styles.taskList}>
        {
          taskList.map(item => {
            return (<Task key={item.id} id={item.id} description={item.description} finished={item.status} onChangeTaskStatus={changeTaskStatus} onDeleteTask={handleDeleteTask}/>)
          })
        }
        {
          taskList.length === 0 && (
            <div className={styles.clipBoard}>
              <img src={clipBoard} alt='sem tarefas' />
              <span>Você ainda não tem tarefas cadastradas</span>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App
