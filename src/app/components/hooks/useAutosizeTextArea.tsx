import { useEffect, useState } from 'react';

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  const [init, SetInit] = useState(false)

  useEffect(() => {
    if (textAreaRef && init) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
    }
    else // only for initialization to get a default height
    {
      if (textAreaRef)
      {
        // default height
        textAreaRef.style.height = "7rem";
        SetInit(true)
      }

    }
  }, [textAreaRef, value]);
};


export default useAutosizeTextArea;