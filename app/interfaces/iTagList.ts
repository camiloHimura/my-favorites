import iTag from './iTag';

export default interface iTagList {
  className: string;
  autoHide: boolean;
  options: iTag[];
  placeHolder: string;
  clearAfterSelecting: boolean;
  clearList?: boolean;
  onTagsSaved: (tags: iTag[]) => void;
  initialSavedTags?: iTag[];
}
