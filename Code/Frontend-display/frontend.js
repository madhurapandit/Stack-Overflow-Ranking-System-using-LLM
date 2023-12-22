document.getElementById('send-button').addEventListener('click', function() {
    // Clear the chat areas
    clearChatAreas();
    
    var userMessage = document.getElementById('user-input').value;
    // Show the containers
    document.getElementById('response-area').style.display = 'block';
    document.getElementById('chat').style.display = 'block';
    
    displayMessage('Question', userMessage);
    console.log('Variable x:', userMessage)

    // Send user's message to the server
    fetch('/ask_stackoverflowservice', {
        method: 'POST',
        body: JSON.stringify({ question: userMessage }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        var answer = data.answer;
        displayMessage('Answer', answer);
    });
    // Clear the input box
    document.getElementById('user-input').value = '';
});

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        // Clear the chat areas
        clearChatAreas();
        
        var userMessage = document.getElementById('user-input').value;

        document.getElementById('response-area').style.display = 'block';
        document.getElementById('chat').style.display = 'block';
        
        displayMessage('Question', userMessage);
        console.log('Variable x:', userMessage)
        
        // Send user's message to the server
    fetch('/ask_stackoverflowservice', {
        method: 'POST',
        body: JSON.stringify({ question: userMessage }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        var answer = data.answer;
        displayMessage('Answer', answer);
    });
    // Clear the input box
    document.getElementById('user-input').value = '';
    }
});

function displayMessage(sender, message) {
    if (sender==='Question'){
        var chat = document.getElementById('chat');
        var messageDiv = document.createElement('div');
        messageDiv.innerHTML = sender + ': ' + message;
        chat.appendChild(messageDiv);
    }
   else {
       var chat = document.getElementById('response-area')
       for (let i = 0; i < message.length; i++) {
        var answerDiv = document.createElement('div');
        answerDiv.innerHTML = `Answer ${i + 1}: ${message[i]}`;
        chat.appendChild(answerDiv);}
    }
}

function clearChatAreas() {
    document.getElementById('chat').innerHTML = '';
    document.getElementById('response-area').innerHTML = '';
}