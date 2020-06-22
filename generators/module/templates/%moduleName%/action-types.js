import { NAME } from './constants';
import actionTypeConstructor from '../util/action-type-constructor';

const ca = actionTypeConstructor(NAME);

export const TOGGLE_SHOW = ca('TOGGLE_SHOW');
