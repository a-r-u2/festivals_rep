function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const id = getQueryParam("id");

let totalQuestions = 0;
let answeredQuestions = 0;
let score = 0;

fetch("data/festivals.json")
  .then(res => res.json())
  .then(data => {
    const festival = data.find(f => f.id === id);
    if (!festival) {
      document.body.innerHTML = "<p>Festival not found.</p>";
      return;
    }

    document.getElementById("festivalTitle").textContent = festival.name + " (" + festival.state + ")";
    document.getElementById("festivalImage").src = "images/" + festival.image;

    const storyHTML = festival.story.map(item => {
      return item.replace(/<sh>(.*?)<\/sh>/g, `<div class="sh">$1</div>`);
    }).join("<p></p>");
    document.getElementById("festivalStory").innerHTML = storyHTML;

    const usesList = document.getElementById("festivalUses");
    festival.uses.forEach(use => {
      const li = document.createElement("li");
      li.innerHTML = use;
      usesList.appendChild(li);
    });

    const quizSection = document.getElementById("festivalQuiz");
    const startQuizBtn = document.createElement("button");
    startQuizBtn.className = "btn btn-warning mb-3";
    startQuizBtn.textContent = "Start Quiz";
    quizSection.appendChild(startQuizBtn);

    startQuizBtn.addEventListener("click", () => {
      startQuizBtn.style.display = "none";
      totalQuestions = festival.quiz.length;
      renderQuiz(festival.quiz, quizSection);
    });
  });

function renderQuiz(quizData, container) {
  quizData.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "quiz-block";
    questionDiv.innerHTML = `
      <p class="quiz-question">${q.question}</p>
      <ul class="quiz-options" id="options${index}">
        ${q.options.map(opt => `
          <li><label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label></li>
        `).join("")}
      </ul>
      <button class="btn-quiz" onclick="checkAnswer(${index}, '${q.answer.replace(/'/g, "\\'")}')">Submit</button>
      <div class="result" id="result${index}"></div>
    `;
    container.appendChild(questionDiv);
  });

  const scoreBox = document.createElement("div");
  scoreBox.id = "finalScore";
  scoreBox.className = "score-box mt-4";
  container.appendChild(scoreBox);
}

function checkAnswer(index, correctAnswer) {
  const options = document.getElementsByName("q" + index);
  let selected = "";
  for (let opt of options) {
    if (opt.checked) {
      selected = opt.value;
      break;
    }
  }

  const resultDiv = document.getElementById("result" + index);
  if (selected === "") {
    resultDiv.textContent = "Please select an option.";
    resultDiv.style.color = "#f57c00";
    return;
  }

  // Disable all options after submitting
  options.forEach(opt => opt.disabled = true);
  const submitBtn = options[0].closest("div").querySelector("button");
  if (submitBtn) submitBtn.disabled = true;

  if (selected === correctAnswer) {
    resultDiv.textContent = "Correct!";
    resultDiv.style.color = "green";
    score++;
  } else {
    resultDiv.textContent = `Wrong! Correct answer: ${correctAnswer}`;
    resultDiv.style.color = "red";
  }

  answeredQuestions++;
  if (answeredQuestions === totalQuestions) {
    showFinalScore();
  }
}

function showFinalScore() {
  const finalScoreBox = document.getElementById("finalScore");
  finalScoreBox.innerHTML = `
    <div class="alert alert-success">
      <h4>🎉 Quiz Completed!</h4>
      <p>Your Score: <strong>${score} / ${totalQuestions}</strong></p>
    </div>
  `;
}
