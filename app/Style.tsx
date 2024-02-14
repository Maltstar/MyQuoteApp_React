import { useState } from "react";
import Button from 'react-bootstrap/Button';
//import StateManagedSelect from 'react-select';
//import { PropsWithChildren,ReactNode } from "react";
import { StylesConfig } from "react-select";
import { ButtonProps } from "react-bootstrap/Button";


const colors = {
    "color-1" : "#0c09c7",
  "color-2" : "#8df308", 
  "color-3" : "#659de6", 
  "color-4" : "#343436", 
  "color-5" : "#498a23", 
  }

interface Button_with_hoverProps{
   // props: PropsWithChildren<ButtonProps>,
    //props: Props & React.ComponentPropsWithoutRef<typeof Button>;
    onClick: () => void,
    display?:string,
    text:string,
    v_align?: boolean,
    value?: string,
    disable: boolean

}

//export default function Button_with_hover({props,display="block",v_align=false, disable=false}:Button_with_hoverProps)
export default function Button_with_hover({display="block",v_align=false, disable=false, text,onClick}:Button_with_hoverProps)
{

    const [isHover, setIsHover] = useState(false);
    console.log("display",display);
    //console.log("Button_with_hover props",props);
    
    

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

    //return <Button {...props} disabled={disable} variant="primary" size="lg" onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={default_button_style}>{text}</Button>
    return <Button disabled={disable} variant="primary" size="lg" onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={default_button_style}>{text}</Button>

}

interface Small_Button_with_hoverProps{
    // props: PropsWithChildren<ButtonProps>,
     //props: Props & React.ComponentPropsWithoutRef<typeof Button>;
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

    //return <Button {...props} disabled={disable} variant="primary" size="sm" onClick={() => onClick(false)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={default_button_style}>{text}</Button>
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
            //color:

          } 
    }),



    }