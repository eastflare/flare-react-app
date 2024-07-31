import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister } from "react-hook-form";

export interface FormProps {
  elements: IFormElement[];
  onSubmit: SubmitHandler<FieldValues>;
}

export interface IFormElement {
  id: string;
  name: string;
  type?: string;
  option?: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
  };
}

export interface FormElementProps {
  id: string;
  name: string;
  type?: string;
  option?: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
  };
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
}
