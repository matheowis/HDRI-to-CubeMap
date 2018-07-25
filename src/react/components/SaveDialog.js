import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, withStyles, Paper } from '@material-ui/core';
import ClassNames from 'classnames';
const styles = {
  optionUnity: {
    width: 496,
    height: 224,
    background: '#444',
    '&:hover': {
      background: '#bbb',//'#6666ff'
      cursor: 'pointer'
    },
  },
  option: {
    width: 496,
    height: 96,
    background: '#444',
    '&:hover': {
      background: '#bbb',
      cursor: 'pointer'
    },
  },
  selected: {
    background: '#bbbbff',
    '&:hover': {
      background: '#bbbbff'
    }
  }
}

class SaveDialog extends React.Component {
  state = {
    selected: 0,
    url: '',
    download: '',
    processed: false
  }


  saveFile = (callback = () => { }) => event => {
    console.log('saving files - index =', this.state.selectied);
    console.log(event.handler)
    // console.dir(document.getElementById('SaveButton'))
    // const myButton = document.getElementById('SaveButton')
    this.setState(() => ({
      url: 'test.txt',
      download: 'stuff.txt',
      processed: true
    }))
    callback();
  }
  test = () => {
    const myButton = document.getElementById('SaveButton')
    console.dir(myButton)
  }
  handleSelect = (index = 0) => event => {
    console.log('works', index)
    this.setState(() => ({ selected: index }))
  }
  render() {
    const { classes } = this.props;
    const { selected } = this.state;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DialogTitle>
          Chose Your Layout
        </DialogTitle>
        <DialogContent style={{ height: 450 }}>
          <Paper className={ClassNames(classes.optionUnity, { [classes.selected]: selected === 1 })} style={{ position: 'relative' }} onClick={this.handleSelect(1)}>
            <img src={'images/xn.png'} style={{ position: 'absolute', top: 80, left: 16 }} />
            <img src={'images/zp.png'} style={{ position: 'absolute', top: 80, left: 80 }} />
            <img src={'images/xp.png'} style={{ position: 'absolute', top: 80, left: 144 }} />
            <img src={'images/zn.png'} style={{ position: 'absolute', top: 80, left: 208 }} />
            <img src={'images/yp.png'} style={{ position: 'absolute', top: 16, left: 80 }} />
            <img src={'images/yp.png'} style={{ position: 'absolute', top: 144, left: 80 }} />
          </Paper>
          <Paper className={ClassNames(classes.option, { [classes.selected]: selected === 2 })} style={{ marginTop: 16 }} onClick={this.handleSelect(2)}>
            <div style={{ padding: 16 }}>
              <img src={'images/xp.png'} style={{ transform: 'rotate(-90deg)' }} />
              <img src={'images/xn.png'} style={{ transform: 'rotate(90deg)' }} />
              <img src={'images/yp.png'} style={{ transform: 'rotate(180deg)' }} />
              <img src={'images/yn.png'} />
              <img src={'images/zp.png'} />
              <img src={'images/zn.png'} />
            </div>
          </Paper>
          <Paper className={ClassNames(classes.option, { [classes.selected]: selected === 3 })} style={{ marginTop: 16 }} onClick={this.handleSelect(3)}>
            <div style={{ padding: 16 }}>
              <img src={'images/xp.png'} />
              <img src={'images/xn.png'} style={{ marginLeft: 16 }} />
              <img src={'images/yp.png'} style={{ marginLeft: 16 }} />
              <img src={'images/yn.png'} style={{ marginLeft: 16 }} />
              <img src={'images/zp.png'} style={{ marginLeft: 16 }} />
              <img src={'images/zn.png'} style={{ marginLeft: 16 }} />
            </div>
          </Paper>
        </DialogContent>
        <DialogActions>
          {this.state.processed ?
            <Button
              id={'SaveButton'}
              href={this.state.url}
              download={this.state.download}
              variant='contained'
              color='primary'
              disabled={selected === 0}
              onClick={this.test}
            >
              Save
            </Button>
            :
            <Button
              variant='contained'
              disabled={selected === 0}
              onClick={this.saveFile()}
            >
              Process
            </Button>
          }
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(SaveDialog);
