import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { StylesConfig } from "react-select";


const colors = {
    "color-1" : "#0c09c7",
  "color-2" : "#8df308", 
  "color-3" : "#659de6", 
  "color-4" : "#343436", 
  "color-5" : "#498a23", 
  }

interface Button_with_hoverProps{
    onClick: () => void,
    display?:string,
    text:string,
    v_align?: boolean,
    value?: string,
    disable: boolean

}

/**
 * 
 * Refining the properties of the button element given by bootstrap
 * since adding some custom CSS properties do not work per default, 
 * when applying a custom class not available on bootstrap,
 * bootstrap concatenate the default class name for the element with the custom class name, e.g "bootstrap_class"."custom_class".
 * This concatenate name which can not be found within css, that why as a workaround, redefining css properties using the style prop
 * of the button element
 * @returns 
 */
export default function Button_with_hover({display="block",v_align=false, disable=false, text,onClick}:Button_with_hoverProps)
{

    const [isHover, setIsHover] = useState(false);
    console.log("display",display);

    
    

    const handleMouseEnter = () => {
        setIsHover(true);
     };
     const handleMouseLeave = () => {
        setIsHover(false);
     };


    const default_button_style: MyCustomCSS = 
    {
        "fontSize": "110%",
        "fontWeight":"bold",
        "background":isHover ? colors["color-1" ] :"black",
        "color": isHover ? colors["color-2"] : colors["color-3"],
        "display":display,
        "margin": "auto",
        "marginBottom":"4%",
        "verticalAlign": v_align ? "baseline":"",
        "marginLeft": v_align ? "1%": "auto",
        "width": "fit-content",
        "justifyContent": "center",
        "textAlign":"center",

    };

    return <Button disabled={disable} variant="primary" size="lg" onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={default_button_style}>{text}</Button>

}

interface Small_Button_with_hoverProps{
     onClick: (flag:boolean) => void,
     display?:string,
     text:string,
     v_align?: boolean,
     value?: string,
     disable?: boolean
 
 }

export function Small_Button_with_hover({text,onClick,disable=false}:Small_Button_with_hoverProps)
{

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
     };
     const handleMouseLeave = () => {
        setIsHover(false);
     };


    const default_button_style:MyCustomCSS = 
    {
        "fontSize": "95%",
        "background":isHover ? colors["color-1" ] :'black',
        "color": isHover ? colors["color-2"] : colors["color-3"],
        "display":"block",
        "margin": "auto",
        "marginBottom":"2%",
        "width": "fit-content",
        "justifyContent": "center",
        "textAlign":"center",
    };

    return <Button disabled={disable} variant="primary" size="sm" onClick={() => onClick(false)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={default_button_style}>{text}</Button>
}

// doc https://react-select.com/styles
// https://stackoverflow.com/questions/63696310/how-to-use-typescript-with-the-definition-of-custom-styles-for-a-select-using-re
export const customStylesSelect: StylesConfig<MyOptionType, IsMulti>= {
    control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? colors["color-3"] : "#0a58ca",
    background :"black",   
    colors: {primary: "#8df308" }


    }),
    singleValue: (provided,state) => (
        {
            ...provided,
            color:  'whitesmoke',
            ':before': {
                backgroundColor: colors["color-3"],
              },

        }
    ),
    option:(provided,state) =>
    ({
        ...provided,
        backgroundColor: state.isSelected ? colors["color-1"] :"black",
        color:  state.isSelected ? colors["color-2"]: state.isFocused ? colors["color-2"]  : colors["color-3"]  ,
        ':active': {
            backgroundColor: state.isFocused ? 'whitesmoke':'black'

          } 
    }),



    }