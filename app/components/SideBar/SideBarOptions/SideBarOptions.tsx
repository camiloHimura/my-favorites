import React, { useEffect } from 'react';
import Fun from '../../../utils/Fun';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSideBarIndexAction, setSideBarErrorIndexAction } from '../../../state/actions';
import { RootState } from '../../../state/store';
import './SideBarOptions.css';

import Icon from '../../generals/Icon';
import CreateLink from '../../CreateLink';
import TagBox from '../../TagBox';
import ErrorLog from '../ErrorLog';

const options = [
  { icon: 'add_circle', component: CreateLink },
  { icon: 'loyalty', component: TagBox },
  { icon: 'notification_important', component: ErrorLog },
];

export interface iProps {
  setSelectedComponent: React.Dispatch<React.FC>;
}

const selectSideBar = (state: RootState) => state.sideBar;

const SideBarOptions: React.FC<iProps> = ({ setSelectedComponent }: iProps) => {
  const sideBar = useAppSelector(selectSideBar);
  const setSideBarIndex = useAppDispatch();
  const setSideBarErrorIndex = useAppDispatch();

  useEffect(() => {
    setSideBarErrorIndex(setSideBarErrorIndexAction(2));
  }, [setSideBarErrorIndex]);

  useEffect(() => {
    setSelectedComponent(options[sideBar.activeIndex].component);
  }, [setSelectedComponent, sideBar.activeIndex]);

  return (
    <section className="sideBarOptions">
      {options.map(({ icon }, index) => (
        <button
          key={`options-${index}`}
          className={`--flex ${sideBar.activeIndex == index ? '--selected' : ''}`}
          onClick={() => {
            setSideBarIndex(setSideBarIndexAction(index));
          }}
        >
          <Icon name={icon} onClick={Fun.noon} />
        </button>
      ))}
    </section>
  );
};

export default SideBarOptions;
