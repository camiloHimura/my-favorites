import { iTag } from '.';

export default interface iLink {
  id?: string;
  url: string;
  tags: iTag[];
  title: string;
  description?: string;
}

export interface iNewLink extends Omit<iLink, 'tags'> {
  tags: string[];
}
