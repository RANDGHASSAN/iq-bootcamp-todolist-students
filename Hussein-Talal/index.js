//declaring the variables
const todayDate = document.getElementById('todayDate');
let day = new Date().getDate();
let month = (new Date().getMonth() + 1);
let year = new Date().getFullYear();
const form = document.getElementById('form');
const text = document.getElementById('text');
const priority = document.getElementById('priorityChoose');
const submit = document.getElementById('submit');
const date = document.getElementById('date');
const msg = document.getElementById('msg');
const ul = document.querySelector('ul');

//adding the date to the header

todayDate.textContent = dateFormater(new Date().toDateString().split(" ")); 
function dateFormater (dateString){
    const dateFormated = dateString[0]+" "+dateString[1]+ " "+dateString[2] +","+dateString[3] 
    return dateFormated ;
}


//adding-task function
let numberOfTasks = 0;
let numberOfDeleted = 0;
const tasks = [];
function addTask(){
    if (text.value === '' || date.value === '') {
        msg.textContent = "Input the task and the date";
    }
    else{
        numberOfTasks++;
        const taskObj = {
            task : text.value,
            deadline : date.value,
            priority : priority.value
        }
        tasks.push(taskObj);
        document.getElementById('noTasks').textContent = `You have ${numberOfTasks-numberOfDeleted} task/s`;
        taskPrint(taskObj);
        form.reset();
        msg.textContent = '';
    }    
}

function deleteTask (id){
    numberOfDeleted++;
    const li = document.getElementById(`${id}`);
    li.remove();
}
function taskPrint (taskObj){
        const li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = "<div class='col s8'><span class='task'></span><span class='deadline'></span></div><div class='col s2 secondary' ><span class='priority badge red new'></span></div><div class='col s2 secondary'><a onclick='deleteTask(this.parentNode.parentNode.id)' class='secondary-content'><i class='material-icons'>delete</i></a></div>"
        li.classList = "collection-item row";
        li.setAttribute("id",numberOfTasks-numberOfDeleted);

        const task = document.getElementsByClassName('task')[numberOfTasks-1-numberOfDeleted];
        const deadline = document.getElementsByClassName('deadline')[numberOfTasks-1-numberOfDeleted];
        const priority = document.getElementsByClassName('priority')[numberOfTasks-1-numberOfDeleted];
        console.log(task);
        
        task.innerText = taskObj.task;
        deadline.innerText = taskObj.deadline;
        priority.innerText = taskObj.priority;
    
}

submit.addEventListener('click', (e)=>{
    e.preventDefault();
})




//initializing materialize components 
const calendar = document.querySelector('.datepicker');
M.Datepicker.init(calendar,{
    minDate: new Date()
});

let elems = document.querySelectorAll('select');
let options = document.querySelectorAll('option');
let instances = M.FormSelect.init(elems, options);