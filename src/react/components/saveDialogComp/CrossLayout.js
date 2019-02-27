import React from 'react';
import { Paper } from '@material-ui/core';
import ClassNames from 'classnames';

const CrossLayout = props => {
  const { classes, selected, onClick } = props;
  return (
    <Paper className={ClassNames(classes.optionUnity, { [classes.selected]: selected === 1 })} style={{ position: 'relative' }} onClick={onClick}>
      <img src={'images/xn.png'} style={{ position: 'absolute', top: 80, left: 16 }} />
      <img src={'images/zp.png'} style={{ position: 'absolute', top: 80, left: 80 }} />
      <img src={'images/xp.png'} style={{ position: 'absolute', top: 80, left: 144 }} />
      <img src={'images/zn.png'} style={{ position: 'absolute', top: 80, left: 208 }} />
      <img src={'images/yp.png'} style={{ position: 'absolute', top: 16, left: 80 }} />
      <img src={'images/yn.png'} style={{ position: 'absolute', top: 144, left: 80 }} />
    </Paper>
  )
}

export default CrossLayout;
