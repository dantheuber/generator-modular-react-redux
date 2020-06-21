import { NAME } from './constants';
import actionTypeConstructor from '../util/action-type-constructor';

const ca = actionTypeConstructor(NAME);

export const RESET_COUNT = ca('RESET_COUNT');
export const INCREASE_COUNT = ca('INCREASE_COUNT');
export const DECREASE_COUNT = ca('DECREASE_COUNT');

export const UPDATE_RANDOM = ca('UPDATE_RANDOM');
