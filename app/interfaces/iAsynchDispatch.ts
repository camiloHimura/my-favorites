import { Dispatch } from 'react';
import iAction from './iAction';
import iError from './iError';

export type iAsynchDispatch<T> = Dispatch<iAction<T | iError>>;
