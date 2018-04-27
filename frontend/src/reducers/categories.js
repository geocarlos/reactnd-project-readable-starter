import {FETCH_CATEGORIES} from '../actions/types';

export function categories(state = [], action){
  switch(action.type){
    case FETCH_CATEGORIES:
      const {categories} = action.categories;
      return [...state, ...categories];
    default:
      return state;
  }
}
