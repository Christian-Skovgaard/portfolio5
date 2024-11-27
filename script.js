// -- funtionality for searching --
const getActiveCheckboxArr = (filterId) => {
    //function that loops that itterates through all checkboxes and determens withch are checked, then returns as arr
    //denne funktion virker uanset hvor mange filters vi tilføjer fordi den bare tager contetet af vores label for checkboxen, så vi kan bare føje flere til
    const activeCheckboxArr = []
    const inputDomArr = document.querySelectorAll(`#${filterId}>div>input`)
    //vi går igennem alle vores filtre og checker om de er checked eller ej
    for (let i = 0; i < inputDomArr.length; i++) {
        if (inputDomArr[i].checked === true) {
            //her finder vi contenten af det label som er tilknyttet checkboxen of tilføjer den content til vores array
            const checkboxLabel = document.querySelector(`#${filterId}>div:nth-child(${i + 1})>label`)
            activeCheckboxArr.push(checkboxLabel.textContent)
        }
    }
    return activeCheckboxArr
}

const getSearchbarContent = () => document.querySelector('#searchbar').value

const getAPIStringFromArr = (arr) => {
    let string = ''
    for (let i = 0; i < arr.length; i++) {
        string = string + arr[i]
        if (i !== arr.length-1) {
            string = string + '.'
        }
    }
    return string
}


function searchDBForMachines () {
    const name = getSearchbarContent()
    const mucleArr= getActiveCheckboxArr('mucleFilter')
    const formattetMucleArr = getAPIStringFromArr(mucleArr)
    const difficultyArr= getActiveCheckboxArr('difficultyFilter')
    const formattetdifficultyArr = getAPIStringFromArr(mucleArr)
    fetch(`http://localhost:3000/search/name=${name};musclegroup=${formattetMucleArr};difficulty=${formattetdifficultyArr}`)
        .then(response => response.json())
        .then(jsondata => {console.log(jsondata)})
}

document.querySelector('#searchButton').addEventListener('click',searchDBForMachines)

function logThis () {
    console.log(getSearchbarContent())
}

//login functionality
