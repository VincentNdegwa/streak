
const tasks = document.querySelector(".tasks")
const streaks = document.querySelector(".earliest-task")
let taskCards = document.querySelectorAll(".task-card");
let cardId
const viewSection = document.querySelector(".view-section")
const viewMainSection = document.querySelector(".view-main-section")
const mainContainer = document.querySelector("main")
const headerContainer = document.querySelector("header")

let streakCard = document.querySelector(".earliest-task-holder")
const tasksArray = window.tasksArray;

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
    
let taskId = card.getAttribute("id");
let taskImage = card.querySelector("img").getAttribute("src");
let taskDate = card.querySelector("h4").textContent;
let taskName = card.querySelector("h3").textContent;

let viewEl = document.createElement('div');
viewEl.classList.add("view-card");
viewEl.setAttribute("id", taskId);
viewEl.innerHTML = `
    <img src="${taskImage}" alt="view image" id="${taskId}">
    <h4>${taskDate}</h4>
    <h3>${taskName}</h3>
    <h3>20 days ago</h3>
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

        const taskIndex = tasksArray.findIndex((task) => task.id === taskId)
        if (taskIndex !== -1) {
            console.log("item found")
            tasksArray.splice(taskIndex, 1)
            console.log(tasksArray)
        }
    })
    
    
 console.log("Clicked Task ID:", taskId);           
    
    
}
