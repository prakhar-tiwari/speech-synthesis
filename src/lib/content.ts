const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (err) {
    console.error(err);
    return Promise.resolve("<speak><s>There was an error</s></speak>");
  }
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string): string[] => {
  const result: string[] = [];
  let str = content;
  while (str.includes("<s>") && str.includes("</s>")) {
    const openingTagIndex = str.indexOf("<s>");
    const closingTagIndex = str.indexOf("</s>");
    const sentence = str.slice(openingTagIndex + 3, closingTagIndex);
    result.push(sentence);
    str = str.slice(closingTagIndex + 2);
  }
  return result;
};

export { fetchContent, parseContentIntoSentences };
