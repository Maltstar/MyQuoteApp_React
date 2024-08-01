import { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> 
{
    placeholder: string,

}

export default function TextArea({placeholder,...rest}:TextareaProps) {


  const [value, setValue] = useState("");
  const [style, SetStyle] = useState<MyCustomCSS | undefined>(undefined)
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  const defaultStyle = {
    "height":"7rem",
    "width":"30%",
    "color":"white",
    "marginBottom":"4%"
    }
  // avoid miss match between server and client rendering
  useEffect(() => 
    {
        SetStyle(defaultStyle)
    },[])

  return (
    <div className="quote_input_wrap">
      <textarea
        id="quote_input"
        onChange={handleChange}
        placeholder={placeholder}
        ref={textAreaRef}
        // rows={1}
        style={style}
        value={value}
        {...rest}
      />
    </div>
  );
}
