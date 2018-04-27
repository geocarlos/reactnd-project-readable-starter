import {CHECK_FORM_ERRORS} from './types';

export function checkFormErrors(formErrors = {}){
  return {
    type: CHECK_FORM_ERRORS,
    formErrors
  }
}
