import { Check, Trash } from 'phosphor-react';
import styles from './Task.module.css';

interface TaskRequirements {
    id: number;
    description: string;
    finished: boolean;
    onChangeTaskStatus: (id: number) => void;
    onDeleteTask: (id: number) => void;
}



export function Task({ id, description, finished, onChangeTaskStatus, onDeleteTask }: TaskRequirements) {

    function handleChangeStatus(){
        onChangeTaskStatus(id)
    }

    function handleDeleteTask(){
        onDeleteTask(id)
    }
    return (
        <div className={styles.customInput}>
            {
                finished == false && (
                    <>
                        <button onClick={handleChangeStatus} title='Mudar status da tarefa' />
                    </>
                )
            }
            {
                finished == true && (
                    <>
                        <button onClick={handleChangeStatus} className={styles.checked} title='Mudar status da tarefa'>
                            <Check size={24} />
                        </button>
                    </>
                )
            }
            <span className={finished ? styles.checked : ''}>{description}</span>
            <button onClick={handleDeleteTask} className={styles.trashButton} title='Apagar tarefa'>
                <Trash size={24}/>
            </button>
        </div>
    )
}
