import { FETCH_CATEGORIES } from './types';
import { fetchData } from './thunk_support';

export function fetchCategories(categories = []){
  return {
    type: FETCH_CATEGORIES,
    categories
  }
}

// Thunk
export function fetchCategoryList(url){
  return fetchData(url, fetchCategories);
}
