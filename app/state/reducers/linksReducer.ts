import { iAction, iLink } from '../../interfaces';
import { iTagLink } from '../../interfaces/iTagLink';
import {
  ADD_LINK,
  LINKS_LOADED,
  REMOVE_LINK,
  REMOVE_TAG_LINK,
  SEARCH_LINK,
} from '../actions/actions-types';

export default function addLinkReducer(
  state: iLink[] = [],
  action: iAction<string | iTagLink | iLink | iLink[]>,
): iLink[] {
  switch (action.type) {
    case ADD_LINK:
      return [...state, action.payload as iLink];

    case LINKS_LOADED:
      return [...(action.payload as iLink[])];

    case SEARCH_LINK:
      return [
        ...state.filter((item) =>
          item.title.toUpperCase().includes((action.payload as string).toUpperCase()),
        ),
      ];

    case REMOVE_LINK:
      return [...state.filter((item) => item.id != action.payload)];

    case REMOVE_TAG_LINK: {
      const { linkId, tagId } = action.payload as iTagLink;

      return [
        ...state.map((item) => {
          if (item.id === linkId) {
            item.tags = item.tags.filter((tag) => tag.id !== tagId);
            return item;
          }
          return item;
        }),
      ];
    }

    default:
      return state;
  }
}
