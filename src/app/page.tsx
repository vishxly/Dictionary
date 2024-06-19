"use client";
import { useEffect, useState } from "react";
// import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import "../../public/styles.css";
import { FaSun, FaMoon } from "react-icons/fa";
import Translation from "@/components/Translation";

interface DictionaryEntry {
  word: string;
  phonetics: { text: string; audio: string }[];
  meanings: { partOfSpeech: string; definitions: { definition: string }[] }[];
  origin: string;
}

interface BannerProps {
  changeWord: (word: string) => void;
}

const Banner = ({ changeWord }: BannerProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      changeWord(value);
    }
  };

  return (
    <div className="h-[40vh] flex items-center justify-center">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full py-4 pl-12 pr-4 text-sm text-gray-900 border border-gray-300 rounded-full bg-white shadow-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Search Mockups, Logos..."
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <button
            type="submit"
            className="absolute right-4 text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

const ThemeToggle = ({ toggleTheme, isDarkMode }: { toggleTheme: () => void; isDarkMode: boolean }) => {
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2  dark:bg-gray-500  rounded-full shadow-md"
    >
      {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-900" />}
    </button>
  );
};

const colors = {
  tagsBackground: "#3e32e4",
  tagsText: "#ffffff",
  tagsBackgroundHoverActive: "#6e65f1",
  tagsTextHoverActive: "#ffffff",
  searchBackground: "#18191f",
  searchText: "#ffffff",
  searchPlaceHolder: "#575a77",
  playerBackground: "#000",
  titleColor: "#16A343",
  timeColor: "#16A343",
  progressSlider: "#16A343",
  progressUsed: "#16A343",
  progressLeft: "#16A343",
  bufferLoaded: "#16A343",
  volumeSlider: "#3e32e4",
  volumeUsed: "#ffffff",
  volumeLeft: "#151616",
  playlistBackground: "#fff",
  playlistText: "#575a77",
  playlistBackgroundHoverActive: "#18191f",
  playlistTextHoverActive: "#ffffff",
};

const Home = () => {
  const [word, setWord] = useState("hello");
  const [dictionary, setDictionary] = useState<DictionaryEntry[] | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [wordOfTheDay, setWordOfTheDay] = useState<DictionaryEntry | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchDictionaryData = async () => {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        const data = await response.json();
        setDictionary(data);
        setHistory((prev) => [...new Set([word, ...prev])]); // Add to history, ensuring no duplicates
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch dictionary data:", err);
      }
    };

    fetchDictionaryData();
  }, [word]);

  useEffect(() => {
    const fetchWordOfTheDay = async () => {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/serendipity` // Replace with actual word of the day endpoint if available
        );
        const data = await response.json();
        setWordOfTheDay(data[0]);
      } catch (err) {
        console.error("Failed to fetch word of the day:", err);
      }
    };

    fetchWordOfTheDay();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <main className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} top` }>
      <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Banner changeWord={setWord} />
      <section className="relative top-[-15vh] w-[90%] mx-auto shadow-xl p-8 rounded-3xl">
        <div className="flex justify-between items-center mb-8">
          <span className="px-6 py-2 rounded-full bg-green-600 text-white text-lg shadow-md">
            <span className="h-[10px] w-[10px] bg-yellow-300 rounded-full inline-block mr-2"></span>
            {word}
          </span>
          <h1 className="text-3xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
              FIND IN
            </span>{" "}
            DICTIONARY
          </h1>
          {dictionary?.length && (
            <span className="px-6 py-2 rounded-full bg-blue-600 text-white text-lg shadow-md">
              <span className="h-[10px] w-[10px] bg-blue-300 rounded-full inline-block mr-2"></span>
              {`Phonetic: ${dictionary[0]?.phonetics[1]?.text}`}
            </span>
          )}
        </div>


        <section className="mb-8">
          <span className="px-6 py-2 rounded-full bg-green-600 text-white font-semibold shadow-md inline-block">
            <span className="h-[10px] w-[10px] bg-yellow-300 rounded-full inline-block mr-2"></span>
            Origin
          </span>
          <p className="py-4 mt-4 px-6 rounded-lg shadow-md">
            {dictionary?.[0]?.origin || "Origin information not available."}
          </p>
        </section>
        <Translation word={word} isDarkMode={isDarkMode} />
        {dictionary?.length &&
          dictionary[0]?.meanings.map((meaning, index) => (
            <section key={index} className="mb-8 p-6 rounded-3xl shadow-xl">
              <span className="px-6 py-3 rounded-full bg-gray-600 text-white font-semibold shadow-md inline-block mb-4">
                <span className="h-[10px] w-[10px] bg-white rounded-full inline-block mr-2"></span>
                Meaning
              </span>
              <div>
                <span className="px-3 py-2 rounded-full bg-white text-green-700 font-semibold shadow-sm inline-block mb-4">
                  <span className="h-[10px] w-[10px] bg-yellow-300 rounded-full inline-block mr-2"></span>
                  Part of Speech
                  <span className="px-6 py-2 ml-4 rounded-full bg-green-600 text-white font-semibold shadow-md">
                    {meaning.partOfSpeech}
                  </span>
                </span>
                {meaning.definitions.map((definition, i) => (
                  <p key={i} className="py-3 mt-4 px-6 rounded-lg shadow-md">
                    {definition.definition}
                  </p>
                ))}
              </div>
            </section>
          ))}

        {/* <div className="mt-8">
          <Player
            includeTags={false}
            includeSearch={false}
            showPlaylist={false}
            sortTracks={false}
            autoPlayNextTrack={false}
            trackList={[
              {
                url: dictionary?.[0]?.phonetics[0]?.audio || "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3",
                title: word,
                tags: [word],
              },
            ]}
            customColorScheme={colors}
          />
        </div> */}

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">History of Searched Words</h2>
          <ul className="list-disc pl-5">
            {history.map((word, index) => (
              <li key={index}>
                {word}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Word of the Day</h2>
          {wordOfTheDay && (
            <div className="p-6 rounded-3xl shadow-xl">
              <h3 className="text-xl font-semibold">{wordOfTheDay.word}</h3>
              <p>
                {wordOfTheDay.meanings[0]?.definitions[0]?.definition}
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default Home;
