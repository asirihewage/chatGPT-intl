import ChatGPTIntl from './index.js';
import dotenv from "dotenv";
dotenv.config();

const text = "ChatGPT ගැන කියන්න"
const openAiKey = process.env.openAiKey
const lang = 'si';
const opts = {
    model: "text-davinci-003",
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.1,
    presence_penalty: 0.6
};


ChatGPTIntl(text, openAiKey, opts, lang).then((res) => {
    console.log("Demo result", res);
}).catch((er)=> {
    console.log("Demo error", er);
});