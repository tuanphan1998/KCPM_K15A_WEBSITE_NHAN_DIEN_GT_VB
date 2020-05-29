import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';

// Import face profile
const JSON_PROFILE = require('../descriptors/bnk48.json');

const WIDTH = 100;
const HEIGHT = 50;
const inputSize = 128;

class VideoInput extends Component {
  constructor(props) {
    super(props);
    this.webcam = React.createRef();
    this.state = {
      fullDesc: null,
      detections: null,
      descriptors: null,
      faceMatcher: null,
			match: null,
			camxuc : null,
      facingMode: null
    };
  }

  componentWillMount = async () => {
    await loadModels();
    this.setState({ faceMatcher: await createMatcher(JSON_PROFILE) });
    this.setInputDevice();
  };

  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      let inputDevice = await devices.filter(
        device => device.kind === 'videoinput'
      );
      if (inputDevice.length < 2) {
        await this.setState({
          facingMode: 'user'
        });
      } else {
        await this.setState({
          facingMode: { exact: 'environment' }
        });
      }
      this.startCapture();
    });
  };

  startCapture = () => {
    this.interval = setInterval(() => {
      this.capture();
    }, 1500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  capture = async () => {
    if (!!this.webcam.current) {
      await getFullFaceDescription(this.webcam.current.getScreenshot(), inputSize ).then(fullDesc => {
        if (!!fullDesc) {
          this.setState({
            detections: fullDesc.map(fd => fd.detection),
						descriptors: fullDesc.map(fd => fd.descriptor),
						gender : fullDesc.map(fd => fd.gender),
						age : fullDesc.map(fd => fd.age),
						camxuc : fullDesc.map(fd => fd.expressions),
					});
					this.props.camxucCuaNhanVienss(this.state.camxuc[0]);
				
				}
      });

      if (!!this.state.descriptors && !!this.state.faceMatcher) {
        let match = await this.state.descriptors.map(descriptor =>
					this.state.faceMatcher.findBestMatch(descriptor)
        );
        this.setState({ match });
			}
			this.props.LuuGiaTriKhuonMats2(this.state.match);
			this.props.LuuGiaTriKhuonMats3(this.state.age);
		}
	};


  render() {
    const { detections, match, facingMode } = this.state;
    let videoConstraints = null;
    if (!!facingMode) {
      videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: facingMode
      };
    }

    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {!!match && !!match[i] ? (
                <p
                  style={{
										width: _W,
										fontSize:20,
                    marginTop: 8,
                    color: '#339999',
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  {match[i]._label}
									{this.props.duaRaKetQua3sss(match[i]._label)}
									<br/>
                  {this.state.gender}
                  <br/>
                  {Math.ceil(this.state.age)}
									
                </p>
              ) : null}
            </div>
          </div>
        );
      });
    }

    return (
      <div
        className="Camera"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
       <i>
        <div style={{  width: WIDTH,  height: HEIGHT }}>
          <div style={{ position: 'relative', width: WIDTH }}>
            {!!videoConstraints ? (
              <div style={{ position: 'absolute' }}>
                <Webcam
                  audio={false}
                  width={WIDTH}
                  height={HEIGHT}
                  ref={this.webcam}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
            ) : null}
            {!!drawBox ? drawBox : null}
          </div>
        </div>
				</i>
      </div>
    );
  }
}

export default (VideoInput);
