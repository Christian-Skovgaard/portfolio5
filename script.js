
const getActiveCheckboxArr = () => {
    //function that loops that itterates through all checkboxes and determens withch are checked, then returns as arr
    //denne funktion virker uanset hvor mange filters vi tilføjer fordi den bare tager contetet af vores label for checkboxen, så vi kan bare føje flere til
    const activeCheckboxArr = []
    const inputDomArr = document.querySelectorAll('header>nav>section>div>input')
    //vi går igennem alle vores filtre og checker om de er checked eller ej
    for (let i = 0; i < inputDomArr.length; i++) {
        if (inputDomArr[i].checked !== true) {
            //her finder vi contenten af det label som er tilknyttet checkboxen of tilføjer den content til vores array
            const checkboxLabel = document.querySelector(`header>nav>section>div:nth-child(${i + 1})>label`)
            activeCheckboxArr.push(checkboxLabel.textContent)
        }
    }
    return activeCheckboxArr
}

const getSearchbarContent = () => document.querySelector('#searchbar').value

function searchDBForMachines (name,muscleArr) {
    fetch(`http://localhost:3000/search/${name}`)
        .then(response => response.json())
        .then(data => {return data})
}

function logThis () {
    console.log(getSearchbarContent())
}

