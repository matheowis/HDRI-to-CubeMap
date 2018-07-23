import React from 'react';
import { Paper, Button } from '@material-ui/core';
import { imageProps } from '../../three/components/props';
import {updateImage} from '../../three/textures/userTexture'
class MainPage extends React.Component {

  state = {
    showCanvas: false,
    openSaveDialog: false
  }

  onSaveOpen = () => {
    this.setState(() => ({ openSaveDialog: true }))
  }
  onSaveClose = () => {
    this.setState(() => ({ openSaveDialog: false }))
  }

  onFileUpload = (e) => {
    const file = e.target.files[0];
    const format = file.name.split('.').slice(-1)[0]
    switch (format) {
      case 'png' || 'jpg' || 'hdr':
        console.log(`File Accepted (${file.name.split('.').slice(-1)[0]})`)
        this.setState(() => ({ showCanvas: true }))
        imageProps.file = file;
        imageProps.loaded = true;
        imageProps.format = format;
        updateImage();
        break;
      default:
        console.log(`Wrong File (${file.name.split('.').slice(-1)[0]})`)
        this.setState(() => ({ showCanvas: false }))
        imageProps.file = null;
        imageProps.loaded = false;
        imageProps.format = ''
        break;
    }
  }

  render() {
    return (
      <div>
        <Paper style={{ paddingTop: 20, marginTop: 20, marginLeft: 'auto', marginRight: 'auto', width: '66vw', height: 'calc(36vw + 90px)' }}>
          <Paper
            id={'canv-container'}
            style={{ width: '64vw', height: '36vw', marginLeft: 'auto', marginRight: 'auto' }}
            // hidden={!this.state.showCanvas}
            elevation={3}
          >
            <canvas
              id={'MainCanvas'}
              style={{ width: '64vw', height: '36vw', borderRadius: 4 }}
            // hidden={!this.state.showCanvas}
            />
          </Paper>
          <input
            style={{ display: 'none' }}
            id="flat-button-file"
            type="file"
            onChange={this.onFileUpload}
          />
          <Paper style={{ width: '64vw', marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }}>
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

export default MainPage;