import React, { useEffect } from 'react';
import Fun from '../../../utils/Fun';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSideBarIndexAction, setSideBarErrorIndexAction } from '../../../state/actions';
import { RootState } from '../../../state/store';
import './SideBarOptions.css';

import Icon from '../../generals/Icon';
import { iComponentOpt } from '../SideBar';
// Todo Add test
export interface iProps {
  options: iComponentOpt[];
  setSelectedComponent: React.Dispatch<React.SetStateAction<number>>;
}

const selectSideBar = (state: RootState) => state.sideBar;

const SideBarOptions: React.FC<iProps> = ({ setSelectedComponent, options }: iProps) => {
  const sideBar = useAppSelector(selectSideBar);
  const dispatchSetSideBarIndex = useAppDispatch();
  const dispatchSetSideBarErrorIndex = useAppDispatch();

  const setSideBarErrorIndex = () => dispatchSetSideBarIndex(setSideBarErrorIndexAction(2));
  const setSideBarIndex = (index: number) => dispatchSetSideBarErrorIndex(setSideBarIndexAction(index));

  useEffect(() => {
    setSideBarErrorIndex();
  }, []);

  useEffect(() => {
    setSelectedComponent(sideBar.activeIndex);
  }, [sideBar.activeIndex]);

  return (
    <section className="sideBarOptions">
      {options.map(({ icon }, index) => (
        <button
          key={`options-${index}`}
          className={`--flex ${sideBar.activeIndex == index ? '--selected' : ''}`}
          onClick={() => setSideBarIndex(index)}
        >
          <Icon name={icon} onClick={Fun.noon} />
        </button>
      ))}
    </section>
  );
};

export default SideBarOptions;
