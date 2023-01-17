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
                return await Translator(text, { to: "en" }).then( async (translateIn) => {
                    const configuration = new Configuration({
                        apiKey: openAiKey
                    });
                    const openai = new OpenAIApi(configuration);
                    return await openai.createCompletion({
                        model: opts.model.toString(),
                        prompt: translateIn.text,
                        temperature: parseFloat(opts.temperature),
                        max_tokens: parseInt(opts.max_tokens),
                        top_p: parseInt(opts.top_p),
                        frequency_penalty: parseFloat(opts.frequency_penalty),
                        presence_penalty: parseFloat(opts.presence_penalty)
                    });
                }).then( async (response) => {
                    return await Translator(response.data.choices[0].text, {to: lang})
                }).then((translateOut) => {
                    return resolve({response: translateOut.text, query: text, lang: lang});
                }).catch( er => {
                    return reject({error: er})
                });
            }
        );
    };

    if (text && openAiKey && lang && opts && opts.model && opts.temperature && opts.max_tokens && opts.top_p && opts.frequency_penalty && opts.presence_penalty) {
        if(!isSupported(lang)){
            return Promise.reject({error: errors[0].replace('[lang]', lang)});
        }else {
            return ChatGPT_Intl();
        }
    }else {
        return Promise.reject({
            error: errors[1],
            data: {
                opts: !!opts ? {
                    model: !!opts.model,
                    temperature: !!opts.temperature,
                    max_tokens: !!opts.max_tokens,
                    top_p: !!opts.top_p,
                    frequency_penalty: !!opts.frequency_penalty,
                    presence_penalty: !!opts.presence_penalty
                } : false ,
                text: !!text ,
                openAiKey : !!openAiKey ,
                lang: !!lang
            }
        });
    }

}

export default ChatGPTIntl;