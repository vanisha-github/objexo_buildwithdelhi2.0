const chatbotResponses = {
  "why is object detection important in space stations": "It helps astronauts quickly locate critical tools during emergencies and ensures operational safety in confined environments",
  "which model is used in objexo":" pre-trained YOLOv5 model fine-tuned on a custom dataset of spacecraft objects is used in Objexo",
  "which programming languages or tools are used in objexo":" Python for model development, OpenCV for image processing, and HTML/CSS/JS for the front-end."

}

function handleQuestion() {
  const input = document.getElementById("user-input");
  const chat = document.getElementById("chat");
  const userQuestion = input.value.trim().toLowerCase();

  if (!userQuestion) return;

  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = "You: " + input.value;
  chat.appendChild(userMessage);

  const response = chatbotResponses[userQuestion] || "Sorry, I couldn't understand that. Try asking something else.";
  const botMessage = document.createElement("div");
  botMessage.className = "message bot";
  botMessage.textContent = "Bot: " + response;
  chat.appendChild(botMessage);

  chat.scrollTop = chat.scrollHeight;
  input.value = "";
}