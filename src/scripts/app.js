import Chart from 'chart.js/auto';
"use strict";

//bouton de nav
const navBtn = document.querySelectorAll('.navigation__element');

navBtn.forEach(btn => {
    btn.addEventListener('click', navBtnActive );
})

// Prends les btn qui ont deja la classe active
let activeBtn = Array.from(document.querySelectorAll('.navigation__element--active'));
// console.log(activeBtn)

function navBtnActive (event){
    event.preventDefault()
    let target = event.target

    // console.log('false')
    target.classList.add('navigation__element--active')
    activeBtn.push(target);

    if(activeBtn.length > 2){
        let oldestBtn = activeBtn.shift();
        oldestBtn.classList.remove('navigation__element--active');
    }
}


//transform slider fixed
const body = document.querySelector('body');
const sliderContainer = document.querySelector('.slider__container');
// console.log(sliderContainer);
const sliderPosition = sliderContainer.getBoundingClientRect().bottom;
// console.log(sliderPosition)

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
// console.log(slider, sliderInput)
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
    // console.log(ValueToPercent(sliderInputPosition));
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
    // svgAppear();

    sliderSalary.innerHTML =''
    sliderSalary.innerHTML = `${getInputPosition()} €`;
    // console.log(sliderSalary);
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

    const navElements = document.querySelectorAll('.navigation__element');
    if (window.innerWidth >= 1200){
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


    } else {

        navElements.forEach((element)=>{
            const decoration = element.lastElementChild;
            decoration.style.width = `100%`;

        })
    }
}

changerTailleMenu()
let resize ;
window.addEventListener('resize', function(e){
    clearTimeout(resize);
    resize = setTimeout(() => {
        console.log('resize')
        changerTailleMenu();
    }, 300)
}
)
// Fetch/DATA
// Selections des villes

let donut1 = null;
let donut2 = null;
let slideBar = null;

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
        // console.log(e.currentTarget.firstElementChild.innerText.toLowerCase())
    }); 
}



// Fonction qui gere les data
function svgAppear(cityNameParam){
    // push des citys dans la liste
    const cityName = cityNameParam;
    if (donut1) {
        donut1.destroy();
    }
    if (donut2) {
        donut2.destroy();
    }
    if(slideBar){
        slideBar.destroy();
    }

    if (selectedCities.includes(cityName)){
        return;
    } 

    selectedCities.push(cityName);
    if (selectedCities.length > 2){ selectedCities.shift(); }

    // matos 
    const img1 = document.querySelector('.schema__ville__img--1');
    const img2 = document.querySelector('.schema__ville__img--2');
    const cityTitle1 = document.querySelectorAll('.city--1__title');
    const cityTitle2 = document.querySelectorAll('.city--2__title');
    const cityRpl1 = document.querySelector('.city--1__rpl');
    const cityRpl2 = document.querySelector('.city--2__rpl');
    let maskFiller1 = document.getElementById('maskFiller1');
    let maskFiller2 = document.getElementById('maskFiller2');    
    const canvaDay1 = document.querySelector('.canva__day1');
    const canvaDay2 = document.querySelector('.canva__day2');
    const painNbr1 = document.querySelector('.canva__nbr1');
    const painNbr2 = document.querySelector('.canva__nbr2');

    fetch('assets/data.json')
    .then(function(response){ 
        return response.json();
    })
    .then(function(dataCity){
        let citySorted = [...selectedCities];
        let cityA = citySorted[0];
        let cityB = citySorted[1];

        // classement des deux villes
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

        // Affichage des villes et autres
        cityTitle1.forEach((element) => element.innerHTML = cityA.toUpperCase());
        cityTitle2.forEach((element) => element.innerHTML = cityB.toUpperCase());

        cityRpl1.innerHTML = dataCity[cityA].rpl;
        cityRpl2.innerHTML = dataCity[cityB].rpl;
        
        maskFiller1.setAttribute('y', 277-dataCity[cityA].rpl);
        maskFiller2.setAttribute('y', 277-dataCity[cityB].rpl);

        //Chart JS
        // Donut1 const 
        const totalDays = 365; 
        const gainValue1 = sliderInput.value / 21.7;
        const daysValue1 = dataCity[cityA].m2 / gainValue1;
        canvaDay1.innerHTML = Math.round(daysValue1);
        // console.log(daysValue1);
        donut1 = new Chart(document.getElementById("temps__travail--1__canva"), {
            type: "doughnut",
            data :{
                datasets: [{
                    data: [daysValue1, Math.max(0, Math.min(365, (totalDays - daysValue1)))],
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
                legend: { display: false },
                tooltip: { enabled: false }
                }
            },
        });

        const gainValue2 = sliderInput.value / 30;
        const daysValue2 = dataCity[cityB].m2 / gainValue2;
        canvaDay2.innerHTML = Math.round(daysValue2);
        console.log(totalDays - daysValue1);
        donut2 = new Chart(document.getElementById("temps__travail--2__canva"), {
            type: "doughnut",
            data :{
                datasets: [{
                    data: [daysValue2, Math.max(0, Math.min(365, (totalDays - daysValue2)))],
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
                legend: { display: false },
                tooltip: { enabled: false }
                }
            },
        });

        // Slide bar
        const left = sliderInput.value / dataCity[cityA].pain;
        const right = sliderInput.value / dataCity[cityB].pain;
        const totalMax = left + right;
        painNbr1.innerHTML = Math.round(left);
        painNbr2.innerHTML = Math.round(right);

        slideBar = new Chart(
        document.getElementById('schema__pain'), {
            type: 'bar',
            data: {
            labels: ['City1 vs City2'],
            datasets: [
                {
                label: 'City1',
                data: [left],
                backgroundColor: '#f2f0ef',
                barThickness: 100,
                borderWidth: 0,
                // borderRadius: { topLeft: 20, bottomLeft: 20, topRight: 0, bottomRight: 0 },
                borderSkipped: false
                },
                {
                label: 'City2',
                data: [right],
                backgroundColor: '#414141',
                barThickness: 100,
                borderWidth: 0,
                // borderRadius: { topLeft: 0, bottomLeft: 0, topRight: 20, bottomRight: 20 },
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
        
        // Affichage des svg et leurs styles
        if (citySorted[0]){
            fetch(`assets/images/${citySorted[0]}.svg`)
            .then(r => r.text())
            .then(data => {
                img1.innerHTML = data;
                const s = img1.querySelector('svg');
                s.style.transform = "scale(1)";
                s.querySelectorAll('path').forEach(p => {
                    p.style.stroke = "none";
                    p.style.fill = "#414141";
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
                    p.style.stroke = "none";
                    p.style.fill = "#F2F0EF";
                });
            });
        }
    });
}

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


//date

const date = new Date();

const currentyear = date.getFullYear();
const yearfooter = document.querySelector(".dateyear");
yearfooter.textContent = currentyear;
