'use client';

import React from 'react';
import { useState } from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { AIUtils } from '../_components/AIUtils';


type AIResponse = any; /*{
  pros: string;
  cons: string;
};*/

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState<any>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=> {
    setInputText(event.target.value);
    console.log('change');
  };

  /*
  const handleTranslate = async () => {
    console.log('trans');
    try {
      const response = await fetch(
        'https://api.gemini.google.com/v1/completions', // Replace with actual Gemini API endpoint
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GEMINI_API_KEY}`, // Assuming API key is stored in env variable
          },
          body: JSON.stringify({
            prompt: `Translate this text: ${inputText}`,
            // Other parameters for the Gemini API request (model, temperature, etc.)
          }),
        }
      );
  
      const data = await response.json();
      setTranslatedText(data.choices[0].text); // Assuming Gemini response structure
    } catch (error) {
      console.error('Error translating text with Gemini:', error);
      // Handle error, e.g., display an error message to the user
    }
  };*/

  const [result, setResult] = React.useState<AIResponse | null>(null);
  const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

  const handleTranslate = async () => {
    let promptText = `translate text to Russian (from here to the words '/end of the text/'): ${inputText} /end of the text/,  Return the result in json format. If word has few meanings give all of them in the array . 
    Example of request: "to get", the response should be: {"original": "to get", "translated": ["получить", "доставать"]} .  .
        objects type shoul be: 
        {
            original: string,
            translated: string[]
        }`;
        

    //, assume all employess are russian with good knowledge.
    // if citizenship == Россия

    let contents = [
      {
        role: "user",
        parts: [
          {
            text: promptText,
          },
        ],
      },
    ];


    const genAI = new GoogleGenerativeAI( key );
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // or gemini-1.5-pro
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    const result = await model.generateContent({ contents });
    console.log(result); // Inspect the response structure
    //let story = String(result.content || result.content.parts[0].text); // Assuming story is in 'content' property
    let story = String(
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "",
    );
    //setResult(AIUtils.extractPlainJSON(story));
    setTranslatedText(AIUtils.extractPlainJSON(story));
  }
  

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        {key}
        <textarea
          className="w-full  p-2 border border-gray-300 rounded text-gray-600"
          placeholder="Enter text to translate"
          value={inputText}
          onChange={handleInputChange}
        />
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleTranslate}
      >
        Translate
      </button>
      </div>
      <div>
        <div className="p-2 border border-gray-300 rounded">
          {translatedText.translated?.map((item: string, index:number) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
