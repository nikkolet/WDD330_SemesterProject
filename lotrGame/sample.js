let btn1 = document.querySelector('#btn1');
let btn2 = document.querySelector('#btn2');
let btn3 = document.querySelector('#btn3');

//button onclick functions
btn1.addEventListener('click', () => {
    document.body.style.backgroundImage = "url('./images/fotr_background.jpg')";
});
btn2.addEventListener('click', () => {
    document.body.style.backgroundImage = "url('./images/ttt_background.jpeg')";
});
btn3.addEventListener('click', () => {
    document.body.style.backgroundImage = "url('./images/rotk_background.webp')";
});

const main = document.querySelector('.container');
const message = pageEles(main, 'div', 'Press Button to Start', 'message');
const output = pageEles(main, 'div', '', 'game');
const url = 'json/fotrQues.json';
const game = { score: 0 };
btn.onclick = loadData;

//Make AJAX Request to JSON File and return Data
function loadData() {
    btn.style.display = 'none';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const temp = {
                total: data.length,
                q: data,
                counter: 0,
                quote: data.quote
            }; //Total Number of Questions
            createQuestion(temp);
        })
}

//Create Question - How user progresses within the game
function createQuestion(data) {
    const el = pageEles(output, 'div', '', 'question');

    if (data.q.length == 0) {
        message.innerHTML = `<h1>Game Over</h1><div>${game.score} correct out of ${data.total} questions.</div>`;
    } else {
        const tBtn = pageEles(el, 'button', 'Next', 'next');
        tBtn.onclick = () => {
            el.remove();
            createQuestion(data);
        }
        const question = data.q.shift();
        data.counter++;
        message.textContent = `Question${data.counter} of ${data.total}`;
        if (data.q.length == 0) {
            tBtn.textContent = 'End Game';
        }
        tBtn.style.display = 'none';
        outputQuestion(question, el, tBtn);
    }

}

//Outputs content of the question
function outputQuestion(question, parent, tBtn) {
    console.log(question);
    const que = pageEles(parent, 'div', `${question.question}?`, 'question');
    const quote = question.quote;

    const arr = question.opt;
    arr.push(question.answer);
    arr.sort(() => {
        return Math.random() - 0.5;
    })
    const btns = pageEles(parent, 'div', '', 'opts');
    arr.forEach(e => {
        const optemp = pageEles(btns, 'button', e, 'btns');
        optemp.onclick = () => {
            if (question.answer == e) {
                message.textContent = 'Correct';
                game.score++;

            } else {
                message.textContent = 'Incorrect';
            }
            const temps = parent.querySelectorAll('.btns');
            temps.forEach(el => {
                el.disabled = true;
                const bgc = (question.answer == el.textContent) ? 'green' : 'red';
                el.style.backgroundColor = bgc;
            })
            tBtn.style.display = 'block';
            parent.append(tBtn);

        }
    })
    console.log(arr);
}

//Creates Elements for the Web Page
//Parameters: parent element, type, HTML, and class content
function pageEles(parent, t, html, c) {
    const ele = document.createElement(t);
    ele.innerHTML = html;
    ele.classList.add(c);
    return parent.appendChild(ele);
}