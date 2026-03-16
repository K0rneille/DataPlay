//fetch et console log 


fetch('/src/data.json')
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })
