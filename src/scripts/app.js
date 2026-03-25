import Chart from 'chart.js/auto';
"use strict";

//bouton de nav


const navBtn = document.querySelectorAll('button');

navBtn.forEach(btn => {
    btn.addEventListener('click', navBtnActive );
})

let activeBtn = Array.from(document.querySelectorAll('.navigation__element--active'));
console.log(activeBtn)

function navBtnActive (event){
    event.preventDefault()
    console.log(activeBtn)
    let target = event.target
    if (target.classList.contains('navigation__element--active')){
        target.classList.remove('navigation__element--active')
    }else{
        console.log('false')
        target.classList.add('navigation__element--active')
        activeBtn.push(target);

        if(activeBtn.length > 2){
            let oldestBtn = activeBtn.shift();
            oldestBtn.classList.remove('navigation__element--active');
        }
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



function ChangeDataRange (){

    const salary = sliderInput.value;

    const cities = document.querySelector('.navigation__element--active')


    
}








// event du range
sliderInput.addEventListener('input', () => {
    inputMovePassive();

    sliderSalary.innerHTML =''
    sliderSalary.innerHTML = `${getInputPosition()} €`;
    ChangeDataRange();
})

// event de l'input 
sliderSalary.addEventListener('focusout', ()=> {
    let value = sliderSalary.innerHTML;
        value =  value.replace('€', '')
     const salary = `${value} €`
    sliderSalary.innerHTML = salary
    sliderInput.value = value
    inputMovePassive();
    
})


// changer taille menu 

changerTailleMenu();
function changerTailleMenu (){

    if (window.innerWidth >= 1200){
        const navElements = document.querySelectorAll('.navigation__element');
        navElements.forEach((element) => {
            const target = element.firstElementChild.innerHTML.toLowerCase();
            // const result = parseFloat(data [target].rpl);
            // console.log(result)

            fetch('assets/data.json')
            .then(function(reponse){
                return reponse.json();
            }).then(function(data){
                const link = parseFloat(data[target].rpl);
                console.log(link)
                const valor = (link / 2.7683)
                const decoration = element.lastElementChild;
                console.log(decoration);
            
                decoration.style.width = `${valor}%`;
            })
        })


    }
}

changerTailleMenu()




// Fetch btn
const btn = document.querySelectorAll('.navigation__element');
let selectedCities = [];
window.addEventListener('load', () => {
    const defaultCities = ["bruxelles", "paris"];
    defaultCities.forEach(city => {
        svgAppear(city);
    })
});

for (let i = 0; i < btn.length; i++){
    btn[i].addEventListener('click', (e) => {
        svgAppear(e.currentTarget.firstElementChild.innerText.toLowerCase())
        console.log(e.currentTarget.firstElementChild.innerText.toLowerCase())
    }); 
}

function svgAppear(cityNameParam){
    const cityName = cityNameParam;

    if (selectedCities.includes(cityName)){
        console.log("same shit");
        return;
    } 

    selectedCities.push(cityName);
    if (selectedCities.length > 2){ selectedCities.shift(); }

    const img1 = document.querySelector('.schema__ville__img--1');
    const img2 = document.querySelector('.schema__ville__img--2');

    fetch('assets/data.json')
    .then(function(response){ 
        return response.json();
    })
    .then(function(dataCity){
        let citySorted = [...selectedCities];
        let cityA = citySorted[0];
        let cityB = citySorted[1];

        if (cityB){
            const rplA = parseFloat(dataCity[cityA].rpl);
            const rplB = parseFloat(dataCity[cityB].rpl);

            if (rplB > rplA){
                citySorted = [cityB, cityA];
                cityA = citySorted[0];
                cityB = citySorted[1];
            }
            
            const ratio = dataCity[cityB].rpl / dataCity[cityA].rpl;
            window.currentRatio = ratio; 
        } 
        else{
            window.currentRatio = 1; 
        }
        console.log(window.currentRatio);
        console.log(citySorted[0]);
        console.log(citySorted[1]);
        if (citySorted[0]){
            fetch(`assets/images/${citySorted[0]}.svg`)
            .then(r => r.text())
            .then(data => {
                img1.innerHTML = data;
                const s = img1.querySelector('svg');
                s.style.transform = "scale(1)";
                s.querySelectorAll('path').forEach(p => {
                    p.style.stroke = "black";
                    p.style.strokeWidth = "1.33px";
                    p.style.vectorEffect = "non-scaling-stroke"; 
                    p.style.fill = "black";
                });
            });
        }
        
        if (citySorted[1]){
            fetch(`assets/images/${citySorted[1]}.svg`)
            .then(r => r.text())
            .then(data => {
                img2.innerHTML = data;
                const s = img2.querySelector('svg');
                s.style.transform = `scale(${window.currentRatio})`;
                s.style.transformOrigin = "center";
                s.querySelectorAll('path').forEach(p => {
                    p.style.stroke = "white";
                    p.style.strokeWidth = "1.33px";
                    p.style.vectorEffect = "non-scaling-stroke"; 
                    p.style.fill = "white";
                    // p.style.opacity = "0.7"
                });
            });
        }
    });
}

//Chart JS
// Donut1 const 

const totalDays = 365; 
const daysValue1 = 124;
const donut1 = new Chart(document.getElementById("temps__travail--1__canva"), {
    type: "doughnut",
    data :{
        datasets: [{
            data: [daysValue1, totalDays - daysValue1],
            backgroundColor: ["#e0e0e0", "#333"],
            borderWidth: 0,
            cutout: "60%",
            circumference: 180,
            rotation: 270,
            borderRadius: 5
    }]},
    options: {
        maintainAspectRatio: false,
        plugins: {
        legend: { display: true },
        tooltip: { enabled: false }
        }
    },
});



const daysValue2 = 124;
const donut2 = new Chart(document.getElementById("temps__travail--2__canva"), {
    type: "doughnut",
    data :{
        datasets: [{
            data: [daysValue2, totalDays - daysValue2],
            backgroundColor: ["#e0e0e0", "#333"],
            borderWidth: 0,
            cutout: "60%",
            circumference: 180,
            rotation: 270,
            borderRadius: 5
    }]},
    options: {
        maintainAspectRatio: false,
        plugins: {
        legend: { display: true },
        tooltip: { enabled: false }
        }
    },
});


// Slide bar
const City1 = 120;
const City2 = 92;
const totalMax = City2 + City1;

const slideBar = new Chart(
  document.getElementById('schema__pain'), {
    type: 'bar',
    data: {
      labels: ['City1 vs City2'],
      datasets: [
        {
          label: 'City1',
          data: [City1],
          backgroundColor: '#e0e0e0',
          borderWidth: 0,
          borderRadius: { topLeft: 10, bottomLeft: 10, topRight: 0, bottomRight: 0 },
          borderSkipped: false
        },
        {
          label: 'City2',
          data: [City2],
          backgroundColor: '#333',
          borderWidth: 0,
          borderRadius: { topLeft: 0, bottomLeft: 0, topRight: 10, bottomRight: 10 },
          borderSkipped: false
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          stacked: true,
          max: totalMax,
          display: false
        },
        y: {
          stacked: true,
          display: false
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    },
  }
);

// sources

const menuToggle = document.querySelector(".source__toggle");
const menu = document.querySelector(".source__list__container");
const menuLinks = document.querySelectorAll("a");


if(menuToggle){
    menuToggle.addEventListener("click", menuOpen);

    for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener("click", menuOpen);
    }
}

function menuOpen(event){
    menu.classList.toggle("source__list__container--active");
}