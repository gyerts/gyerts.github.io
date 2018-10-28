import React from 'react';
import classes from './../../App.css';


const Header = (props) => {
  const internalClasses = [classes.header];

  return <header className={internalClasses.join(' ')}>
    {props.children}
  </header>
};

export default Header;
