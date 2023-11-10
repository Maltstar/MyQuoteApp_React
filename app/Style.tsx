import { useState } from "react";
import Button from 'react-bootstrap/Button';

export default function Button_with_hover({text,onClick})
{

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
     };
     const handleMouseLeave = () => {
        setIsHover(false);
     };

     const colors = {
       "color-1" : "#0c09c7",
     "color-2" : "#8df308", 
     "color-3" : "#659de6", 
     "color-4" : "#343436", 
     "color-5" : "#498a23", 
     }
    const default_button_style = 
    {
        "font-size": "110%",
        "font-weight":"bold",
        //"margin-top":"1%",
        "background":isHover ? colors["color-1" ] :'black',
        "color": isHover ? colors["color-2"] : colors["color-3"],
        //"margin":"1%",
        // "margin-left":"41%",
        // "margin-bottom":"5%",
        "display":"block",
        "margin": "auto",
        "margin-bottom":"4%",
        "width": "fit-content",
        //"position": "center",
        "justify-content": "center",
        "text-align":"center",
        // "position": "'absolute', left: '50%', top: '50%'",
        // "transform": 'translate(-50%, -50%)',
    };

    return <Button variant="primary" size="lg" onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={default_button_style}>{text}</Button>

}


export function Small_Button_with_hover({text,onClick})
{

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
     };
     const handleMouseLeave = () => {
        setIsHover(false);
     };

     const colors = {
       "color-1" : "#0c09c7",
     "color-2" : "#8df308", 
     "color-3" : "#659de6", 
     "color-4" : "#343436", 
     "color-5" : "#498a23", 
     }
    const default_button_style = 
    {
        "font-size": "95%",
        //"font-weight":"bold",
        //"margin-top":"1%",
        "background":isHover ? colors["color-1" ] :'black',
        "color": isHover ? colors["color-2"] : colors["color-3"],
        //"margin":"1%",
        // "margin-left":"41%",
        // "margin-bottom":"5%",
        "display":"block",
        "margin": "auto",
        "margin-bottom":"2%",
        "width": "fit-content",
        //"position": "center",
        "justify-content": "center",
        "text-align":"center",
        // "position": "'absolute', left: '50%', top: '50%'",
        // "transform": 'translate(-50%, -50%)',
    };

    return <Button variant="primary" size="sm" onClick={() => onClick(false)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={default_button_style}>{text}</Button>

}