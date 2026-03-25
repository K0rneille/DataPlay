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
<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes


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

function inputMovePassive(){
    const sliderSalaryPosition = getComputedStyle(sliderInput).getPropertyValue('--position');
    const sliderInputPosition = parseFloat(sliderInput.value);
    console.log(ValueToPercent(sliderInputPosition));
    changeSalaryPosition(ValueToPercent(sliderInputPosition));
    console.log(sliderInputPosition)
    // const SliderWidth = slider.()
}


sliderInput.addEventListener('input', () => {
    inputMovePassive();
})