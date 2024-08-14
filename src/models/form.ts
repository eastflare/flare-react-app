import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister } from "react-hook-form";

export interface IFormRow {
  elements: IFormElement[];
  map: any;
}

export interface FormProps {
  elements: IFormRow[];
  onSubmit: SubmitHandler<FieldValues>;
  map: any;
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
  map: any;
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
