//const qui vont etre utuliser
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// si on click sur commencer 
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //info box
}

// si on click sur quitter
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // disable le info box
}

// si on click sur recommencer 
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //disable le info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //appl showqest function
    queCounter(1); //
    startTimer(15); //appl startTimer function
    startTimerLine(0); //appl startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// si on click sur commencer 
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); // qui display le quiz box
    result_box.classList.remove("activeResult"); //on display la bonne rep mais sans score box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //appl showqest function
    queCounter(que_numb); 
    clearInterval(counter); //on reset le counter pour avoir un new counter pour la questions suivante
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //appl un new startTimer function pour la question swivante
    startTimerLine(widthValue); //appl startTimerLine function
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
}

// si on click sur quitter 
quit_quiz.onclick = ()=>{
    window.location.reload(); // = on va act reload / f5 stp pls
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// si on click sur Next 
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //si on a moins de 5 questions
        que_count++; //increment la valeur que_count 
        que_numb++; //increment le que_numb value
        showQuetions(que_count); //appl showqest function
        queCounter(que_numb); 
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //appl startTimer function
        startTimerLine(widthValue); //appl startTimerLine function
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); //print appl la showResult function
    }
}

// un from array pour fetch les questions et answers 
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //on cree un **new** span & div tag pour les questions et les answers - on envoie leur value avec un array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    // on assure que on peut click sur tout les answers/ fin hover quoi
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//si on choisi une answer
function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; //on recup la user answer 
    let correcAns = questions[que_count].answer; //on array / fetch la correct rep depuis notre JSON
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ //SI LE USER ANSWER EST LA BONNE REP - 2 H
        userScore += 1; //Ajoute de + 1 pour le score display at end 
        answer.classList.add("correct"); //je print un green highlight pour la correct answer 
        answer.insertAdjacentHTML("beforeend", tickIconTag); //un pti tick pour la bonne rep - Future web designer 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //je print un red highlight pour la wrong answer 
        answer.insertAdjacentHTML("beforeend", crossIconTag); //un pti cross a droite / wrong answer 
        console.log("Wrong Answer");
       
        // sim HERITAGE -

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ // option pas selected = array answer 
                option_list.children[i].setAttribute("class", "option correct"); // green pour la bonne rep si pas selected
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //un pti tick icon
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //[BALANCE] Pour eviter un abuse - disable tous les  rep si one est selected
    }
    next_btn.classList.add("show"); //pour passer a la question suivante on display le next button si une rep est selected
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // si result > 3
        //un custom span pour des result diff 
        let scoreTag = '<span> Bravoo!! Vous avez obtenu  <p>'+ userScore +'</p> / <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // si le result finale > 1
        let scoreTag = '<span> Vous pouvez faire mieux!!<p>' + userScore +'</p>/<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else{ // si le result finale =< 1
        let scoreTag = '<span> Plus de chance la prochainee fois <p>'+ userScore +'</p> / <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}
 // Timer settings - uggghh - 5 joursss 
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //un custom valeur qui corresp la text value 
        time--; //pour faire le time -> go down  3 2 1 0 ...
        if(time < 9){ //des diffrent settings pour assurer la flexib de l'appli
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //tjr on ajout un 0 
        }
        if(time < 0){ //si on a un timer value < 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //changer comment je veux appl le time off
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; //appl a la correct rep 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); //ajt le green highlight si correct rep
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //et bien sur on ajoute un pti tick
                    console.log("Pas de temps restant, La correct reponse ");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //[BALANCE] un autre fix pour notre future USER ABUSER
            }
            next_btn.classList.add("show"); //UN SHOW POUR MONTRER LA REPONSE
        }
    }
}
// start time function - pour rendre l'app flexib
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        time_line.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}
x
function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; 
}
console.log("test 1")