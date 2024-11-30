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

const muscleFilterDOM = document.querySelector('#mucleFilter')
createSearchFilters('musclegroup',muscleFilterDOM)
const difficultyFilterDOM = document.querySelector('#difficultyFilter')
createSearchFilters('difficulty',difficultyFilterDOM)


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
        console.log(machine.musclegroup)
        console.log(getHTMLListFromArr(machine.musclegroup))
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
    console.log(htmlString)
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

        })
}

document.querySelector('#searchButton').addEventListener('click',searchDBForMachines)

function logThis() {
    console.log(getSearchbarContent())
}

//login functionality


//Checkbox for machines functionality
document.addEventListener('DOMContentLoaded', function () {
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


//Collapsing the machine selector checkboxes
    document.getElementById('toggleButton').addEventListener('click', function() {
    var content = document.getElementById('filterContent');
    if (content.style.display === 'none') {
    content.style.display = 'block';
    this.textContent = 'Hide list of machines';
} else {
    content.style.display = 'none';
    this.textContent = 'Show list of machines';
}
});







