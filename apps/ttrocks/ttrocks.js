(() => {

    // place your const, vars, functions or classes here
    const leftButton = BTN4;
    const rightButton = BTN5;
  
    const getRandomNumber = (max) => Math.floor(Math.random()*max)+1;
    const getRandomSide = () => getRandomNumber(2);
    const totalQuestions = 20;

    let answers = 0;
    let correctAnswers = 0;
    let leftSideIsCorrect = false;

    function main() {
        // press the middle button to start the game
        E.showMessage('Press the middle button to start');
        startGame();
    }

    function showScore() {
        let message;
        if (correctAnswers === totalQuestions) {
            message = "You're a god!";
        }
        else if (correctAnswers > 17) {
            message = "You're a legend!";
        }
        else if (correctAnswers > 14) {
            message = "You're a rock star!";
        }
        else if (correctAnswers > 10) {
            message = "You're good!";
        }
        else {
            message = "You suck!";
        }
        E.showMessage(`Score ${correctAnswers}/${totalQuestions}\n\n${message}`);
    }
    
    function showRandomQuestion() {
        g.clear();
        const a = getRandomNumber(12);
        const b = getRandomNumber(12);
        const correctResult = a*b;
        let incorrectResult = Math.abs((a+1)*(b-2));
        if (incorrectResult === correctResult || incorrectResult === 0) incorrectResult++;
        leftSideIsCorrect = getRandomSide() === 1;
        if (leftSideIsCorrect) {
            E.showMessage(`${a} x ${b}\n\n\n${correctResult}    ${incorrectResult}`);
        }
        else {
            E.showMessage(`${a} x ${b}\n\n\n${incorrectResult}    ${correctResult}`);
        }
        checkAnswer();
    }

    function nextQuestion() {
        if (answers < totalQuestions) showRandomQuestion();
        else showScore();
    }

    function checkAnswer() {
        setWatch(() => {
            g.clear();
            if (leftSideIsCorrect) {
                E.showMessage('Correct!!');
                Bangle.buzz();
                correctAnswers++;
            }
            else {
                E.showMessage('Wrong Answer');
                Bangle.beep();
            }
            answers++;
            setTimeout(nextQuestion, 600);
        }, leftButton);
        setWatch(() => {
            g.clear();
            if (!leftSideIsCorrect) {
                E.showMessage('Correct!!');
                Bangle.buzz();
                correctAnswers++;
            }
            else {
                E.showMessage('Wrong Answer');
                Bangle.beep();
            }
            answers++;
            setTimeout(nextQuestion, 600);
        }, rightButton);
    }

    function startGame() {
        setWatch(() => {
            g.clear();
            answers = 0;
            correctAnswers = 0;
            showRandomQuestion();
        }, BTN2, { repeat:true });
    }
  
    // special function to handle display switch on
    Bangle.on('lcdPower', (on) => {
        if (on) {
        	// drawWidgets();
            // call your app function here
            main();
    }});

    g.clear();
    // call your app function here 

})();
