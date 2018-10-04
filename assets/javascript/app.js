var panel = $('#quiz-area');
var startNumber = 30;

var questions = [{
    question: "When were the events Pearl Harbor that started the US involvemnt in WW2?",
    answers: ["12/7/1945", "3/4/1939", "5/12/1948", "12/7/1941"],
    correctAnswer: "12/7/1941",
},{
    question: "Who was the president during the civil war?",
    answers: ["Abraham Lincoln", "George Washington", "George Bush", "Ronald Reagan"],
    correctAnswer: "Abraham Lincoln",
},{
    question: "What band sparked the youth rock culture in the 1960s?",
    answers: ["Led Zeppellin", "The Beatles", "Elvis Presly", "The Rolling Stones"],
    correctAnswer: "The Beatles",
},{
    question: "What soccer player won Brazil the World Cup in the 1960s and 1970s?",
    answers: ["Neymar", "Messi", "Ronaldo", "Pele"],
    correctAnswer: "Pele",
},{
    question:"Who has been called the greatest basketplayer of all time?",
    answers: ["Allen Iverson", "Shaq", "Kobe Bryant", "Michael Jordan"],
    correctAnswer: "Michael Jordan",
},{
    question:"When was the National Anthem written",
    answers: ["1766", "1812", "1900", "1865"],
    correctAnswer: "1812",
},{
    question:"What war was known as the Great War?",
    answers: ["World War Two", "The Vietnam War", "World War One", "The Civil War"],
    correctAnswer: "World War One",
},{
    question:"When did Neil Armstrong land on the moon?",
    answers: ["1965", "1972", "1980", "1969"],
    correctAnswer: "1969",

}];


var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: startNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("Out of Time");
      game.timeUp();
    }
  },
  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },
  nextQuestion: function() {
    game.counter = startNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>Correct Answer: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion] + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {

    clearInterval(timer);
    panel.html("<h2>Your Results</h2>");

    $("#counter-number").text(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;
    clearInterval(timer);
    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion] + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);
    game.correct++;
    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion] + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = startNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

$(document).on("click", "#start-over", function() {
    game.reset();
  });
  
  $(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
  });
  
  $(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
    game.loadQuestion();
  });