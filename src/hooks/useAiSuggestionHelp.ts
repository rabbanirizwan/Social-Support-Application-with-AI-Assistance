import { useMutation } from "@tanstack/react-query";
const apiKey = import.meta.env.VITE_API_KEY;

const useAiSuggestionHelp = () => {
  return useMutation({
    mutationFn: async ({
      label,
      prompt,
    }: {
      label: string;
      prompt: string;
    }) => {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a friendly writing assistant. Always give polite and helpful suggestions.",
              },
              {
                role: "user",
                content: label + prompt || "",
              },
            ],
            max_tokens: 200,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();

      return data.choices?.[0]?.message?.content;
    },
  });
};

export default useAiSuggestionHelp;
