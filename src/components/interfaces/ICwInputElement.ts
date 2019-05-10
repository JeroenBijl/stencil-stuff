interface ICwInputElement {
  checked?: boolean;
  disabled?: boolean;
  id: string;
  label?: string;
  name: string;
  required: boolean;
  placeholder?: string;
  value: number | string;
  setFocus(): void;
  reset(): void;
  validate(): boolean;
}
