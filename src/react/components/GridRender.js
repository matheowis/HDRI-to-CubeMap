import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  baseCanv: {
    position: 'absolute',
    background: '#222',
    width: 128,
    height: 128
  }
}
class GridRender extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div style={{ width: '64vw', height: '36vw', borderRadius: 4, background: '#ccc' }}>
        <div id={'convCanvContainer'} style={{ width: 512, height: 384, position: 'relative', background: '#ccc', marginLeft: 'auto', marginRight: 'auto' }}>
          <canvas id={'convCanv0'} className={classes.baseCanv} style={{ top: 128 }} />
          <canvas id={'convCanv1'} className={classes.baseCanv} style={{ top: 128, left: 128 }} />
          <canvas id={'convCanv2'} className={classes.baseCanv} style={{ top: 128, left: 256 }} />
          <canvas id={'convCanv3'} className={classes.baseCanv} style={{ top: 128, left: 384 }} />
          <canvas id={'convCanv4'} className={classes.baseCanv} style={{ top: 0, left: 128 }} />
          <canvas id={'convCanv5'} className={classes.baseCanv} style={{ top: 256, left: 128 }} />
        </div>
      </div>
    )
  }
}


export default withStyles(styles)(GridRender);