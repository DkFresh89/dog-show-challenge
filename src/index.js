document.addEventListener('DOMContentLoaded', () => {

    // On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.

    //find the table
    const table = document.querySelector('tbody#table-body')
    const API = 'http://localhost:3000/dogs'
   
    //creating new row 
    //adding table data via innerHTML

    function createTableRow(singleDog){

        const tableRow = document.createElement('tr')
        tableRow.dataset.id = singleDog.id 


        tableRow.innerHTML = `
            <td>${singleDog.name}</td> <td>${singleDog.breed}</td> <td>${singleDog.sex}</td> <td><button>Edit</button></td>`
        table.append(tableRow)
    }
//fetch the data
    //add data to the DOM
    function renderAllDogs(){
    fetch(API)
    .then(resp => resp.json())
    .then(allDogsArr => {
        allDogsArr.forEach(singleDogObj =>{
            createTableRow(singleDogObj)
        })
        })  
    }  
    renderAllDogs()
    /**************Deliv 2******************************** */
    // Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.

    //locate form 

    const dogForm = document.querySelector('form#dog-form')
    

    table.addEventListener('click', event =>{
        if(event.target.matches('button')){
            const parentRowId = event.target.closest('tr').dataset.id 

            fetch(`${API}/${parentRowId}`)
                .then(resp => resp.json())
                .then(editDog => {
                    dogForm.name.value = editDog.name 
                    dogForm.breed.value = editDog.breed
                    dogForm.sex.value = editDog.sex 
                    dogForm.dataset.id = editDog.id 
                    })
            console.log(parentRowId)
        }
    })

    dogForm.addEventListener('submit', event => {        
        event.preventDefault()
        const updated = {
            name: event.target.name.value,
            breed: event.target.breed.value,
            sex: event.target.sex.value,
        }
        // console.log(updated)
        // console.log(`${API}/${event.target.dataset.id}`)

        fetch(`${API}/${event.target.dataset.id}`,{
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify(updated)
        })
            .then(resp => resp.json())
            .then(data => {
                const edited = table.querySelector(`tr[data-id='${data.id}']`) //******************study this****************
                edited.innerHTML = `
            <td>${data.name}</td> <td>${data.breed}</td> <td>${data.sex}</td> <td><button>Edit</button></td>`
            }) 
            event.target.reset()

        
    })

    //target each edit button 
    //associated ID edit will render in the form via fetch
    //event listener on form
    //fetch to PATCH do DB
    //change in the DOM table

















})