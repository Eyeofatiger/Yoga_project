window.addEventListener("DOMContentLoaded", function(){
    'use strict';

    // TAbs

    let info = document.querySelector(".info-header"),
        tab = document.querySelectorAll(".info-header-tab"),
        tabContent = document.querySelectorAll(".info-tabcontent");

        function hideTabContent(a){
            for (let i = a; i<tabContent.length; i++){
                tabContent[i].classList.remove("show");
                tabContent[i].classList.add("hide");
            }
        }
        hideTabContent(1);

        function showTabContent(b){
            if(tabContent[b].classList.contains("hide")){
                tabContent[b].classList.remove("hide");
                tabContent[b].classList.add("show");   
            }
        }

        info.addEventListener("click", function(event){
            let target = event.target;
            if(target && target.classList.contains("info-header-tab")){
                for(let i=0; i<tab.length; i++){
                    if(target == tab[i]){
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });

        //Timer

        let deadLine = "2019-10-11";

        function getTimeRemaining(endTime){
            let t = Date.parse(endTime) - Date.parse(new Date()),
                seconds = Math.floor((t/1000) % 60),
                minutes = Math.floor((t/1000/60) % 60),
                hours = Math.floor((t/1000/60/60));

            return {
                "total" : t,
                "hours" : hours,
                "minutes" : minutes,
                "seconds" : seconds
            }
        }

        function setClock(id, endTime){
            let timer = document.getElementById(id),
                hours = timer.querySelector(".hours"),
                minutes = timer.querySelector(".minutes"),
                seconds = timer.querySelector(".seconds"),
                timeInterval = setInterval(updateClock, 1000);


            function updateClock(){
                let t = getTimeRemaining(endTime);
                if(t.hours<10){
                    hours.textContent = "0"+t.hours;
                } else{hours.textContent = t.hours;}
                if(t.minutes<10){
                    minutes.textContent = "0"+t.minutes;
                } else{minutes.textContent = t.minutes}
                if(t.seconds<10){
                    seconds.textContent = "0"+t.seconds;
                } else {seconds.textContent = t.seconds;}

                if(t.total <= 0){
                    clearInterval(timeInterval);
                    hours.textContent = "00";
                    minutes.textContent = "00";
                    seconds.textContent = "00";
                }
            }
        }

        setClock("timer", deadLine);

    // Modal

    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close");

        more.addEventListener("click", function(){
            overlay.style.display = "block";
            this.classList.add("more-solash");
            document.body.style.overflow = "hidden";
        });

        close.addEventListener("click", function(){
            overlay.style.display = "none";
            more.classList.remove("more-solash");
            document.body.style.overflow = "";
        });
    
    //Modal for tabs

    let desBtn = document.querySelectorAll(".description-btn");
        for(let i = 0; i<desBtn.length; i++){
        desBtn[i].addEventListener("click", function(){
        overlay.style.display = "block";
        this.classList.add("more-solash");
        document.body.style.overflow = "hidden";
    });
}

    // Form + FormData

    /* let massage = {
        loading: "Loading...",
        success: "Thank you! We will call you soon.",
        failure: "Somthing wrong..."
    };

    let form = document.querySelector(".main-form"),
        input = form.getElementsByTagName("input"),
        statusMessage = document.createElement("div");

        statusMessage.classList.add("status");

        form.addEventListener("submit", function(event){
            event.preventDefault();
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open("POST", "server.php");
            request.setRequestHeader("Content-Type", "aplication/x-www-form-urlencoded");
            
            let formData = new FormData(form);
            request.send(formData);
            request.addEventListener("readystatechange", function(){
                if(request.readyState <4){
                    statusMessage.innerHTML = massage.loading;
                } else if(request.readyState ===4 && request.status == 200){
                    statusMessage.innerHTML = massage.success;
                } else {
                    statusMessage.innerHTML = massage.failure;
                }
            });

            for (let i=0; i<input.length; i++){
                input[i].value = "";
            }

        }); */

        //Form + JSON
        let massage = {
            loading: "Loading...",
            success: "Thank you! We will call you soon.",
            failure: "Somthing wrong..."
        };
    
        let form = document.querySelectorAll(".main-form, #form");
            
        for(let i=0; i<form.length; i++){
        
        let input = form[i].getElementsByTagName("input"),
            statusMessage = document.createElement("div");
    
            statusMessage.classList.add("status");
    
            form[i].addEventListener("submit", function(event){
                event.preventDefault();
                form[i].appendChild(statusMessage);
    
                let request = new XMLHttpRequest();
                request.open("POST", "server.php");
                request.setRequestHeader("Content-Type", "aplication/json; charset=utf-8");
                
                let formData = new FormData(form[i]);
                        //FormData to obj to JSON
                let obj ={};
                formData.forEach(function(value, key){
                    obj[key] = value;
                });

                let json = JSON.stringify(obj);

                request.send(json);
                request.addEventListener("readystatechange", function(){
                    if(request.readyState <4){
                        statusMessage.innerHTML = massage.loading;
                    } else if(request.readyState ===4 && request.status == 200){
                        statusMessage.innerHTML = massage.success;
                    } else {
                        statusMessage.innerHTML = massage.failure;
                    }
                });
    
                for (let i=0; i<input.length; i++){
                    input[i].value = "";
                }
    
            });
        }

        // Slider

        let slideIndex = 1,
            slides = document.querySelectorAll(".slider-item"),
            prev = document.querySelector(".prev"),
            next = document.querySelector(".next"),
            dotsWrap = document.querySelector(".slider-dots"),
            dots = document.querySelectorAll(".dot");
        
        function showSlides(n){

            if(n > slides.length){
                slideIndex=1;
            }
            if(n < 1){
                slideIndex = slides.length;
            }

            slides.forEach((item) => item.style.display ="none");
            dots.forEach((dots) => dots.classList.remove("dot-active"));

            slides[slideIndex-1].style.display ="block";
            dots[slideIndex-1].classList.add("dot-active");
        }

        function plusSlide(n){
            showSlides(slideIndex +=n);
        }
        function currentSlide(n){
            showSlides(slideIndex = n);
        }

        prev.addEventListener("click", function(){
            plusSlide(-1);
        });

        next.addEventListener("click", function(){
            plusSlide(1);
        });

        dotsWrap.addEventListener("click", function(event){
            for (let i=0; i<dots.length+1; i++){
                if(event.target.classList.contains("dot") && event.target == dots[i-1]){
                    currentSlide(i);
                }
            }
        });

        //Calc

        let persons = document.querySelectorAll(".counter-block-input")[0],
            restDays = document.querySelectorAll(".counter-block-input")[1],
            place = document.getElementById("select"),
            totalValue = document.getElementById("total"),
            personSum = 0,
            daySum = 0,
            total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener("change", function(){
            personSum = +this.value;
            total = daySum*personSum*100;

            if(restDays.value ==""){
                totalValue.innerHTML = 0;
            } else{
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener("change", function(){
            daySum = +this.value;
            total = daySum*personSum*100;

            if(persons.value ==""){
                totalValue.innerHTML = 0;
            } else{
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener("change", function(){
            if(restDays.value == "" || persons.value == ""){
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total * +this.value;
            }
        });
});