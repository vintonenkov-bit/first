let question = document.querySelector('.question')
let answers = document.querySelectorAll('.answer')
let result = document.querySelector('.result')
let button = document.querySelector('button')
let container = document.querySelector('.container')
let start_container = document.querySelector('.start-container')

function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", function () {
        const selectedAnswer = answers[i].innerHTML;
        const correctAnswer = current_question.correct_answer.toString();

        
        if (selectedAnswer === correctAnswer) {
            container.classList.add("correct-bg");
        } else {
            container.classList.add("incorrect-bg");
        }


        for (let j = 0; j < answers.length; j++) {
            if (answers[j].innerHTML === correctAnswer) {

                answers[j].style.backgroundColor = "#00FF00";
            } else {

                answers[j].style.backgroundColor = "#FF0000";
            }
        }


        if (selectedAnswer === correctAnswer) {
            correct_counter++;
        }


        for (let btn of answers) {
            btn.style.pointerEvents = "none";
        }


        setTimeout(() => {
            container.classList.remove("correct-bg", "incorrect-bg");

            for (let btn of answers) {
                btn.style.backgroundColor = "";
                btn.style.pointerEvents = "auto";
            }

            question_counter++;
            current_question = new Question();
            current_question.display();
        }, 1000);
    });
}



let array_signs = ['+', '-', '*', '/']

function getRandomSign() {
    return array_signs[randint(0, 3)]
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
        let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
        [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
    }
}

class Question {
    constructor() {
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') {
            this.correct_answer = a + b
        }
        else if (sign == '-') {
            this.correct_answer = a - b
        }
        else if (sign == '*') {
            this.correct_answer = a * b
        }
        else if (sign == '/') {
            this.correct_answer = Math.round(a / b)
        }


        this.all_answers = [
            randint(this.correct_answer - 10, this.correct_answer + 10),
            randint(this.correct_answer - 10, this.correct_answer + 10),
            this.correct_answer,
            randint(this.correct_answer - 10, this.correct_answer + 10),
            randint(this.correct_answer - 10, this.correct_answer + 10),
        ]

        shuffle(this.all_answers)
    }

    display() {
        question.innerHTML = this.question;
        for (let i = 0; i < answers.length; i += 1) {
            answers[i].innerHTML = this.all_answers[i]
        }
    }
}


let question_counter = 0
let correct_counter = 0
let current_question = new Question()

current_question.display()




button.addEventListener('click', () => {
    start_container.style.display = 'none'
    container.style.display = 'flex'

    setTimeout(() => {
        let accuracy = Math.round(correct_counter * 100 / question_counter)
        result.innerHTML = `Ви дали ${correct_counter} правильних відповідей із ${question_counter}, Точніть - ${accuracy}%`
        start_container.style.display = 'flex'
        container.style.display = 'none'
        correct_counter = 0
        question_counter = 0
    }, 50000
    )
}
)