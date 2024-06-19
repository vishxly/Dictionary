// Translation.tsx

import { useEffect, useState } from "react";
import axios from "axios";

interface TranslationProps {
  word: string;
  isDarkMode: boolean; // Add isDarkMode prop
}

const Translation = ({ word, isDarkMode }: TranslationProps) => {
  const [translatedWord, setTranslatedWord] = useState<string>("");

  useEffect(() => {
    const translateWord = async () => {
      const options = {
        method: "POST",
        url:
          "https://google-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "Accept-Encoding": "application/gzip",
          "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
          "X-RapidAPI-Key": "3ad0095e69msh106bbe55cff9e58p198e00jsnf4216300bafb",
        },
        data: new URLSearchParams({
          q: word,
          target: "hi",
          source: "en",
        }),
      };

      try {
        const response = await axios.request(options);
        setTranslatedWord(response.data.data.translations[0].translatedText);
      } catch (error) {
        console.error("Failed to translate word:", error);
        setTranslatedWord("Translation failed");
      }
    };

    translateWord();
  }, [word]);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Translation</h2>
      <div
        className={`p-6 rounded-3xl shadow-xl ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h3 className="text-xl font-semibold">
          {translatedWord || "No translation available"}
        </h3>
      </div>
    </section>
  );
};

export default Translation;
