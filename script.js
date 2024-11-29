// -- infoTab sidebar --

function updateInfoTap (machineArr) {
    const infoSectionDom = document.querySelector('#infoTab')
    let htmlString = ""     //this is the string we are inserting into the html to create the different divs with info
    for (machine of machineArr) {
        const divString = `<div>${machine}</div>`
        htmlString = htmlString + divString
    }
    infoSectionDom.innerHTML = htmlString   //finally, we insert the htmlstring into the document
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
    const formattetdifficultyArr = getAPIStringFromArr(difficultyArr)
    fetch(`http://localhost:3000/search/name=${name};musclegroup=${formattetMucleArr};difficulty=${formattetdifficultyArr}`)
        .then(response => response.json())
        .then(jsondata => {
            console.log(jsondata)
            updateInfoTap(jsondata)
        })
}

document.querySelector('#searchButton').addEventListener('click',searchDBForMachines)

function logThis () {
    console.log(getSearchbarContent())
}

//login functionality



function updateOneSelectedMachines () {

}







//Checkbox for machines functionality
document.addEventListener('DOMContentLoaded', function() {
    // Select all checkboxes and initialize the output variable
    const checkboxes = document.querySelectorAll('input[name="machine"]');
    let selectedMachines = [];

    // Function to update the selected machines
    function updateSelectedMachines() {
        selectedMachines = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // Log the selected machines to the console
        console.log('Selected Machines:', selectedMachines.join(', '));

        // Update the class of machine elements based on selection
        document.querySelectorAll('.unselectedMachine, .selectedMachine').forEach(element => {
            const machineType = element.id.replace(/[0-9]/g, ''); // Extract machine type from id
            if (selectedMachines.includes(machineType)) {
                element.classList.add('selectedMachine');
                element.classList.remove('unselectedMachine');
            } else {
                element.classList.add('unselectedMachine');
                element.classList.remove('selectedMachine');
            }
        });
    }

    // Add event listeners to each checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedMachines);
    });

    // Initial update to reflect the current state of checkboxes
    updateSelectedMachines();
});








