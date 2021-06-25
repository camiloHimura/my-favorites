export default interface iAction<T> {
  type: string;
  payload?: T;
}
