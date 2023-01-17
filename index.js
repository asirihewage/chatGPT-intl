/**
 *
 * chatGPT-intl
 *
 * See https://github.com/asirihewage/chatGPT-intl
 */
import { Translator } from './translator.js';
import { Configuration, OpenAIApi } from 'openai';
import { isSupported } from './languages.js';

const ChatGPTIntl = async (text, openAiKey, opts, lang) => {
    opts = JSON.parse(JSON.stringify(opts));
    let errors = [
        'The language «[lang]» is not supported',
        'One or more options missing',
        'Something went wrong',
    ];

    const ChatGPT_Intl = () => {
        return new Promise(async (resolve, reject) => {
                const configuration = new Configuration({
                    apiKey: openAiKey
                });
                const translateIn = await Translator(text, { to: "en" });

                const openai = new OpenAIApi(configuration);

                const response = await openai.createCompletion({
                    model: opts.model || "text-davinci-003",
                    prompt: translateIn.text,
                    temperature: opts.temperature || 0.9,
                    max_tokens: opts.max_tokens || 150,
                    top_p: opts.top_p || 1,
                    frequency_penalty: opts.frequency_penalty || 0.0,
                    presence_penalty: opts.presence_penalty || 0.6,
                });

                const translateOut = await Translator(response.data.choices[0].text, { to: lang | "en"  });

                return translateOut.text
                    ? resolve({response: translateOut.text, query: text, lang: lang})
                    : reject({error: errors[2]});
            }
        );
    }

    if (text && openAiKey && lang && opts && opts.model && opts.temperature && opts.max_tokens && opts.top_p && opts.frequency_penalty && opts.presence_penalty) {
        if(!isSupported(lang)){
            return Promise.reject({error: errors[0].replace('[lang]', lang)});
        }else {
            return ChatGPT_Intl();
        }
    }else {
        return Promise.reject({error: errors[1], data: {opts, text , openAiKey , lang}});
    }

}

export default ChatGPTIntl;