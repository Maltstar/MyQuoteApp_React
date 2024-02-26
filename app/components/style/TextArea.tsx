import { TextareaHTMLAttributes, useRef, useState } from "react";
import useAutosizeTextArea from "../hook/useAutosizeTextArea";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> 
{
    placeholder: string,

}

export default function TextArea({placeholder,...rest}:TextareaProps) {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  return (
    <div className="quote_input_wrap">
      <textarea
        id="quote_input"
        onChange={handleChange}
        placeholder={placeholder}
        ref={textAreaRef}
        // rows={1}
        style={
            {
            "height":"9rem",
            "width":"30%",
            "color":"white"
            }}
        value={value}
        {...rest}
      />
    </div>
  );
}
