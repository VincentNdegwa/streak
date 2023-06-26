let toggleBtn = document.querySelector(".toggle-btn")
const welcomeSection = document.querySelector(".welcome")
const addSection = document.querySelector(".adding-task")


toggleBtn.addEventListener("click", () => {
    if (toggleBtn.className === "bx bx-plus-circle toggle-btn") {
        toggleBtn.className = "bx bx-x-circle toggle-btn"
        addSection.style.display = "flex"
        welcomeSection.style.display = "none"
        console.log("clicked")
    } else {
        toggleBtn.className = "bx bx-plus-circle toggle-btn"
        addSection.style.display = "none"
        welcomeSection.style.display = "flex"
    }
})

window.addEventListener("load", () => {
    toggleBtn.className = "bx bx-plus-circle toggle-btn"
    addSection.style.display = "none"
    welcomeSection.style.display = "flex"
})