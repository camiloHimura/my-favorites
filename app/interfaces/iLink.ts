import { iTag } from ".";

export default interface iLink {
  id?: string | number;
  url?: string;
  tags?: iTag[];
  title?: string;
  description?: string;
}

export interface iNewLink extends Omit<iLink, 'tags'> {
  tags: string[]
}