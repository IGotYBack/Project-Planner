// The mission
// Wouldn't it be nice to have a tool to manage our projects? Something that would allow us to track the progression of each requirements of our apps.

// This is the list of features we would like to see:

// Allow user to create tasks. Tasks should have a name, a description and a due date
// Allow users to label their tasks with a status (ex: to do, doing, done)
// Display the tasks, with their remaining time. For instance, if today is the 15th of March and the task is due for the 20th of March, display in 5 days.
// Allow users to sort their tasks by remainining time, with the most urgent first, or by name.
// Filter tasks (ex: only show "to do" tasks)
// BONUS: Save tasks in LocalStorage, so that they persist even when the page is refreshed.
// There is a lot of project management tools online. You can get some inspirations from popular tools such as Notion, Trello, Asana or GitHub Projects for instance.

// bouton -> qui ouvre une page -> qui permet de rajouter des tâches
// Demander :
// * un nom 
// * description
// * deadline

const btnNewTask = document.querySelector('#btnNewTask');
const btnDueDate = document.querySelector('#btnDueDate')
const btnToDo = document.querySelector('#btnToDo')

const taskForm = document.querySelector('#form');
// console.log(taskForm)
const toDoSection = document.querySelector('#toDo');
const inProgressSection = document.querySelector('#inProgress');
const doneSection = document.querySelector('#done')

const mainToDo = document.querySelector('#toDoMain');
const mainProgressSection = document.querySelector('#inProgressMain');
const mainDoneSection = document.querySelector('#doneMain')


class Task {
    constructor(nameTask, descriptionTask, deadlineTask) {
        this.nameTask = nameTask;
        this.descriptionTask = descriptionTask;
        this.deadlineTask = deadlineTask;
        this.statusTask = 'toDo';
    }
}

const createDiv = (task, index) => {

    const newDiv = document.createElement('div')

    const infosDiv = document.createElement('div');
    const nameP = document.createElement('p');
    const descriptionP = document.createElement('p');
    const deadlineP = document.createElement('p');

    nameP.innerText = task.nameTask;
    nameP.classList.add('nameTaskStyle')
    descriptionP.innerText = task.descriptionTask;
    // descriptionP.classList.add('justifyText')
    deadlineP.innerText = task.deadlineTask;
    deadlineP.classList.add('date')
    // console.log(deadlineP);
    // console.log(deadlineTask);
    infosDiv.append(nameP, descriptionP, deadlineP);

    const selectDiv = document.createElement('div');
    const select = document.createElement('select');
    const optionToDo = document.createElement('option');
    const optionInProgress = document.createElement('option');
    const optionDone = document.createElement('option');

    optionToDo.value = 'toDo';
    optionToDo.text = 'To do';
    if (task.statusTask == optionToDo.value) {
        optionToDo.selected = true
    }
    optionInProgress.value = 'inProgress';
    optionInProgress.text = 'In Progress';
    if (task.statusTask == optionInProgress.value) {
        optionInProgress.selected = true
    }
    optionDone.value = 'done';
    optionDone.text = 'Done';
    if (task.statusTask == optionDone.value) {
        optionDone.selected = true
    }

    select.append(optionToDo, optionInProgress, optionDone);

    select.addEventListener('change', (event) => {

        let retrievedTask = localStorage.getItem('storedTask');
        let tasksToLoad = JSON.parse(retrievedTask);
        // console.log(tasksToLoad)

        // Récupérer statut actuel
        let statusOfTask = event.target.value;
        // console.log(statusOfTask)
        tasksToLoad.splice(index, 1);
        // Changer valeur du statut 
        task.statusTask = statusOfTask;
        tasksToLoad.push(task)
        // console.log(task)
        localStorage.setItem(`storedTask`, JSON.stringify(tasksToLoad))

        updateDom()
    })

    selectDiv.append(select);

    newDiv.append(infosDiv, selectDiv);
    newDiv.classList.add('taskBlock', 'displayFlex', 'alignCenter', 'justifyBetween', 'gapNormal');

    return newDiv;
}

const appendDivToDom = (task, index) => {

    let newDiv = createDiv(task, index)

    const actualStatus = task.statusTask;
    // console.log(actualStatus);
    switch (actualStatus) {
        case 'toDo':
            toDoSection.insertAdjacentElement('beforeend', newDiv);
            break;
        case 'inProgress':
            inProgressSection.insertAdjacentElement('beforeend', newDiv);
            break;
        case 'done':
            doneSection.insertAdjacentElement('beforeend', newDiv);
            break;
        default:
            break;
    }
}

const updateDom = () => {
    toDoSection.innerHTML = ''
    inProgressSection.innerHTML = ''
    doneSection.innerHTML = ''

    let retrievedTask = localStorage.getItem('storedTask')
    // console.log(retrievedTask)

    if (retrievedTask != null) {
        let tasksToLoad = JSON.parse(retrievedTask)
        // console.log(tasksToLoad)

        tasksToLoad.forEach((element, index) => {
            appendDivToDom(element, index)
        });
    }
}

btnNewTask.addEventListener('click', () => {
    // console.log('cékliké');
    // console.log();
    taskForm.classList.toggle('showForm');
})

taskForm.addEventListener('submit', (event) => {
    // console.log(e);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    taskForm.classList.remove('showForm');

    const nameTask = data.get('name');
    // console.log(nameTask);
    const descriptionTask = data.get('description');
    // console.log(descriptionTask);
    const deadlineTask = data.get('deadline');
    // console.log(deadlineTask);
    let task = new Task(nameTask, descriptionTask, deadlineTask);
    // console.log(task);

    let registeredTasks = localStorage.getItem(`storedTask`);

    let arrayOfTasks;

    if (registeredTasks == null) {
        arrayOfTasks = [];
        // console.log(arrayOfTasks);
    }
    else {
        arrayOfTasks = JSON.parse(registeredTasks);
        // console.log(arrayOfTasks);
    }

    arrayOfTasks.push(task);

    localStorage.setItem(`storedTask`, JSON.stringify(arrayOfTasks));

    // console.log('page loaded');
    updateDom();
})

window.addEventListener('load', () => {

    updateDom()

})

btnToDo.addEventListener('click', () => {
    // console.log("kliké")
    mainProgressSection.classList.toggle('displayHidden');
    mainDoneSection.classList.toggle('displayHidden');
    mainProgressSection.classList.toggle('displayFlexColumn');
    mainDoneSection.classList.toggle('displayFlexColumn');
    mainToDo.classList.toggle('width33');
    mainToDo.classList.toggle('width75');
})

btnDueDate.addEventListener('click', () => {
    // console.log("clické")
    const divOfDate = []
    const datesNode = document.querySelectorAll('.date')
    const dates = Array.from(datesNode)

    dates.sort((taskA, taskB) => { return new Date(taskA.innerText) - new Date(taskB.innerText) })

    dates.forEach(date => {
        divOfDate.push(date.parentElement.parentElement)
    });

    // console.log(divOfDate)

    divOfDate.forEach(div => {
        // console.log(div)
        const section = div.parentElement
        // console.log(div)
        if (section === toDoSection) {
            div.remove()
            mainToDo.append(div)
        }

        if (section === inProgressSection) {
            div.remove()
            mainProgressSection.append(div)
        }

        if (section === doneSection) {
            div.remove()
            mainDoneSection.append(div)
        }
        console.log(div)
        // console.log(typeof div)
        // console.log(div.innerText)
    })

    // toDoSection.innerHTML = ''
    // inProgressSection.innerHTML = ''
    // doneSection.innerHTML = ''

})