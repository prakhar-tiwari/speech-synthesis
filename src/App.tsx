import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { fetchContent, parseContentIntoSentences } from './lib/content';
import { useSpeech } from './lib/useSpeech';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWordRange, currentSentenceIdx, playbackState, play, pause, cancel } = useSpeech(sentences);

  const fetchData = () => {
    fetchContent().then((res: any) => {
      const parsedSentences = parseContentIntoSentences(res?.content);
      setSentences(parsedSentences);
    }).catch(err => {
      console.error(err);
    })
  }
  useEffect(() => {
    fetchData();
  }, [])

  const handleLoadNewContent = () => {
    cancel();
    fetchData();
  }

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        {sentences.length && <CurrentlyReading sentences={sentences} currentSentenceIdx={currentSentenceIdx} currentWordRange={currentWordRange} />}
      </div>
      <div>
        <Controls play={play} pause={pause} loadNewContent={handleLoadNewContent} state={playbackState} />
      </div>
    </div>
  );
}

export default App;
