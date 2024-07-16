import { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  children: ReactNode;
}

const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label className='text-xl m-5 font-medium' {...props}>
      {children}
    </label>
  );
};

export default Label;
