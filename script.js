document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('input');
    const output = document.getElementById('output');
    const submitBtn = document.getElementById('submit-btn');

    const addMessage = (message, sender) => {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        output.appendChild(messageElement);
        output.scrollTop = output.scrollHeight; // Auto scroll to the bottom
    };

    const showLoading = () => {
        const loadingElement = document.createElement('p');
        loadingElement.id = 'loading';
        loadingElement.innerHTML = '<strong>Bot:</strong> <em>Loading...</em>';
        output.appendChild(loadingElement);
        output.scrollTop = output.scrollHeight; // Auto scroll to the bottom
    };

    const hideLoading = () => {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            output.removeChild(loadingElement);
        }
    };

    submitBtn.addEventListener('click', function() {
        const question = inputField.value.trim();
        if (question === '') return;

        addMessage(question, 'You'); // Show user's question immediately
        showLoading(); // Show progress indicator

        const url = 'https://z1zrd9h2f2.execute-api.us-east-1.amazonaws.com/prod/Ask' 
        const data = { question: question };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            hideLoading(); // Hide progress indicator
            let answer = data.body.replace(/\\n/g, ' ').trim(); // Replace literal "\n" with space and trim spaces
            addMessage(answer, 'Bot');
            inputField.value = ''; // Clear input field
        })
        .catch(error => {
            console.error('Error:', error);
            hideLoading(); // Hide progress indicator
            addMessage('Unable to Generate Response at this Time.', 'Error');
        });
    });

    inputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
});

