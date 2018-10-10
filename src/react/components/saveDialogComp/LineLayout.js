import React from 'react';
import { Paper } from '@material-ui/core';
import ClassNames from 'classnames';

const LineLayout = props => {
  const { classes, selected, onClick } = props;
  return (
    <Paper className={ClassNames(classes.option, { [classes.selected]: selected === 2 })} style={{ marginTop: 16 }} onClick={onClick}>
      <div style={{ padding: 16 }}>
        <img src={'images/xp.png'} style={{ transform: 'rotate(-90deg)' }} />
        <img src={'images/xn.png'} style={{ transform: 'rotate(90deg)' }} />
        <img src={'images/yp.png'} style={{ transform: 'rotate(180deg)' }} />
        <img src={'images/yn.png'} />
        <img src={'images/zp.png'} />
        <img src={'images/zn.png'} />
      </div>
    </Paper>
  )
}

export default LineLayout;