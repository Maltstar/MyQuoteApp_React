import { useState } from "react";
import Button from 'react-bootstrap/Button';

const colors = {
    "color-1" : "#0c09c7",
  "color-2" : "#8df308", 
  "color-3" : "#659de6", 
  "color-4" : "#343436", 
  "color-5" : "#498a23", 
  }

export default function Button_with_hover({text,onClick,display="block",v_align=false, disable=false},props)
{

    const [isHover, setIsHover] = useState(false);
    console.log("display",display);
    

    const handleMouseEnter = () => {
        setIsHover(true);
     };
     const handleMouseLeave = () => {
        setIsHover(false);
     };


    const default_button_style = 
    {
        "fontSize": "110%",
        "fontWeight":"bold",
        //"margin-top":"1%",
        "background":isHover ? colors["color-1" ] :"black",
        "color": isHover ? colors["color-2"] : colors["color-3"],
        //"margin":"1%",
        // "margin-left":"41%",
        // "margin-bottom":"5%",
        "display":display,
        //"display":"block",
        "margin": "auto",
        "marginBottom":"4%",
        "verticalAlign": v_align ? "baseline":"",
        "marginLeft": v_align ? "1%": "auto",
        "width": "fit-content",
        //"position": "center",
        "justifyContent": "center",
        "textAlign":"center",
        // "position": "'absolute', left: '50%', top: '50%'",
        // "transform": 'translate(-50%, -50%)',
    };

    return <Button {...props} disabled={disable} variant="primary" size="lg" onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={default_button_style}>{text}</Button>

}


export function Small_Button_with_hover({text,onClick,disable=false},props)
{

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
     };
     const handleMouseLeave = () => {
        setIsHover(false);
     };


    const default_button_style = 
    {
        "fontSize": "95%",
        //"font-weight":"bold",
        //"margin-top":"1%",
        "background":isHover ? colors["color-1" ] :'black',
        "color": isHover ? colors["color-2"] : colors["color-3"],
        //"margin":"1%",
        // "margin-left":"41%",
        // "margin-bottom":"5%",
        "display":"block",
        "margin": "auto",
        "marginBottom":"2%",
        "width": "fit-content",
        //"position": "center",
        "justifyContent": "center",
        "textAlign":"center",
        // "position": "'absolute', left: '50%', top: '50%'",
        // "transform": 'translate(-50%, -50%)',
    };

    return <Button {...props} disabled={disable} variant="primary" size="sm" onClick={() => onClick(false)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={default_button_style}>{text}</Button>

}

// doc https://react-select.com/styles
export const customStylesSelect = {
    control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? colors["color-3"] : "#0a58ca",
    background :"black",   
    colors: {primary: "#8df308" }


    }),
    singleValue: (provided:any,state) => (
        {
            ...provided,
            color:  'whitesmoke',
            ':before': {
                backgroundColor: colors["color-3"],
              },

        }
    ),
    option:(provided:any,state) =>
    ({
        ...provided,
        backgroundColor: state.isSelected ? colors["color-1"] :"black",
        color:  state.isSelected ? colors["color-2"]: state.isFocused ? colors["color-2"]  : colors["color-3"]  ,
        ':active': {
            backgroundColor: state.isFocused ? 'whitesmoke':'black'
            //color:

          } 
    }),



    }