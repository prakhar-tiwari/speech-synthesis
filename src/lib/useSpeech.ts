import { useEffect, useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/

const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([
    0, 0,
  ]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const handleStateUpdate = (state: any) => {
    setPlaybackState(state);
  };

  const onBoundary = (event: any) => {
    console.log("boundary$", event);
    const wordStartIndex = event.charIndex;
    const wordLength = event.charLength;
    setCurrentWordRange([wordStartIndex, wordStartIndex + wordLength]);
  };

  const onEnd = (event: any) => {
    if (currentSentenceIdx < sentences.length - 1) {
      setCurrentSentenceIdx((prev) => prev + 1);
    } else {
      reset();
    }
  };

  const speechEngine = createSpeechEngine({
    onBoundary: onBoundary,
    onEnd: onEnd,
    onStateUpdate: handleStateUpdate,
  });

  const reset = () => {
    setCurrentSentenceIdx(0);
    setCurrentWordRange([0, 0]);
  };

  useEffect(() => {
    const currentSentence = sentences[currentSentenceIdx];
    speechEngine.load(currentSentence);
    if (currentSentenceIdx > 0 && playbackState !== "paused") {
      play();
    }
  }, [sentences, currentSentenceIdx, playbackState]);

  const play = () => {
    speechEngine.play();
  };
  const pause = () => {
    speechEngine.pause();
  };

  const cancel = () => {
    speechEngine.cancel();
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
    cancel,
  };
};

export { useSpeech };
