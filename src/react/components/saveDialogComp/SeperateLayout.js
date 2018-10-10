import React from 'react';
import { Paper } from '@material-ui/core';
import ClassNames from 'classnames';

const SeperateLayout = props => {
  const { classes, selected, onClick } = props;
  return (
    <Paper className={ClassNames(classes.option, { [classes.selected]: selected === 3 })} style={{ marginTop: 16 }} onClick={onClick}>
      <div style={{ padding: 16 }}>
        <img src={'images/xp.png'} />
        <img src={'images/xn.png'} style={{ marginLeft: 16 }} />
        <img src={'images/yp.png'} style={{ marginLeft: 16 }} />
        <img src={'images/yn.png'} style={{ marginLeft: 16 }} />
        <img src={'images/zp.png'} style={{ marginLeft: 16 }} />
        <img src={'images/zn.png'} style={{ marginLeft: 16 }} />
      </div>
    </Paper>
  )
}

export default SeperateLayout;