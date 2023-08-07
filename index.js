const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const clientBtn = document.querySelector(".client-btn");
const advisorBtn = document.querySelector(".advisor-btn");
const clientForm = document.querySelector(".client-form");
const advisorForm = document.querySelector(".advisor-form")
const headerChat = document.querySelector("header h2");
const InputChat = document.querySelector(".chatbot .chat-input");
const incomingChat = document.querySelector(".chatbox .incoming span");
const pChat = document.querySelector(".chatbox .chat p");
const spanChat = document.querySelector(".chatbot header span");
const formclientBtn = document.querySelector(".buton");
const formadvisorBtn = document.querySelector(".buton2");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; // Variable to store user's message

const showClientForm = () => {
    clientForm.style.display = "block";
    document.querySelector(".buttons").classList.add("hidden");
    document.querySelector(".text").classList.add("hidden");
};

clientBtn.addEventListener("click", showClientForm)
clientForm.addEventListener("submit", function (event) {
    event.preventDefault()
});

const showAdvisorForm = () => {
    advisorForm.style.display = "block";
    document.querySelector(".buttons").classList.add("hidden");
    document.querySelector(".text").classList.add("hidden");
};

advisorBtn.addEventListener("click", showAdvisorForm)
advisorForm.addEventListener("submit", function (event) {
    event.preventDefault()
});

const showChatBot = () => {
    headerChat.style.display = "block";
    spanChat.style.display = "block";
    pChat.style.display = "block";
    clientForm.style.display = "none";
    advisorForm.style.display = "none";
    InputChat.style.display = "flex"
};

formclientBtn.addEventListener("click", showChatBot);
formadvisorBtn.addEventListener("click", showChatBot);
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat2", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}


const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;
    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Simulate a response from the bot based on user's input
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        const incomingChatLi = createChatLi(botResponse, "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// Function to get a bot response based on user's input
const getBotResponse = (userMessage) => {
    // Replace this logic with your own FAQs and response generation
    // Example: If userMessage is "What is your name?", return "My name is ChatBot."
    // You can define an object or array with questions and their corresponding answers.
    const faqs = {
        "What is your name?": "Hi, My name is Kira.",
        "Connect me with a advisor": "Connecting with an advisor...",
        "How can I contact support?": "You can contact support by emailing support@example.com.",
        // Add more FAQs and responses here
    };

    // Check if user's message is a known question
    if (faqs.hasOwnProperty(userMessage)) {
        return faqs[userMessage];
    } else {
        return "I'm sorry, I don't have an answer for that question.";
    }
};
