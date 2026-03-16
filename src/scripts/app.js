//fetch et console log 


fetch('../assets/data.json')
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
        data.forEach(element => {  
            for (let key in element){
                console.log(key, element[key])
            }
        });
    })
