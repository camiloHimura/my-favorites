export default interface iSearch {
  style?: object;
  onSearchLink: (text: string) => void;
  onGetAllLinks: Function;
}
