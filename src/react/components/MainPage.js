import React from 'react';
import { Paper, Button, Tabs, Tab, withStyles, Typography } from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import SwipeableViews from 'react-swipeable-views';
import { imageProps, renderProps } from '../../three/components/props';
import { setExposure, hdrToneMapping } from '../../three/components/base'
import { updateImage } from '../../three/textures/userTexture'
import {updateConv} from '../../three/components/convert';
import GridRenders from './GridRender';

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 0 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabGreen: {

  },
});


class MainPage extends React.Component {

  state = {
    showCanvas: false,
    openSaveDialog: false,
    tabVal: 0,
    cubeUpdated:false,
    exposure: renderProps.exposure / renderProps.maxExposure * 100
  }

  onSaveOpen = () => {
    this.setState(() => ({ openSaveDialog: true }))
  }
  onSaveClose = () => {
    this.setState(() => ({ openSaveDialog: false }))
  }
  onExposureChange = (e, val) => {

    this.setState(() => ({ exposure: val }));
    renderProps.exposure = (val * (renderProps.maxExposure / 100)).toFixed(2)
    setExposure()
  }
  onFileUpload = (e) => {
    const file = e.target.files[0];
    const format = file.name.split('.').slice(-1)[0]
    const formats = ['png', 'jpg', 'hdr']

    if (formats.includes(format)) {
      console.log(`File Accepted (${file.name.split('.').slice(-1)[0]})`)
      this.setState(() => ({ showCanvas: true }))
      imageProps.file = file;
      imageProps.loaded = true;
      imageProps.format = format;
      updateImage(() => {
        if (format === 'hdr') {
          hdrToneMapping(true);
        } else {
          hdrToneMapping(false);
        }
        this.setState(() => ({ exposure: renderProps.exposure / renderProps.maxExposure * 100 }))
      });
    } else {
      console.log(`Wrong File (${file.name.split('.').slice(-1)[0]})`)
      this.setState(() => ({ showCanvas: false }))
      imageProps.file = null;
      imageProps.loaded = false;
      imageProps.format = ''
    }


  }
  onTabChange = (e, tabVal) => {
    this.setState(() => ({ tabVal }),()=>{
      console.log('Update')
      if(!this.state.cubeUpdated){
        updateConv();
        this.setState(()=>({cubeUpdated:true}))
      }
    });
  }
  handleChangeIndex = index => {
    this.setState(()=>({ tabVal: index }));
  };
  render() {
    return (
      <div>
        <Paper style={{ paddingTop: 1, marginTop: 20, marginLeft: 'auto', marginRight: 'auto', width: '66vw', height: 'calc(36vw + 210px)', background: '#eee' }}>
          <Paper style={{ margin: 20, width: 320 }}>
            <Tabs
              value={this.state.tabVal}
              onChange={this.onTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label={"3D view"} />
              <Tab label={"CubeMap view"} />
            </Tabs>
          </Paper>
          <Paper
            id={'canv-container'}
            style={{ width: '64vw', height: '36vw', marginLeft: 'auto', marginRight: 'auto'}}
            // hidden={!this.state.showCanvas}
            
            elevation={3}
          >
            <SwipeableViews
              axis={'x'}
              index={this.state.tabVal}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer>
                <canvas
                  id={'MainCanvas'}
                  style={{ width: '64vw', height: '36vw', borderRadius: 4 }}
                />
              </TabContainer>
              <TabContainer>
                <GridRenders />
              </TabContainer>
            </SwipeableViews>

            <div>
              <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 550 }}>
                Exposure = {(this.state.exposure * (renderProps.maxExposure / 100)).toFixed(2)}
              </div>
              <Slider value={this.state.exposure} onChange={this.onExposureChange} />

            </div>
          </Paper>
          <input
            style={{ display: 'none' }}
            id="flat-button-file"
            type="file"
            onChange={this.onFileUpload}
          />
          <Paper style={{ width: '64vw', marginLeft: 'auto', marginRight: 'auto', marginTop: 60, background: '#ddd' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor="flat-button-file" style={{ margin: 4 }}>
                <Button variant="contained" component="span">
                  Upload HDRI
              </Button>
              </label>
              <Button onClick={this.onSaveOpen} variant="contained" component="span" disabled={!this.state.showCanvas} style={{ margin: 4 }}>
                Save
            </Button>
            </div>
          </Paper>
        </Paper>

      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MainPage);