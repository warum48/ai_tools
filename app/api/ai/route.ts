import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const url = 'https://api.hyperbolic.xyz/v1/chat/completions';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+process.env.NEXT_PUBLIC_HYPERBOLIC_API_KEY,
        },
        body: JSON.stringify({
            model: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
            messages: [
                {
                    role: 'user',
                    content: 'How many gifts will Santa Claus deliver on Christmas?',
                },
            ],
            max_tokens: 2048,
            temperature: 0.7,
            top_p: 0.9,
            stream: false,
        }),
    });

    const json = await response.json();

    const output = json.choices[0].message.content;
    console.log(output);

    return NextResponse.json({ message: output });
}




     /* body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V3',
        messages: [
          {
            role: 'user',
            content: 'How many gifts will Santa Claus deliver on Christmas?'
          }
        ],
        max_tokens: 512,
        temperature: 0.1,
        top_p: 0.9,
        stream: false
      }), */