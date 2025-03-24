let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Initialize a variable to hold the available voices
let voices = [];

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US"; // Set language to English (US)

    // Select the first female voice available or a default one
    let femaleVoice = voices.find(voice => voice.name === "Google UK English Female" || voice.name === "Microsoft Zira Desktop - English (United States)");

    if (femaleVoice) {
        text_speak.voice = femaleVoice;
        console.log("Female voice selected:", femaleVoice.name);
    } else {
        console.log("No female voice found. Using default voice.");
        text_speak.voice = voices[0]; // Fallback to the first available voice
    }

    // Log to confirm the speak function is called
    console.log("About to speak:", text);

    // Start speech synthesis
    window.speechSynthesis.speak(text_speak);

    // Ensure speech synthesis is queued
    console.log("Speech synthesis started.");

    // Hide the voice GIF once the speaking is done
    text_speak.onend = () => {
        console.log("Speech synthesis ended.");

    }
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon sir");
    } else {
        speak("Good evening sir");
    }
}

window.addEventListener('load', () => {
    // Ensure voices are loaded before attempting to use them
    window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        wishMe();  // Call wishMe after voices are loaded
    };
});

// Ensure proper initialization for speech recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (speechRecognition) {
    let recognition = new speechRecognition();

    // Set language for speech recognition to English (US)
    recognition.lang = 'en-US';  // Change to English language for recognition
    recognition.continuous = false; // Stop after a single result (set to true for continuous speech)
    recognition.interimResults = false; // No intermediate results, just final ones

    recognition.onstart = () => {
        // Show the voice GIF when speech recognition starts (when user is speaking)
        voice.style.display = "block";
        btn.style.display = "none";

    };

    recognition.onresult = (event) => {
        let transcript = event.results[event.resultIndex][0].transcript;
        content.innerText = transcript; // Display the recognized speech in English
        console.log("Recognized Speech: ", transcript); // Log the recognized speech
        takeCommand(transcript.toLowerCase()); // Pass the transcript to takeCommand function
    };

    recognition.onerror = (event) => {
        console.error("Speech Recognition Error: ", event.error); // Log errors if any
    };

    btn.addEventListener("click", () => {
        console.log("Starting recognition...");
        recognition.start(); // Start speech recognition on button click

    });
} else {
    console.erroar("Speech Recognition API is not supported in this browser.");
}

function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"
    console.log("Checking message:", message); // Log recognized message

    // Check if the recognized message contains the word "Hello"
    if (message.toLowerCase().includes("hello")) {
        console.log("Hello command recognized, speaking response...");
        speak("Hello sir, what can I do for you?");
    }
    // Check if the recognized message contains the words "How are you"
    else if (message.toLowerCase().includes("who are you")) {
        console.log("who are you command recognized, speaking response...");
        speak("I am a virtual assistant created by Vaishnavi. How can I assist you today?");
    }
    // You can add more queries below in similar fashion
    else if (message.toLowerCase().includes("what is your name")) {
        console.log("What's your name command recognized, speaking response...");
        speak("My name is NAVI, your virtual assistant.");
     } else if (message.toLowerCase().includes("how are you")) {
            console.log("how are you command recognized, speaking response...");
            speak("I'm fine,how are you?");
        
    } else if (message.toLowerCase().includes("open youtube")) {
        console.log("Opening YouTube...");
        speak("Opening YouTube.");
        window.open("https://www.youtube.com/");
    } else if (message.toLowerCase().includes("open google")) {
        console.log("Opening Google...");
        speak("Opening Google.");
        window.open("https://www.google.com/");
    } else if (message.toLowerCase().includes("open instagram")) {
        console.log("Opening Instagram...");
        speak("Opening Instagram.");
        window.open("https://www.instagram.com/");
    } else if (message.toLowerCase().includes("open facebook")) {
        console.log("Opening Facebook...");
        speak("Opening Facebook.");
        window.open("https://www.facebook.com/");
    }
        else if(messageessage.toLowerCase().includes("open calculator")) {
            console.log("Opening calculator...");
            speak("Opening calculator.");
            window.open("calculator://");{
        }
        
    } else {
        speak(`this is what i found on internet regarding" ${message.replace("navi","")||message.replace("navy","")||message.replace("nani","")}`)
        window.open(`https://www.google.com/search?q=${message.replace("navi","")||message.replace("navy","")||message.replace("nani","")}`)
    }
}
