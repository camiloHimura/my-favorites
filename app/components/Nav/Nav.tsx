import React from 'react';
import './Nav.css';
import Icon from '../generals/Icon';

interface iItem {
  name: string;
  icon: string;
  selected?: boolean;
}
interface iProps {
  items: iItem[];
}

const Nav: React.FC<iProps> = (props) => {
  return (
    <nav>
      {props.items.map(({ name, icon, selected = false }) => (
        <div key={name} className={selected ? '--selected' : ''}>
          <Icon name={icon} />
          {name}
        </div>
      ))}
    </nav>
  );
};

export default Nav;
