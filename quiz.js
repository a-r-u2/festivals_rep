document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz');
    const festivalName = window.location.pathname.split('/').pop().replace('.html', ''); // Get the festival name from URL

    fetch('./data/festivals.json')
        .then(response => response.json())
        .then(data => {
            const festival = data.find(f => f.name.toLowerCase() === festivalName);
            if (festival && festival.quiz) {
                const quizHTML = festival.quiz.map((question, index) => {
                    return `
                        <div class="mb-3">
                            <h5>${question.question}</h5>
                            ${question.options.map(option => `
                                <div>
                                    <input type="radio" name="question-${index}" value="${option}" />
                                    <label>${option}</label>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }).join('');
                quizContainer.innerHTML = quizHTML;
            } else {
                quizContainer.innerHTML = "<p>No quiz available for this festival.</p>";
            }
        });
});
