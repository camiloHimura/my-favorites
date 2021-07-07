import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSideBarIndexAction, setSideBarErrorIndexAction } from '../../../state/actions';
import { RootState } from '../../../state/store';
import './SideBarOptions.css';

import Icon from '../../generals/Icon';
import { iComponentOpt } from '../SideBar';
import * as R from 'ramda';

export interface iProps {
  options: iComponentOpt[];
  setSelectedComponent: React.Dispatch<React.SetStateAction<number>>;
}

const selectSideBar = (state: RootState) => state.sideBar;

const SideBarOptions: React.FC<iProps> = ({ setSelectedComponent, options }: iProps) => {
  const sideBar = useAppSelector(selectSideBar);
  const dispatchSetSideBarIndex = useAppDispatch();
  const dispatchSetSideBarErrorIndex = useAppDispatch();

  //The error tap is always the last one
  const setSideBarErrorIndex = () =>
    dispatchSetSideBarIndex(setSideBarErrorIndexAction(options.length - 1));

  const setSideBarIndex = (index: number) =>
    dispatchSetSideBarErrorIndex(setSideBarIndexAction(index));

  useEffect(() => {
    setSideBarErrorIndex();
  }, []);

  useEffect(() => {
    setSelectedComponent(sideBar.activeIndex);
  }, [setSelectedComponent, sideBar.activeIndex]);

  return (
    <section className="sideBarOptions">
      {options.map(({ icon }, index) => (
        <button
          key={`options-${index}`}
          data-test="btn-option"
          className={`--flex ${sideBar.activeIndex == index ? '--selected' : ''}`}
          onClick={() => setSideBarIndex(index)}
        >
          <Icon name={icon} onClick={R.T} />
        </button>
      ))}
    </section>
  );
};

export default SideBarOptions;
