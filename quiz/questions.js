function askQuestion() {
  question = toAsk.shift();
  asked.push(question);

  mainArea().innerHTML = '';
  mainArea().innerHTML += `
    <h1>What movie is this?</h1>
    <p>Question ${asked.length} of ${toAsk.length + asked.length}</p>
    <img src="${question.target.img}" id="image">
  `;
  for (const movie of question.options) {
    mainArea().innerHTML += optionSection(movie);
  }
}


function checkAnswer(answerID) {
  let lastAsked = asked[asked.length - 1];
  lastAsked.correct = answerID == lastAsked.target.id;

  mainArea().innerHTML = '';
  mainArea().innerHTML += `
    <h1>${lastAsked.correct ? encourage() : discourage()}</h1>
    <img src="${lastAsked.target.img}" id="image">
  `;
  mainArea().innerHTML += `
    <p>This was <b>${lastAsked.target.title}</b>.</p>
    <p>${lastAsked.target.plot}</p>
  `;
  mainArea().innerHTML += toAsk.length > 0 ?
  `<button onclick="askQuestion()">Continue</button>` :
  `<button onclick="finish()">Finish & download results</button>`;
}


function optionSection(movie) {
  return `
    <hr>
    <button onclick="checkAnswer(${movie.id})">${movie.title}</button>
    <p>${movie.plot}</p>
  `;
}


function encourage() {
  let text =
    chance.pickone(['you\'re ', 'you are ', '']) +
    chance.pickone(['right', 'correct', 'great', 'amazing']) +
    chance.pickone(['', '.', '!']);
  return text[0].toUpperCase() + text.slice(1);
}


function discourage() {
  let text = chance.pickone(['wrong', 'incorrect', 'whoopsie!', 'uh oh'])
  return text[0].toUpperCase() + text.slice(1);
}


mainArea = () => document.getElementById('main');
