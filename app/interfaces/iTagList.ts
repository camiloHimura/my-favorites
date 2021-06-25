import iTag from './iTag';

export default interface iTagList {
  options: iTag[];
  initialSavedTags?: iTag[];
  className: string;
  autoHide: boolean;
  placeHolder: string;
  clearList?: boolean;
  clearAfterSelecting: boolean;
  onTagsSaved: (tags: iTag[]) => void;
}
