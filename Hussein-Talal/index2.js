const submitBtn = document.getElementById('submit');
const task = document.getElementById('text');
const deadline = document.getElementById('date');
const priority = document.getElementById('priorityChoose');
const form = document.getElementById('form');
const ul = document.getElementsByClassName('todo-items')[0];
let tasks = [];
let numberOfTasks = 0;
let numberOfDeleted = 0;
if(localStorage.length !=0){
    printLocal();
}

todayDate.textContent = dateFormater(new Date().toDateString().split(" "));     //global
function dateFormater (dateString){
    const dateFormated = dateString[0]+" "+dateString[1]+ " "+dateString[2] +","+dateString[3]
    return dateFormated ;
}

function updateTaskIndecator(){
    let totalTasks = numberOfTasks-numberOfDeleted;
    const tasksIndecator = document.getElementById('noTasks');
    if(numberOfTasks-numberOfDeleted != 0){
        tasksIndecator.textContent = `You have ${totalTasks} task/s`;
    }
    else {
        tasksIndecator.textContent = `You got no tasks !!! keep it like that`;
    }
}

submitBtn.addEventListener('click',(e)=>{
    addTask();
    e.preventDefault();
})

function addTask(){
    if(task.value=='' || deadline.value=='' || priority.value==''){
        alert("fill all the fields");
    }
    else{
        const taskObj = {
            task : task.value,
            deadline : deadline.value,
            priority: priority.value,
            id : Math.floor((Math.random()*10000000)),
            isChecked : false
        }
        tasks.push(taskObj);
        UpdateLocalStorage();
        displayTask(taskObj);
        form.reset();
    }
}

function UpdateLocalStorage(){
    localStorage.clear();
    let tasksString = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksString);
}

function displayTask(taskObj){
    const li = document.createElement('li');
    li.innerHTML = `<label class='col s1 check-task'>
        <input onclick='isChecked(this.parentNode.parentNode.id)' class='task-check' type='checkbox' ><span></span>
    </label>
    <div class='col s7'>
        <span class='task'></span>
        <span class='deadline'></span>
    </div>
    <div class='col s2 secondary'>
        <span class='priority badge '></span>
    </div><div class='col s2 secondary'>
        <a onclick='deleteTask(this.parentNode.parentNode.id)' class='secondary-content'>
            <i class='material-icons red-text'>delete</i>
        </a>
    </div>`;
    li.classList = 'collection-item row';
    li.setAttribute('id',taskObj.id);
    ul.appendChild(li);
    const task = document.getElementsByClassName('task')[numberOfTasks];
    const deadline = document.getElementsByClassName('deadline')[numberOfTasks];
    const priority = document.getElementsByClassName('priority')[numberOfTasks];
    const checkbox = document.getElementsByClassName('task-check')[numberOfTasks];
    if(taskObj.isChecked){
        checkbox.setAttribute('checked',true);
    }
    if(taskObj.priority === 'HIGH'){
        priority.classList.add("red", "accent-2");
    }
    else if(taskObj.priority === 'MEDIUM'){
        priority.classList.add("orange", "darken-2");
    }
    else{
        priority.classList.add("green", "darken-1");
    }
    task.innerText = taskObj.task;
    deadline.innerText = taskObj.deadline;
    priority.innerText = taskObj.priority;
    numberOfTasks++;
    updateTaskIndecator();
    isChecked(taskObj.id);
}

function printLocal(){
    tasks = JSON.parse(localStorage.getItem("tasks"));
    for(let i=0; i<tasks.length; i++){
        displayTask(tasks[i]);
    }
}

function deleteTask(id){
    li = document.getElementById(id);
    deleteFromTasks(id);
    li.remove();
    numberOfDeleted++;
    updateTaskIndecator()
}

function findTaskIndex(id){
    let index = tasks.findIndex(obj => obj.id === parseInt(id));
    return index;
}

function deleteFromTasks(id){
    let index = findTaskIndex(id);
    tasks.splice(index,1);
    UpdateLocalStorage();
}

function isChecked(id){
    const li = document.getElementById(id);
    const checkbox = li.getElementsByClassName('task-check')[0];
    const task = li.getElementsByClassName('task')[0];
    let index = findTaskIndex(id);
    if(checkbox.checked){
        task.style.textDecoration= "line-through";
        tasks[index].isChecked = true;
    }
    else{
        task.style.textDecoration= "none";
        tasks[index].isChecked = false;
    }
    UpdateLocalStorage();
}

//initializing materialize components
const calendar = document.querySelector('.datepicker');
M.Datepicker.init(calendar,{
    minDate: new Date()
});

let elems = document.querySelectorAll('select');
let options = document.querySelectorAll('option');
let instances = M.FormSelect.init(elems, options);