/* script.js */

// Array to store bugs in client memory
let bugs = [];

document.getElementById("bugForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Retrieve form values
  let bugTitle = document.getElementById("bugTitle").value;
  let bugDescription = document.getElementById("bugDescription").value;
  let bugSeverity = document.getElementById("bugSeverity").value;

  // Create a bug object
  let bug = {
    id: Date.now(),
    title: bugTitle,
    description: bugDescription,
    severity: bugSeverity,
    status: "Open"
  };

  bugs.push(bug);
  addBugToList(bug);

  // Clear form fields
  this.reset();
});

function addBugToList(bug) {
  let bugsList = document.getElementById("bugs");

  let li = document.createElement("li");
  li.innerHTML = `<strong>${bug.title}</strong> - Severity: ${bug.severity} <br>
                  ${bug.description} <br>
                  Status: ${bug.status}`;
  bugsList.appendChild(li);
}

// Chat functionality (dummy client-side)
document.getElementById("chatForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let chatInput = document.getElementById("chatInput");
  let message = chatInput.value;
  addChatMessage("User", message);

  // For demo: auto respond after 1 second
  setTimeout(() => {
    addChatMessage("Support", "Thank you for reaching out! We will get back to you shortly.");
  }, 1000);

  chatInput.value = "";
});

function addChatMessage(sender, message) {
  let chatBox = document.getElementById("chatBox");
  let messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message");
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageDiv);

  // Auto scroll to the bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}
