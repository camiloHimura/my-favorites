export type iInput = React.MutableRefObject<HTMLInputElement>;
export type iInputKeyboardEventHandler = React.KeyboardEventHandler<HTMLInputElement>;
export type iChangeEventInput =
  | React.ChangeEvent<HTMLInputElement>
  | React.MouseEvent<HTMLButtonElement, MouseEvent>;
