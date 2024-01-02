import React from "react";
import { useForm } from 'react-hook-form';
import "./Forms.scss";

export interface FromsProps {
  Onsubmit?: Function,
  children: JSX.Element | JSX.Element[],
}

const Forms = (props: FromsProps) => {
  const methods = useForm();
  const { register, handleSubmit, formState: { errors }} = methods;
  const onSubmit = (data: Object) => {
    if(props.Onsubmit){
      props.Onsubmit(data)
    }else{
      console.log(data)
    }
  }
  return (

      <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(props.children)
        ? props.children.map((child) => {
            return child?.props?.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    errors,
                    key: child.props.name
                  }
                })
              : child;
          })
        : props.children}
    </form>
    
  );
};

Forms.defaultProps = {
};

export default Forms;