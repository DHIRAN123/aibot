import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./components/BotAvatar";
import React from 'react'

const config={
    initialMessages:[createChatBotMessage('Hi! Welcome to Altaneo Please describe your query below so we can help you.')],
    botName:"Neobot",
    customComponent:{
        BotAvatar:(props) => <BotAvatar {...props} />
    },
    customStyles:{
        botMessageBox:{
            backgroundColor:"light blue",
        },
        chatButton:{
            backgroundColor:"light Blue",
        },
    }
}

export default config