# chatGPT-intl
![Version](https://img.shields.io/packagist/v/asirihewage/chatGPT-intl?label=Version)
![Package Size](https://img.shields.io/bundlephobia/min/chatGPT-intl?label=Package%20Size)
### Enhanced ChatGPT Wrapper for Internationalization - NodeJS
This NodeJS module acts as a wrapper for ChatGPT API and will help you to use ChatGPT in your own language.
![Logo](res/logo.jpg)

## Installation

Install chatgpt-intl via npm : https://www.npmjs.com/package/chatgpt-intl

```bash
  npm i chatgpt-intl
```

## Usage/Examples

```javascript
import ChatGPTIntl from 'chatgpt-intl';

const text = ""
const openAiKey = process.env.OPENAI_API_KEY
const lang = 'en';
const opts = {
    model: "text-davinci-003",
    prompt: '',
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6
};

const response = await ChatGPTIntl(text, openAiKey, opts, lang);
```


## Features

- Use ChatGPT API in your own language
- Ability to customize the chatGPT model
- Support for more than 50 language

## Limitations

- Does not support for syntax
- Does not support larger text inputs

## Authors

- [@asirihewage](https://github.com/asirihewage)


## License

[MIT](https://choosealicense.com/licenses/mit/)


