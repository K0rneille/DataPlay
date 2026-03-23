//bouton de nav


const navBtn = document.querySelectorAll('.navigation__element');

navBtn.forEach(btn => {

    btn.addEventListener('click', navBtnActive );
})



function navBtnActive (event){
    event.preventDefault()
    console.log(navBtn)
    let target = event.target
    if (target.classList.contains('navigation__element--active')){
        target.classList.remove('navigation__element--active')
    }else{
        console.log('false')
        target.classList.add('navigation__element--active')
    }
}


//transform slider fixed


const sliderContainer = document.querySelector('.slider__container');
console.log(sliderContainer);
const sliderPosition = sliderContainer.getBoundingClientRect().bottom;
console.log(sliderPosition)

window.addEventListener('scroll', handlescroll);
function handlescroll(){
	if ((window.scrollY + window.innerHeight) > sliderPosition) {
		 sliderContainer.classList.add('fixed');
	} 
	else{
		 sliderContainer.classList.remove('fixed');
	}

}