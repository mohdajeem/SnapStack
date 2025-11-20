import axios from 'axios';
import Session from '../models/Session.js';

const extractJSON = (text) => {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON object found in response');
    return JSON.parse(jsonMatch[0]);
};


export const generateComponentByGemini = async ({userPrompt}) => {
    try{
        const systemPrompt = `
            You are a professional frontend React UI assistant.

            Your job is to generate a **fully functional, self-contained React component** with required **CSS styles** based on the user’s request.

            ### Output Format (strictly JSON only):
            {
            "title": "<short and descriptive title related to the component's functionality>",
            "jsx": "<!-- full React component named App with valid JSX -->",
            "css": "/* all required CSS styles */"
            }

            Guidelines:
            1. Output strictly valid JSON. No comments, markdown, explanations, or code blocks.
            2. Escape all double quotes (") correctly so it is valid JSON parsable in JavaScript.
            3. Always name the component **App** — no exceptions.
            4. The component must be complete and include:
            - All necessary **React imports** (e.g., useState, useEffect).
            - Relevant **props** if needed.
            - Internal **state management** using React hooks.
            - All **event handlers** and logic inside the component.
            - Proper structure, with interactive elements fully working (e.g., buttons, modals, toggles).
            - CSS scoped to the component, output as plain CSS (not Tailwind or CSS-in-JS).
            5. Do not assume external context — everything must be defined in the file.
            6. Make the component clean, readable, and ready to copy-paste into a live React project.
            7. The **title** should be a concise and relevant description of the component's purpose — no generic titles like "React Component".

            Now, generate a fully working React component named **App** for the following user request: ${userPrompt}
            `;

        // console.log("enterered generateComponent function");
        const response = await axios.post(
            `${process.env.GEMINI_API_URL}/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{parts: [{text : systemPrompt}]}],
                generationConfig: {
                    responseMimeType: "application/json",
                },
            },
            {
                headers: {'Content-Type': 'application/json'}
            }
        )
        const textResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
        if(!textResponse){
            throw new Error("Gemini response empty")
        } 
        // console.log("textresponse: ", textResponse);
        const code = extractJSON(textResponse);
        // console.log("code ", code);
        return code;
    } catch (err) {
        // Propagate the error so the calling controller can craft the HTTP response.
        throw new Error(`GeminiController error: ${err.message}`);
    }
}

export const refineComponentByGemini = async ({ userPrompt, currentJsx, currentCss }) => {
    const systemPrompt = `
You are an expert frontend React developer. Your task is to intelligently modify an existing React component based on a user's request.

Here is the current code:

**JSX Code ('/App.js'):**
\`\`\`jsx
${currentJsx}
\`\`\`

**CSS Code ('/styles.css'):**
\`\`\`css
${currentCss}
\`\`\`

Now, please apply the following modification: "${userPrompt}"

### IMPORTANT INSTRUCTIONS:
1.  **Return the COMPLETE, new JSX and CSS code.** Do not return only the changed lines.
2.  **Output Format (strictly JSON only):**
    {
      "jsx": "<!-- full MODIFIED React component named App -->",
      "css": "/* all MODIFIED and existing CSS styles */"
    }
3.  Ensure the output is strictly valid JSON, with all special characters and quotes properly escaped. Do not add any extra explanations, markdown, or comments outside of the JSON structure.
4.  The component must remain fully functional and self-contained.
`;

    try {
        const response = await axios.post(
            `${process.env.GEMINI_API_URL}/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: systemPrompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                },
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const textResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textResponse) {
            throw new Error("Gemini response was empty.");
        }

        const code = extractJSON(textResponse);
        return code;

    } catch (err) {
        // so the calling controller can handle the HTTP response.
        console.error("Error in refineComponentByGemini:", err.message);
        throw new Error(`Failed to refine component with AI: ${err.message}`);
    }
};
