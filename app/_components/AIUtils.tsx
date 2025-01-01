export const AIUtils = {
    extractPlainJSON:(geminiResponse:string) => {
        // Remove the backticks and "json" label from the response
        const jsonString = geminiResponse.replace(/```json\n?|```/g, '');
      
        // Remove any unnecessary escape sequences or extra characters
        const cleanedJSONString = jsonString.replace(/\\n/g, '').replace(/\s{2,}/g, ' ');
      
        try {
          // Parse the cleaned JSON string and return the object
          return JSON.parse(cleanedJSONString);
        } catch (error) {
          console.error('Failed to parse JSON:', error);
          return null;
        }
      }
}