import { iAction, iTag } from '../../interfaces';
import { ADD_TAG, REMOVE_TAG, TAGS_LOADED, UPADTED_TAG } from '../actions/actions-types';

export default function tagsReducer(state: iTag[] = [], action: iAction<iTag>): iTag[] {
  switch (action.type) {
    case TAGS_LOADED:
      return [...action.payload as unknown as iTag[]];

    case ADD_TAG:
      return [...state, action.payload];

    case REMOVE_TAG:
      return [...state.filter((item) => item.id !== action.payload as unknown as string)];

    case UPADTED_TAG: {
      let newTags = state.map((tag) => {
        if (tag.id === action.payload.id) {
          const { id, name, color } = action.payload;
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
