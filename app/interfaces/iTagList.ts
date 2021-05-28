import iTag from './iTag';

export default interface iTagList {
  className: string;
  autoHide: boolean;
  //Todo add option types
  options: iTag[];
  placeHolder: string;
  clearAfterSelecting: boolean;
  clearList: boolean;
  //Todo add return types
  onTagsSaved: (tags: iTag[]) => void;
  initialSavedTags: iTag[];
}
