const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value    

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) =>{
            if(data.Error){
                messageOne.textContent = data.Error
            }else{
                messageOne.textContent = data.Location
                messageTwo.textContent = data.data
            }
        })
    })

})