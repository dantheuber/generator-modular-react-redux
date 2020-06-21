import { NAME } from './constants';
import baseSelect from '../util/base-select';

const select = baseSelect(NAME);

export const count = select('count');
export const randomNumber = select('randomNumber');
