import React, { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory , generateBotResponse}) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value="";

        //update chat histroy with user message
        setChatHistory((history) => [...history,{role: "user", text: userMessage}]);

        //adding a thinking placeholder for chatbot response
        setTimeout(()=>{
            
        setChatHistory((history) => [...history,{role: "model", text:"Thinking...."}]);

        //call the function to generate bot response
        generateBotResponse([...chatHistory,{role: "user", text: `Using the details provided above, please address this ${userMessage}`}]);

    },600);
}

    return (
        <form action="" className="chat-form" onSubmit={handleFormSubmit}>
            <input
                ref={inputRef} // Add this line to bind the inputRef to the input element
                type="text"
                placeholder="Message..."
                className="message-input"
                required
            />
            <button className="material-symbols-rounded">
                keyboard_arrow_up
            </button>
        </form>
    );
}
 
export default ChatForm;
