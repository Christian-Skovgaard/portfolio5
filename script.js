//make sure the backend is running
fetch('http://localhost:3000/test').then(response => {
    if (response) {
        console.log('backend is responding')
    }
}).catch((error) => {
    console.log(error);
    alert('backend is not running')
})



// -- searchwindowmaker --
function createSearchFilters (category,DOMElm) {
    let htmlSting = ''
    fetch(`http://localhost:3000/search/displayCategoryValues/${category}`).then(response => response.json())
        .then(resultArr => {
            for (item of resultArr) {
                htmlSting = htmlSting +
                    `<div>
                        <input type="checkbox">
                        <label>${item}</label>
                    </div>`
            }
            DOMElm.innerHTML = htmlSting
        })
}


//we make the two filters using the function we just made above
const muscleFilterDOM = document.querySelector('#mucleFilter')
createSearchFilters('musclegroup',muscleFilterDOM)
const difficultyFilterDOM = document.querySelector('#difficultyFilter')
createSearchFilters('difficulty',difficultyFilterDOM)


//direct machineselector


function createdirectMachineSearch () {
    //this function created the direct search found in the right hand side of the navbar
    //the first part is the same as the createFilter function, but here we have added more steps so it felt nice to have it here as well
    const directMachineSearchDOM = document.querySelector('#machineFilter')
    let htmlSting = ''
    fetch(`http://localhost:3000/search/displayCategoryValues/name`).then(response => response.json())
        .then(resultArr => {
            for (item of resultArr) {
                htmlSting = htmlSting +
                    `<div class="machineSearchItem">
                        <p>${item}</p>
                    </div>`
            }
            directMachineSearchDOM.innerHTML = htmlSting

            //new we add eventlistners to all of them that update the map
            const machineSearchDOMDivArr = document.querySelectorAll('#machineFilter>div')
            for (machineSearchDOMDiv of machineSearchDOMDivArr) {   //De her variablenavne kan et eller andet, ved ikke helt hvad
                machineSearchDOMDiv.addEventListener('click', (event) => {
                    console.log(`${event.target.textContent} was pressed`)
                    if (!event.target.classList.contains('selectedMachineFilter')) {
                        selectedMachineNamesArr.push(event.target.textContent)
                        event.target.classList.add('selectedMachineFilter')
                    }
                    else {
                        const indexOfMachineName = selectedMachineNamesArr.indexOf(event.target.textContent)
                        selectedMachineNamesArr[indexOfMachineName] = undefined
                        event.target.classList.remove('selectedMachineFilter')
                    }
                    updateSelectedMachines()
                })
            }
        })
}

createdirectMachineSearch()


// -- infoTab sidebar --
function getHTMLListFromArr (arr) {
    //this function makes a ul-li list for html from an array so that it can be displayed on the document
    let HTMLString = ''
    for (item of arr) {
        HTMLString = HTMLString + `<li>${item}</li>`
    }
    HTMLString = '<ul>' + HTMLString + '</ul>'
    return HTMLString
}


function updateInfoTap(machineArr) {
    const infoSectionDom = document.querySelector('#infoTab')
    let htmlString = ""     //this is the string we are inserting into the html to create the different divs with info
    for (machine of machineArr) {
        //console.log(machine.musclegroup)
        //console.log(getHTMLListFromArr(machine.musclegroup))
        const divString =
            `<div class="infobox">
                   <h3>${machine.name}</h3>
                   <p>difficulty: ${machine.difficulty}</p>
                   <p>dangerlevel: ${machine.dangerlevel}</p>
                   <p>dangerlevel: ${machine.dangerlevel}</p>
                   ${getHTMLListFromArr(machine.musclegroup)}
             </div>`
        htmlString = htmlString + divString
    }
    //console.log(htmlString)
    infoSectionDom.innerHTML = htmlString   //finally, we insert the htmlstring into the document
}


// -- map functionality --
let selectedMachineNamesArr = []  //here we will have the names of all active machines that is selected on the map

const resetMap = () => {
    selectedMachineNamesArr = []
    updateSelectedMachines()
}

const updateSelectedMachineNamesArrWithJasonData = (searchjson) => {    //this function-name might be a bit to long
    //this just takes the jason and puts it in the selectedMachineNamesArr, because it looks nicer to have it clear in the searchDB function
    for (obj of searchjson) {
        selectedMachineNamesArr.push(obj.name)
    }
}

function updateSelectedMachines () {    //with this function we make the unselected machine class useless, the css properties of the selectedMachine-class will be on top since it is apllied after the "normal" styling
    //we reset the map by removing all selectedMachine-classes
    const allMachinesDOMArr = document.querySelectorAll('#map>div')
    for (machineDOM of allMachinesDOMArr) {
        machineDOM.classList.remove('selectedMachine')
    }
    //we add the selected machine back to all the machines in our array
    for (machineName of selectedMachineNamesArr) {
        const machineDOMArr = document.querySelectorAll(`#map>.${machineName}`)
        for (machineDOM of machineDOMArr) {
            machineDOM.classList.add('selectedMachine')
        }
    }
}

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
        if (i !== arr.length - 1) {
            string = string + '.'
        }
    }
    return string
}

function searchDBForMachines() {
    const name = getSearchbarContent()
    const mucleArr = getActiveCheckboxArr('mucleFilter')
    const formattetMucleArr = getAPIStringFromArr(mucleArr)
    const difficultyArr = getActiveCheckboxArr('difficultyFilter')
    const formattetdifficultyArr = getAPIStringFromArr(difficultyArr)
    fetch(`http://localhost:3000/search/name=${name};musclegroup=${formattetMucleArr};difficulty=${formattetdifficultyArr}`)
        .then(response => response.json())
        .then(jsondata => {
            console.log(jsondata)
            updateInfoTap(jsondata)
            resetMap()
            updateSelectedMachineNamesArrWithJasonData(jsondata)
            updateSelectedMachines()
        })
}

document.querySelector('#searchButton').addEventListener('click',searchDBForMachines)

function logThis() {
    console.log(getSearchbarContent())
}




