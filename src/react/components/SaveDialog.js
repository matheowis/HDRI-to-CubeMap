import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, withStyles, Paper,
  LinearProgress, Select, MenuItem, InputLabel, FormControl
} from '@material-ui/core';
import ClassNames from 'classnames';
import { procRenderSep, procRenderUnity, procRenderUE4 } from '../../three/render/renderProc';
import { hdrProcRenderSep, hdrProcRenderUnity, hdrProcRenderUE4 } from '../../three/render/hdrRenderProc';
import { rgbm16ProcRenderUE4, rgbm16ProcRenderUnity, rgmb16ProcRenderSep } from '../../three/render/rgbm16RenderProc';
import CrossLayout from './saveDialogComp/CrossLayout';
import LineLayout from './saveDialogComp/LineLayout';
import SeperateLayout from './saveDialogComp/SeperateLayout';
import ResolutionSelect from './saveDialogComp/ResolutionSelect';
import FormatSelect from './saveDialogComp/FormatSelect';
const styles = theme => ({
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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})



class SaveDialog extends React.Component {
  state = {
    selected: 0,
    url: '',
    download: '',
    processed: false,
    processing: true,
    progress: 0,
    saveDisable: false,
    resolution: 256,
    format: 'png',
  }


  proccessFiles = () => event => {
    console.log('saving files - index =', this.state.selected);
    console.log(event.handler)
    // console.dir(document.getElementById('SaveButton'))
    // const myButton = document.getElementById('SaveButton')
    this.setState(() => ({ saveDisable: true }))
    console.log("Save format-",this.state.format)
    switch (this.state.format) {
      case 'hdr':
        this.hdrProccess(href => {
          this.setState(() => ({
            url: href,
            download: 'Standard-Cube-Map.zip',
            processed: true,
            saveDisable: false
          }))
        });
        break;
      case 'rgbm16':
        this.rgbm16Proccess(href => {
          this.setState(() => ({
            url: href,
            download: 'Standard-Cube-Map.zip',
            processed: true,
            saveDisable: false
          }))
        });
        break;
      default:
        this.regularProccess(href => {
          this.setState(() => ({
            url: href,
            download: 'Standard-Cube-Map.zip',
            processed: true,
            saveDisable: false
          }))
        });
        break;
    }

    // if (this.state.format === 'hdr') {
    //   this.hdrProccess(href => {
    //     this.setState(() => ({
    //       url: href,
    //       download: 'Standard-Cube-Map.zip',
    //       processed: true,
    //       saveDisable: false
    //     }))
    //   });
    // } else {
    //   this.regularProccess(href => {
    //     this.setState(() => ({
    //       url: href,
    //       download: 'Standard-Cube-Map.zip',
    //       processed: true,
    //       saveDisable: false
    //     }))
    //   });
    // }

  }
  hdrProccess = (callback) => {
    if (this.state.selected === 1) {
      hdrProcRenderUnity(this.state.resolution, href => {
        callback(href);
      }, progress => {
        const { progNow, progTotal } = progress
        this.setState(() => ({ progress: progNow / progTotal * 100 }))
      })
    }
    if (this.state.selected === 2) {
      hdrProcRenderUE4(this.state.resolution, href => {
        callback(href);
      }, progress => {
        const { progNow, progTotal } = progress
        this.setState(() => ({ progress: progNow / progTotal * 100 }))
      })
    }
    if (this.state.selected === 3) {
      hdrProcRenderSep(this.state.resolution, href => {
        callback(href);
      }, progress => {
        const { progNow, progTotal } = progress
        this.setState(() => ({ progress: progNow / progTotal * 100 }))
      })
    }
  }
  rgbm16Proccess = (callback) => {
    if (this.state.selected === 1) {
      rgbm16ProcRenderUnity(this.state.resolution, href => {
        callback(href);
      }, progress => {
        const { progNow, progTotal } = progress
        this.setState(() => ({ progress: progNow / progTotal * 100 }))
      })
    }
    if (this.state.selected === 2) {
      rgbm16ProcRenderUE4(this.state.resolution, href => {
        callback(href);
      }, progress => {
        const { progNow, progTotal } = progress
        this.setState(() => ({ progress: progNow / progTotal * 100 }))
      })
    }
    if (this.state.selected === 3) {
      rgmb16ProcRenderSep(this.state.resolution, href => {
        callback(href);
      }, progress => {
        const { progNow, progTotal } = progress
        this.setState(() => ({ progress: progNow / progTotal * 100 }))
      })
    }
  }
  regularProccess = (callback) => {
    if (this.state.selected === 1) {
      procRenderUnity(this.state.resolution, href => {
        callback(href);
      }, progress => {
        const { progNow, progTotal } = progress
        this.setState(() => ({ progress: progNow / progTotal * 100 }))
      })
    }
    if (this.state.selected === 2) {
      procRenderUE4(this.state.resolution, href => {
        callback(href);
      }, progress => {
        const { progNow, progTotal } = progress
        this.setState(() => ({ progress: progNow / progTotal * 100 }))
      })
    }
    if (this.state.selected === 3) {
      procRenderSep(this.state.resolution, href => {
        callback(href);
      }, progress => {
        const { progNow, progTotal } = progress
        this.setState(() => ({ progress: progNow / progTotal * 100 }))
      })
    }
  }
  saveFiles = () => {
    // const myButton = document.getElementById('SaveButton')
    // console.dir(myButton)
    this.onClose();
  }
  handleSelect = (index = 0) => event => {
    console.log('works', index)
    this.setState(() => ({ selected: index }))
  }
  onSelectChange = name => event => {
    this.setState({ [name]: event.target.value });
  }
  onClose = () => {
    this.props.onClose();
    this.setState(() => ({
      url: '',
      download: '',
      processed: false,
      saveDisable: false,
      progress: 0
    }))
  }
  render() {
    const { classes } = this.props;
    const { selected } = this.state;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.onClose}
      >
        <DialogTitle>
          Chose Your Layout
        </DialogTitle>
        <DialogContent style={{ height: 450 }}>
          <div style={{ display: 'flex' }}>
            <ResolutionSelect
              classes={classes}
              onChange={this.onSelectChange('resolution')}
              value={this.state.resolution}
            />
            <FormatSelect
              classes={classes}
              onChange={this.onSelectChange('format')}
              value={this.state.format}
            />
          </div>
          <CrossLayout classes={classes} selected={selected} onClick={this.handleSelect(1)} />
          <LineLayout classes={classes} selected={selected} onClick={this.handleSelect(2)} />
          <SeperateLayout classes={classes} selected={selected} onClick={this.handleSelect(3)} />
        </DialogContent>
        <LinearProgress variant="determinate" value={this.state.progress} />

        <DialogActions>

          {this.state.processed ?
            <Button
              id={'SaveButton'}
              href={this.state.url}
              download={this.state.download}
              variant='contained'
              color='primary'
              disabled={selected === 0 || this.state.saveDisable}
              onClick={this.saveFiles}
            >
              Save
            </Button>
            :
            <Button
              variant='contained'
              disabled={selected === 0}
              onClick={this.proccessFiles()}
              disabled={this.state.saveDisable}
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
