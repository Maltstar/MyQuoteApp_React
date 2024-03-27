type Props <C extends React.ElementType> = 
React.PropsWithChildren<GenericProps<C>> & // accepts GenericProps component props as a generic and augments it with the children prop of C
React.ComponentPropsWithoutRef<C> // props specific to component passed as parameter


// type PropsGeneric <D extends React.ReactNode> = 
// React.PropsWithChildren<GenericComponentProps<D>> & // accepts GenericProps component props as a generic and augments it with the children prop of C
// React.ComponentPropsWithoutRef<D> // props specific to component passed as parameter


type GenericProps<C extends React.ElementType> = {
    as?: C; // props specific to Generic Props
  } // prop of object type C passed as parameter

type GenericComponentProps<D extends React.ReactNode> = {
    as?: D; // props specific to Generic Props
  } // prop of object type C passed as parameter



export const Generic = <C extends React.ElementType = "div">({
    as, // type of component
    children, // value/component passed to the component "as"
    ...restProps // props of "as"
  }: Props<C>) => {
    const Component = as || "div";
  
    return <Component {...restProps}>{children}</Component>;
  };


