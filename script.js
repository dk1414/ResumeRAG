// script.js

document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('input');
    const output = document.getElementById('output');
    const submitBtn = document.getElementById('submit-btn');

    submitBtn.addEventListener('click', function() {
        const question = inputField.value.trim();
        if (question === '') return;

        const url = 'https://z1zrd9h2f2.execute-api.us-east-1.amazonaws.com/prod/Ask'; 
        const data = {
            question: question
        };

        // Make a POST request to your API
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from your API
            const answer = data.body;  // Adjust according to your API response structure
            output.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
            output.innerHTML += `<p><strong>Bot:</strong> ${answer}</p>`;
            inputField.value = '';  // Clear input field
        })
        .catch(error => {
            console.error('Error:', error);
            output.innerHTML += `<p><strong>Error:</strong> Failed to fetch response from server.</p>`;
        });
    });
});
