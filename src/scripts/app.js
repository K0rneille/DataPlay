//bouton de nav


const navBtn = document.querySelectorAll('.navigation__element');



// let i = 0 ; i< navBtn.getLengh()-1 ; i++ {

// }

// navBtn.addEventListener('click',navBtnActive)
navBtn.forEach(btn => {

    btn.addEventListener('click', navBtnActive );
    console.log(btn)
})



function navBtnActive (event){
    console.log(navBtn)
    let target = event.target
    if (target.classList.contains('navigation__element--active')){
        target.classList.remove('navigation__element--active')
    }else{
        console.log('false')
        target.classList.add('navigation__element--active')
    }
}


