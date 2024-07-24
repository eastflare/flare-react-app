export interface FormElement {
  id: string,
  name: string,
  type?: string,
  option?: {
    required?: string,
    pattern?: {
      value: RegExp,
      message: string,
    },
    minLength?: {
      value: number,
      message: string,
    },
  },
}