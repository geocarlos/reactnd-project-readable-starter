import * as posts from './posts';
import {comments} from './comments';
import {formErrors} from './errors';
import {categories} from './categories';
import {combineReducers} from 'redux';

export default combineReducers({...posts, comments, formErrors, categories});
