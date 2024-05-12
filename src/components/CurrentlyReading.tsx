import { useEffect, useRef } from "react";

/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const getHighlightedWord = () => {
    const currentSentence = sentences[currentSentenceIdx];
    const currentWord = currentSentence.slice(currentWordRange[0], currentWordRange[1]);
    const highlightedWord = `<span class="currentword" data-testid="current-word">${currentWord}</span>`;
    if (contentRef.current) {
      contentRef.current.innerHTML = currentSentence.replace(currentWord, highlightedWord);
    }
  }
  useEffect(() => {
    getHighlightedWord();
  }, [currentWordRange])
  return <div className="currently-reading" data-testid="currently-reading">
    <p className="currently-reading-text" ref={contentRef} data-testid="current-sentence">
    </p>
    <div className="container">{sentences.join(". ")}</div>
  </div>;
};
