import axios from 'axios'; 

class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    async parse(message) {
        console.log("Message received:", message);

        const lowercase = message.toLowerCase();

        if (lowercase.includes("hello neobot") || lowercase.includes("hi") || lowercase.includes("greetings") || lowercase.includes("hello")) {
            this.actionProvider.helloWorldHandler();
        } else if (lowercase.includes("apply for vendor financing") || lowercase.includes("tell me about vendor financing")) {
            this.actionProvider.applyForVendorFinancingHandler();
        } else if (lowercase.includes("check financing status")) {
            this.actionProvider.checkFinancingStatusHandler();
        } else if (lowercase.includes("view repayment schedule")) {
            this.actionProvider.viewRepaymentScheduleHandler();
        } else if (lowercase.includes("get help with financing")) {
            this.actionProvider.getHelpWithFinancingHandler();
        } else if (lowercase.includes("payment reminder")) {
            this.actionProvider.paymentReminderHandler();
        } else if (lowercase.includes("upload documents")) {
            this.actionProvider.uploadDocumentsHandler();
        } else if (lowercase.includes("match with vendors or buyers")) {
            this.actionProvider.matchWithVendorsOrBuyersHandler();
        } else if (lowercase.includes("gandu") || lowercase.includes("dalle") || lowercase.includes("teri maa ki chut") || lowercase.includes("bhosdike") || lowercase.includes("maadarchod") || lowercase.includes("lodu") || lowercase.includes("teri gand faad dunga")){
            this.actionProvider.matchWithVendorsOrBuyers();
        } else {
            console.log("No match found. Querying Google Gemini API...");
            await this.queryGoogleGeminiAPI(message);
        }
    }

    async queryGoogleGeminiAPI(message) {
        try {
            console.log('Querying Google Gemini API with message:', message);
    
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBTWECFYBl-2Q_k3cINGIlKfu9BH6m3PQI',
                {
                    "contents": [
                        {
                            "role": "user",
                            "parts": [
                                {
                                    "text": message
                                }
                            ]
                        }
                    ],
                    "generationConfig": {
                        "temperature": 1,
                        "topK": 64,
                        "topP": 0.95,
                        "maxOutputTokens": 8192,
                        "responseMimeType": "text/plain"
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            console.log('Google Gemini API response:', response.data);
    
            
            if (response.data && response.data.candidates && response.data.candidates.length > 0) {
                const content = response.data.candidates[0].content;
                if (content && content.parts && content.parts.length > 0) {
                    const topCandidateText = content.parts[0].text; 
                    const messageResponse = this.createChatBotMessage(topCandidateText);
                    this.setChatbotState(messageResponse);
                } else {
                    console.warn('No text parts found in Google Gemini API response. Invoking default handler.');
                    this.actionProvider.defaultHandler();
                }
            } else {
                console.warn('No candidates found in Google Gemini API response. Invoking default handler.');
                this.actionProvider.defaultHandler();
            }
        } catch (error) {
            console.error('Error querying Google Gemini API:', error);
            this.actionProvider.defaultHandler(); 
        }
    }

    createChatBotMessage(text) {
        return this.actionProvider.createChatBotMessage(text);
    }

    setChatbotState(message) {
        this.actionProvider.setChatbotState(message);
    }
}

export default MessageParser;
