"use strict";



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
const body = document.querySelector('body');
const sliderContainer = document.querySelector('.slider__container');
console.log(sliderContainer);
const sliderPosition = sliderContainer.getBoundingClientRect().bottom;
console.log(sliderPosition)

window.addEventListener('scroll', handlescroll);
handlescroll();

function handlescroll(){
    if (window.scrollY > 0 ){
		 body.classList.add('scrolled');

	} 
	else{
		 body.classList.remove('scrolled');
	}

    } 




//slider text position 

const sliderSalary = document.querySelector('.inputSalary');
const slider = document.querySelector('.slider');
const sliderInput = document.querySelector('.slider__input');
console.log(slider, sliderInput)
let sliderSalaryText = sliderSalary.innerHTML ;

    function ValueToPercent (inputPosition) {
        const result = (inputPosition *100) / 10000
        return `${result}%`
    }

    function changeSalaryPosition (value){

        slider.style.setProperty('--position', value)
        // console.log(getComputedStyle(slider).getPropertyValue('--position'))
    }











// changer valeur du div en fonction du range
function inputMovePassive(){
    const sliderSalaryPosition = getComputedStyle(sliderInput).getPropertyValue('--position');
    const sliderInputPosition = parseFloat(sliderInput.value);
    console.log(ValueToPercent(sliderInputPosition));
    changeSalaryPosition(ValueToPercent(sliderInputPosition));
    // const SliderWidth = slider.()
}

    //opternir la valeur du range
function getInputPosition(){
    const sliderInputPosition = parseFloat(sliderInput.value);
    return sliderInputPosition;
}




//empecher un retour a la ligne
window.addEventListener('keydown', (event)=>{
        if (event.key === 'Enter'&& event.target === sliderSalary){
            event.preventDefault();
        }
    })
// event du range
sliderInput.addEventListener('input', () => {
    inputMovePassive();


    sliderSalary.innerHTML = `${getInputPosition()} €`;
    console.log(sliderSalary);

}) 

// event de l'input 
sliderSalary.addEventListener('focusout', ()=> {
    const value = sliderSalary.innerHTML;
     const salary = `${sliderSalary.innerHTML} €`
    sliderSalary.innerHTML = salary
    sliderInput.value = value
    inputMovePassive();
    
})