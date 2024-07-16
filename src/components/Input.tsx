import { DetailedHTMLProps, InputHTMLAttributes, RefObject } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  ref: RefObject<HTMLInputElement>;
}

const Input = ({ ...props }: InputProps) => {
  return <input className='text-xl p-3 m-3 shadow rounded-md' {...props} />;
};

export default Input;
