import iTag from './iTag';

export default interface iAutoComplete {
  options: iTag[];
  autoHide?: boolean;
  placeHolder?: string;
  propertyFilter: string;
  clearAfterSelecting: boolean;
  onSelected: (tag: iTag) => void;
}
