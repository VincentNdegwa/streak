const form = document.querySelector("form")
const taskName = document.querySelector(".task-name")
const taskImage = document.querySelector(".task-image")
const taskDate = document.querySelector(".task-date")
const error = document.querySelector(".error")
const taskHolder = document.querySelector(".tasks")
let taskDeleteBtn = document.querySelector(".delete-btn")
const notfier = document.querySelector(".notifier")
const streakHolder = document.querySelector(".earliest-task")
let task = ""
let image = ""
let date = ""
let highestTimeDiffItem;
let success = false
let tasksArray = []
// tasksArray = window.tasksArray


const tasks = document.querySelector(".tasks")
const streaks = document.querySelector(".earliest-task")
let taskCards = document.querySelectorAll(".task-card");
let cardId
const viewSection = document.querySelector(".view-section")
const viewMainSection = document.querySelector(".view-main-section")
const mainContainer = document.querySelector("main")
const headerContainer = document.querySelector("header")

let streakCard = document.querySelector(".earliest-task-holder")


const listenError = () => {
    if (error.textContent !== "") {
        setTimeout(() => {
            error.textContent = ""
        },5000)
    }
}
listenError()
form.addEventListener("submit",(event) => {
    event.preventDefault()
    if (task.length>0 && image.length>0 && date.length>0) {
        event.preventDefault()
        const newTask = {
            name: task,
            imgUrl: image,
            date: date,
            id: Date.now()
        }
        success = true
        tasksArray.push(newTask)
        getStreak()
        renderTasks()
        renderNotification()
        // clearForm()
    } else {
        error.textContent = "please fill the form correctly"
        listenError()
    }
    
})
const renderTasks = () => {
    while (taskHolder.firstChild) {
        taskHolder.removeChild(taskHolder.firstChild);
    }

    tasksArray.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add('task-card');
        taskElement.setAttribute('id', task.id);
        taskElement.innerHTML = `
            <img src=${task.imgUrl} alt="task image">
            <h4>${task.date}</h4>
            <h3>${task.name}</h3>
        `;
        taskHolder.appendChild(taskElement);
    });

    attachEventListenersToTaskCards();
};

const clearForm = () => {
    taskName.value = "";
    taskDate.value = "";
    taskImage.value = "";

    task = ""
    date = ""
    image = ""
    error.textContent = "";
}

taskName.addEventListener("change", (event)=>{

    if (event.target.value.length > 0) {
        console.log(event.target.value)
        task = event.target.value
    } else {
        error.textContent = "Please enter task"
        listenError()
    }
})
taskImage.addEventListener("change", (event)=>{

    if (event.target.value.length > 0) {
         console.log(event.target.value)  
        image = event.target.value
    } else {
        error.textContent = "Please enter image url"
    }
})
taskDate.addEventListener("change", (event)=>{

    if (event.target.value.length > 0) {
         console.log(event.target.value)  
        date = event.target.value
    } else {
        error.textContent = "Please enter date"
    }
})

const renderNotification =()=>{
    if (tasksArray.length > 0) {
            notfier.innerHTML= `<h1>Success</h1>`
        setTimeout(() => {
            notfier.textContent= "Activities"
        }, 5000)
    } else {
        notfier.textContent = "You Don't Have Any Activities!!"
    }
}

const getStreak = () => {
  const highestTimeDiffItem = tasksArray.reduce((prevItem, currentItem) => {
    const prevTimeStamp = Date.parse(prevItem.date);
    const currentTimestamp = Date.parse(currentItem.date);

    const prevTimeDiff = (((currentTimestamp - prevTimeStamp) / 1000) / 60) / 60;
    const currentTimeDiff = (((currentTimestamp - currentTimestamp) / 1000) / 60) / 60;

    return currentTimeDiff > prevTimeDiff ? currentItem : prevItem;
  });

  let streakEl = document.createElement("div");
  streakEl.classList.add('earliest-task-card');
  streakEl.innerHTML = `
    <h3>Best streak</h3>
    <div class="earliest-task-holder" id="${highestTimeDiffItem.id}" >
      <img src="${highestTimeDiffItem.imgUrl}" alt="">
      <h4>${highestTimeDiffItem.date}</h4>
      <h3>${highestTimeDiffItem.name}</h3> 
    </div>
  `;

  streakHolder.innerHTML = '';
  streakHolder.appendChild(streakEl);
};

// view part

const attachEventListenersToTaskCards = () => {
    taskCards = document.querySelectorAll(".task-card");
    streakCard = document.querySelector(".earliest-task-holder")
    console.log(tasksArray)
    taskCards.forEach((card) => {
        card.addEventListener("click",()=>{toastTask(card)} );
    });
    streakCard.addEventListener("click", ()=>{toastTask(streakCard)})
};



const toastTask = (card) => {
    console.log(card)
let taskId = card.getAttribute("id");
let taskImage = card.querySelector("img").getAttribute("src");
let taskDate = card.querySelector("h4").textContent;
let taskName = card.querySelector("h3").textContent;

    let viewEl = document.createElement('div');
    viewEl.classList.add("view-card");
    viewEl.setAttribute("id", taskId);
    let taskTimeStamp = Date.parse(taskDate)
    let currentTimeStamp = Date.now()
    let timeDifferenceInMilliseconds = taskTimeStamp - currentTimeStamp;
    let timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60*24);
    let formatedTime = Math.floor(timeDifferenceInHours+1)
    // console.log(timeDifferenceInHours);
    viewEl.innerHTML = `
    <img src="${taskImage}" alt="view image" id="${taskId}">
    <h4>${taskDate}</h4>
    <h3>${taskName}</h3>
    <h3>${formatedTime <0? Math.abs(formatedTime): 0} days</h3>
    <div class="view-btns">
        <button class="cancel-btn">Cancel</button>
        <button class="delete-btn">Delete</button>
    </div>
`;
viewMainSection.style.zIndex = "30"

while (viewSection.firstChild) {
    viewSection.removeChild(viewSection.lastChild);
}
 viewSection.appendChild(viewEl);
 let cancelBtns = document.querySelector(".cancel-btn");
 cancelBtns.addEventListener("click",() => {
 viewMainSection.style.zIndex = "-2"
 })
    
    
    let deleteBtn = document.querySelector(".delete-btn")
    deleteBtn.addEventListener("click", () => {
        // let taskToDelete = document.getElementById(taskId)
        let unwantedTasks = document.querySelectorAll(`#${CSS.escape(taskId)}`);
        console.log(unwantedTasks);

        unwantedTasks.forEach((task) => {
        task.remove();
        });

        // taskToDelete.remove()

        viewMainSection.style.zIndex = "-2"
        console.log(tasksArray)
        const taskIndex = tasksArray.findIndex((task) => task.id == taskId)
        if (taskIndex !== -1) {
            console.log("item found")
            tasksArray.splice(taskIndex, 1)
            console.log(tasksArray)
        }
    })
    
    
 console.log("Clicked Task ID:", taskId);           
    
    
}


