'use client';
import React, { useEffect, useState } from 'react';

const OpenAIPage = () => {
    const [response, setResponse] = useState<string | null>(null);

    const fetchOpenAIResponse = async () => {
        const res = await fetch('/api/ai', {
            method: 'POST',
        });
        const data = await res.json();
        setResponse(data.message);
    };
    

    useEffect(() => {
        fetchOpenAIResponse();
    }, []);

    return (
        <div>
            <h1>OpenAI API Response</h1>
            <p>{response ? response : 'Loading...'}</p>
        </div>
    );
};

export default OpenAIPage;