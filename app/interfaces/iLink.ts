import { iTag } from ".";

export default interface iLink {
  id?: string | number;
  url?: string;
  tags?: iTag[];
  title?: string;
  description?: string;
}
