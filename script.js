import {station} from './station/station.js';

const STATION_NAME = ['Станция Считалка', 'Станция Задачкина', 'Станция Архитектурная', 'Станция Ребусная', 'Станция Заморочки из бочки'];
const STATION_TEXT = ['Добро пожаловать на Станцию Считалку! Вам нужно быстро отвечать на вопросы. За каждый правильный  ответ команда получает по 1 баллу. На выполнение всех заданий вам дается 10 минут. Вы готовы?',
    'Добро пожаловать на Станцию Задачкину. На данном этапе надо решить задачи. За каждое правильное решенное выражения вы получаете по 3 балла. На выполнение вам дается 7 минут.',
    'Вы прибыли на станцию Архитектурную. У бабушки Кати есть собака Тузик. Необходимо перемащая цветные геометрические фигуры собрать собачий домик по его тени. На выполнение задания у вас 5 минут. За выполнение этого задания вы получите 10 баллов',
    'Станция Ребусная. Нужно решить математические ребусы. За каждый ответ  2 балла. У вас есть 10 минут',
    'Станция Заморочки из бочки. Вас ждут математические загадки. За каждый ответ 1 балл. У вас есть 5 минут.'];
const STATION_BTN_NAME = 'Приступить к заданию'
const STATION_COUNT = 5;

const ANSWER = [];
const ANSWER_SUM = [];
let answerStation = [];

let stationNumber = 0;
let taskNumber = 0;
let firstScreen = true;
let timeinterval;
const stationName = document.querySelector('h2');
const mainHeader = document.querySelector('h1');
const taskElement = document.getElementById('task');
const finalResultElement = document.getElementById('finalResult');
const questionElement = document.getElementById('question');
const startBtn = document.getElementById('start');

function changeStation() {
    stationName.style.opacity = '0';
    questionElement.style.opacity = '0';
    startBtn.style.opacity = '0';
    questionElement.style.display = 'block';
    startBtn.style.display = 'block';

    /*if (stationNumber === 2) {
        taskElement.style.display = 'none';
        taskElement.style.opacity = '0';
        questionElement.style.display = 'none';
        questionElement.style.opacity = '0';
        startBtn.style.display = 'none';
        startBtn.style.opacity = '0';
        drawKonva();
        return
        stationNumber += 1;
    }*/

    setTimeout(() => {
        if (stationNumber >= STATION_COUNT) {
            stationName.innerText = '';
            questionElement.innerText = 'Поздравляем! Вы успешно справились со всеми заданиями!';
            startBtn.innerText = 'Посмотреть результаты';
        } else {
            stationName.innerText = STATION_NAME[stationNumber];
            questionElement.innerText = STATION_TEXT[stationNumber];
            startBtn.innerText = STATION_BTN_NAME;
        }
        firstScreen = false;

        stationName.style.opacity = '1';
        questionElement.style.opacity = '1';
        startBtn.style.opacity = '1';
    },200);
}

startBtn.addEventListener('click', () => {
    if (firstScreen) {
        if (!stationName) {
            return;
        }

        startBtn.style.opacity = '0';

        if (stationNumber === 0) {
            stationName.style.display = 'block';

            if (mainHeader) {
                mainHeader.style.display = 'none';
            }
        }

        changeStation();
    } else {
        startBtn.style.opacity = '0';
        startBtn.style.display = 'none';

        if (stationNumber >= STATION_COUNT) {
            taskElement.style.display = 'none';
            taskElement.style.opacity = '0';

            const stationResultElement = document.getElementById('stationResult');
            let sum = 0;
            ANSWER_SUM.forEach(result => {
                const newNode = document.createElement('div');
                newNode.innerHTML = result;
                stationResultElement.appendChild(newNode);
                sum += result;
            });

            const newNode = document.createElement('div');
            newNode.innerHTML = sum;
            stationResultElement.appendChild(newNode);

            finalResultElement.style.display = 'flex';
            finalResultElement.style.opacity = '1';
        } else {
            startTask();
        }
    }
});

function hideAnswer() {
    const answerElements = Array.from(document.querySelectorAll('.answer'));
    answerElements.forEach(answer => {
        answer.style.display = 'none';
        answer.style.opacity = '0';
    });
}

function startTask() {
    const answerDayElement = document.getElementById('answerDay');
    const answerNumberElement = document.getElementById('answerNumber');
    const answerTextElement = document.getElementById('answerText');
    const answerMoneyElement = document.getElementById('answerMoney');
    const answerBooleanElement = document.getElementById('answerBoolean');
    const questionImg = document.getElementById(`questionImg`);

    if (taskNumber === 0) {
        taskElement.style.display = 'block';
        taskElement.style.opacity = '1';
    }

    if (taskNumber >= station[stationNumber].length) {
        questionImg.style.display = 'none';
        questionImg.style.opacity = '0';
        stopStation();
        return;
    }


    if (stationNumber === 0) {
        if (taskNumber === 0) {
            answerDayElement.style.display = 'block';
            answerDayElement.style.opacity = '1';
            setTimer(10);
        } else if (taskNumber === 6) {
            hideAnswer();

            answerNumberElement.style.display = 'block';
            answerNumberElement.style.opacity = '1';
        }
    } else if (stationNumber === 1) {
        if (taskNumber === 0) {
            answerMoneyElement.style.display = 'block';
            answerMoneyElement.style.opacity = '1';
            setTimer(7);
        } else if (taskNumber === 1) {
            hideAnswer();

            answerBooleanElement.style.display = 'block';
            answerBooleanElement.style.opacity = '1';
        } else if (taskNumber === 2) {
            hideAnswer();

            answerNumberElement.style.display = 'block';
            answerNumberElement.style.opacity = '1';
        }
    } else if (stationNumber === 2) {
        taskElement.style.display = 'none';
        taskElement.style.opacity = '0';
        questionElement.style.display = 'none';
        questionElement.style.opacity = '0';
        startBtn.style.display = 'none';
        startBtn.style.opacity = '0';

        setTimer(5);
        drawKonva();
    } else if (stationNumber === 3) {

        if (taskNumber === 0) {
            questionImg.style.display = 'block';
            questionImg.style.opacity = '1';

            answerTextElement.style.display = 'block';
            answerTextElement.style.opacity = '1';

            setTimer(10);
        }

        questionImg.src = station[stationNumber][taskNumber].question;
    } else if (stationNumber === 4) {
        if (taskNumber === 0) {
            setTimer(7);
        }

        hideAnswer();

        if (taskNumber === 1 || taskNumber === 2 || taskNumber === 7) {
            answerNumberElement.style.display = 'block';
            answerNumberElement.style.opacity = '1';
        } else {
            answerTextElement.style.display = 'block';
            answerTextElement.style.opacity = '1';
        }

        questionImg.src = station[stationNumber][taskNumber].question;
    }

    if (stationNumber !== 2 && stationNumber !== 3)  {
        questionElement.style.display = 'block';
        questionElement.style.opacity = '1';

        questionElement.innerText = station[stationNumber][taskNumber].question;
    } else {
        questionElement.style.display = 'none';
        questionElement.style.opacity = '0';
    }
}

const answerDayBtns = Array.from(document.querySelectorAll('#answerDay .button'));
const answerBooleanBtns = Array.from(document.querySelectorAll('#answerBoolean .button'));
const answerNumberBtn = document.getElementById('answerNumberBtn');
const answerTextBtn = document.getElementById('answerTextBtn');
const answerMoneyBtn = document.getElementById('answerMoneyBtn');

answerDayBtns.forEach(answerBtn => {
    answerBtn.addEventListener('click', () => {
        checkAnswer(answerBtn.value);
    });
});

answerBooleanBtns.forEach(answerBtn => {
    answerBtn.addEventListener('click', () => {
        checkAnswer(answerBtn.value);
    });
});

answerNumberBtn.addEventListener('click', () => {
    const answerInput = answerNumberBtn.parentElement.querySelector('input');
    const userAnswer = answerInput?.value;
    checkAnswer(userAnswer);
    answerInput.value = '';
});

answerTextBtn.addEventListener('click', () => {
    const answerInput = answerTextBtn.parentElement.querySelector('input');
    const userAnswer = answerInput?.value?.toLowerCase();
    checkAnswer(userAnswer);
    answerInput.value = '';
});

answerMoneyBtn.addEventListener('click', () => {
    const answerInputs = answerMoneyBtn.parentElement.querySelectorAll('input');
    const userAnswer = `${answerInputs[0].value}.${answerInputs[1].value}`;
    checkAnswer(userAnswer);
});

function checkAnswer(userAnswer) {
   const correctAnswer = station[stationNumber][taskNumber].answer;
   const resultElement = document.getElementById('result');
   let point = 1;

   if (stationNumber === 1) {
       point = 3;
   } else if (stationNumber === 2) {
       point = 10;
   } else if (stationNumber === 3) {
       point = 2;
   }

    if (userAnswer === correctAnswer) {
        resultElement.textContent = 'Правильно!';
        resultElement.style.color = 'green';
        answerStation.push(point);
    } else {
        resultElement.textContent = 'Ответ неверный!';
        resultElement.style.color = 'red';
        answerStation.push(0);
    }

    resultElement.style.display = 'flex';
    resultElement.style.opacity = '1';

    setTimeout(() => {
        resultElement.style.opacity = '0';
        taskNumber += 1;
        startTask();

        setTimeout(() => {
            resultElement.style.display = 'none';
        },100);
    },1000);
}

function setTimer(minutesRemaining) {
    const clock = document.getElementById('countdown');
    const minutesSpan = clock.querySelector(".minutes");
    const secondsSpan = clock.querySelector(".seconds");
    let secondsRemaining = 0;

    updateClock();
    timeinterval = setInterval(updateClock, 1000);

    function updateClock() {
        if (minutesRemaining === 0 && secondsRemaining === 0) {
            clearInterval(timeinterval);
            stopStation(true);
            return;
        }

        if (secondsRemaining === 0) {
            secondsRemaining = 59;
            minutesRemaining -= 1;
        } else {
            secondsRemaining -= 1;
        }

        clock.style.display = 'flex';
        minutesSpan.innerHTML = minutesRemaining;
        secondsSpan.innerHTML = secondsRemaining;
    }
}

function stopStation(endTime = false) {
    const clock = document.getElementById('countdown');

    clearInterval(timeinterval);

    if (stationNumber === 2) {
        const konvaContainer = document.getElementById('konva-container');

        clock.style.display = 'none';
        konvaContainer.style.display = 'none';
    }

    hideAnswer();

    questionElement.style.opacity = '0';
    startBtn.style.opacity = '0';

    ANSWER.push(answerStation);
    const sum = answerStation.reduce((a, b) => {
        return a + b;
    }, 0);
    ANSWER_SUM.push(sum);
    answerStation = [];
    console.log(ANSWER)
    startBtn.style.display = 'block';
    questionElement.style.display = 'block';

    setTimeout(() => {
        let innerText = `Вы заработали ${sum} балл`;

        if (5 < sum > 1 ) {
            innerText += 'а';
        } else if (sum > 4  || sum === 0) {
            innerText += 'ов';
        }

        innerText = endTime ? 'Время вышло! ' + innerText :'Поздравляем!  ' + innerText ;
        questionElement.innerText = innerText;
        startBtn.innerText = 'Следующая станция';
        firstScreen = true;

        questionElement.style.opacity = '1';
        startBtn.style.opacity = '1';

        stationNumber += 1;
        taskNumber = 0;
    },200);
}

function drawKonva() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    function loadImages(sources, callback) {
        var assetDir = '/assets/';
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            images[src] = new Image();
            images[src].onload = function () {
                if (++loadedImages >= numImages) {
                    callback(images);
                }
            };
            images[src].src = assetDir + sources[src];
        }
    }
    function isNearOutline(animal, outline) {
        var a = animal;
        var o = outline;
        var ax = a.x();
        var ay = a.y();

        if (ax > o.x - 20 && ax < o.x + 20 && ay > o.y - 20 && ay < o.y + 20) {
            return true;
        } else {
            return false;
        }
    }

    function initStage(images) {
        var stage = new Konva.Stage({
            container: 'konva-container',
            width: 400,
            height: 300,
        });
        var animalLayer = new Konva.Layer();
        var animalShapes = [];
        var score = 0;

        // image positions
        var animals = {
            snake: { //4 55*97
                x: 20,
                y: 20,
            },
            giraffe: { //3 104*50
                x: 250,
                y: 180,
            },
            monkey: { // 1 151*77
                x: 220,
                y: 40,
            },
            lion: { //2 97*97
                x: 100,
                y: 20
            },
            cat: { //5 49*48
                x: 250,
                y: 250,
            },
        };

        var outlines = {
            snake_black: { //4 55*97
                x: 20,
                y: 203,
            },
            giraffe_black: { //3 104*50
                x: 20,
                y: 203,
            },
            monkey_black: { // 1 151*77
                x: 20,
                y: 129,
            },
            lion_black: { //2 97*97
                x: 75,
                y: 204,
            },
            cat_black: { //5 49*48
                x: 122,
                y: 250,
            },
        };

        // create draggable animals
        for (var key in animals) {
            // anonymous function to induce scope
            (function () {
                var privKey = key;
                var anim = animals[key];

                var animal = new Konva.Image({
                    image: images[key],
                    x: anim.x,
                    y: anim.y,
                    draggable: true,
                });

                animal.on('dragstart', function () {
                    this.moveToTop();
                });
                /*
                 * check if animal is in the right spot and
                 * snap into place if it is
                 */
                animal.on('dragend', function () {
                    var outline = outlines[privKey + '_black'];
                    if (!animal.inRightPlace && isNearOutline(animal, outline)) {
                        animal.position({
                            x: outline.x,
                            y: outline.y,
                        });
                        animal.inRightPlace = true;

                        if (++score >= 5) {
                            console.log('!!!!!!!!!!!!')
                            checkAnswer('true');
                        }

                        // disable drag and drop
                        setTimeout(function () {
                            animal.draggable(false);
                        }, 50);
                    }
                });
                // make animal glow on mouseover
                animal.on('mouseover', function () {
                    animal.image(images[privKey + '_glow']);
                    document.body.style.cursor = 'pointer';
                });
                // return animal on mouseout
                animal.on('mouseout', function () {
                    animal.image(images[privKey]);
                    document.body.style.cursor = 'default';
                });

                animal.on('dragmove', function () {
                    document.body.style.cursor = 'pointer';
                });

                animalLayer.add(animal);
                animalShapes.push(animal);
            })();
        }

        // create animal outlines
        for (var key in outlines) {
            // anonymous function to induce scope
            (function () {
                var imageObj = images[key];
                var out = outlines[key];

                var outline = new Konva.Image({
                    image: imageObj,
                    x: out.x,
                    y: out.y,
                });

                animalLayer.add(outline);
            })();
        }

        stage.add(animalLayer);
    }

    var sources = {
        snake: '4.png',
        snake_glow: '4-glow.png',
        snake_black: '4-black.png',
        lion: '2.png',
        lion_glow: '2-glow.png',
        lion_black: '2-black.png',
        monkey: '1.png',
        monkey_glow: '1-glow.png',
        monkey_black: '1-black.png',
        giraffe: '3.png',
        giraffe_glow: '3-glow.png',
        giraffe_black: '3-black.png',
        cat: '5.png',
        cat_glow: '5-glow.png',
        cat_black: '5-black.png',
    };
    loadImages(sources, initStage);
}