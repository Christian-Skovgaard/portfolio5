function searchDBForMachines (name,muscleArr) {
    fetch(`http://localhost:3000/search/${name}`)
        .then(response => response.json())
        .then(data => {return data})
}

