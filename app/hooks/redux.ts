import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import type { RootState, AppDispatch } from '../state/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): Dispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
