document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('todo-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const prioritySelect = document.getElementById('priority-select');

    const saveTask = async (taskText) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(taskText);
            }, 500); 
        });
    };

    const createTask = async (taskText, priority) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('todo-item');
        taskItem.classList.add(`${priority}-priority`);

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.addEventListener('click', () => {
            taskItem.remove();
            reorderTasks(); 
        });

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completar';
        completeButton.classList.add('btn', 'btn-success');
        completeButton.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            completeButton.textContent = taskItem.classList.contains('completed') ? 'Deshacer' : 'Completar';
            taskSpan.style.textDecoration = taskItem.classList.contains('completed') ? 'line-through' : 'none';
            (taskSpan.style.textDecoration === 'line-through') ? editButton.style.display = 'none' : editButton.style.display = 'inline-block';
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('btn', 'btn-warning');
        editButton.addEventListener('click', () => {
            const currentText = taskSpan.textContent;
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = currentText;
            inputField.classList.add('edit-input');
            taskSpan.replaceWith(inputField);

            editButton.textContent = 'Guardar';
            editButton.removeEventListener('click', editButton.click);
            editButton.addEventListener('click', () => {
                const updatedText = inputField.value.trim();
                if (updatedText) {
                    inputField.replaceWith(taskSpan);
                    taskSpan.textContent = updatedText;
                    saveTask(updatedText);
                    editButton.textContent = 'Editar';
                    console.log(`Tarea actualizada: "${updatedText}"`);
                }
            });
        });

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        await saveTask(taskText);
        console.log(`Tarea "${taskText}" guardada correctamente`);

        reorderTasks();
    };

    const handleAddTask = async () => {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;
        if (taskText) {
            await createTask(taskText, priority);
        } else {
            alert('Por favor, escribe una tarea');
        }
        taskInput.value = ''; 
    };

    const reorderTasks = () => {
        const tasks = Array.from(taskList.children); //Convertimos un nodList en arra
        tasks.sort((a, b) => {
            const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };  //Se establece valores de prioridad
            //Compara las prioridades de las tareas
            const priorityA = a.classList.contains('high-priority') ? 3 : a.classList.contains('medium-priority') ? 2 : 1;
            //Hace lo mismo que el anterior
            const priorityB = b.classList.contains('high-priority') ? 3 : b.classList.contains('medium-priority') ? 2 : 1;
            //Retorna el el orden de las tareas en el Array (este array se convirtió en un NodList)
            return priorityB - priorityA; 
        });
        tasks.forEach(task => taskList.appendChild(task));
    };

    addTaskButton.addEventListener('click', handleAddTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });
});
