import { iAction, iTag } from '../../interfaces';
import { ADD_TAG, REMOVE_TAG, TAGS_LOADED, UPADTED_TAG } from '../actions/actions-types';

export default function tagsReducer(
  state: iTag[] = [],
  action: iAction<iTag | iTag[] | string>,
): iTag[] {
  switch (action.type) {
    case TAGS_LOADED:
      return [...(action.payload as unknown as iTag[])];

    case ADD_TAG:
      return [...state, action.payload as iTag];

    case REMOVE_TAG:
      return [...state.filter((item) => item.id !== (action.payload as unknown as string))];

    case UPADTED_TAG: {
      const newTags = state.map((tag) => {
        const payload = action.payload as iTag;
        if (tag.id === payload.id) {
          const { id, name, color } = payload;
          return { id, name, color };
        }
        return tag;
      });

      return newTags;
    }

    default:
      return state;
  }
}
