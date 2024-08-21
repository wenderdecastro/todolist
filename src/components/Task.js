import React from 'react'
import './Task.css'
import { MdDelete, MdEdit } from 'react-icons/md';

export function Task({ task, onToggle, deleteTask, editTask }) {
    // const taskNameString = typeof taskname === 'string' ? taskname : JSON.stringify(taskname);

    function handleEdit() {
        editTask(task)
    }
    return (
        <div className='task-container' style={{ backgroundColor: task.concluded ? "#6C45CE" : "#fff" }}>
            <div className='details'>
                <input type='checkbox' onChange={() => onToggle(task.id)} checked={task.concluded} className='checkbox' style={{ backgroundColor: task.concluded ? "#1E123B" : "#BDA4FF" }} />
                <p style={{ color: task.concluded ? "#fff" : "#000" }}>{task.name}</p>
            </div>

            <div className='actions'>
                <div onClick={() => deleteTask(task.id)} className='action-box' style={{ backgroundColor: task.concluded ? "#6C45CE" : "#fff", borderColor: task.concluded ? "#fff" : "#1E123B" }}>


                    <MdDelete className='icon' color={task.concluded ? "white" : '#1E123B'} />
                </div>
                <div onClick={handleEdit} className='action-box' style={{ backgroundColor: task.concluded ? "#6C45CE" : "#fff", borderColor: task.concluded ? "#fff" : "#1E123B" }}>
                    <MdEdit className='icon' color={task.concluded ? "white" : '#1E123B'} />

                </div>
            </div>
        </div>
    );
}

