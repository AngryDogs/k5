import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RecordRTC from 'recordrtc'
var mediaConstraints = { video: true, audio: true };

class App extends Component {
  successCallback(stream) {
      // RecordRTC usage goes here

      var options = {
        mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 128000,
        bitsPerSecond: 128000 // if this line is provided, skip above two
      };
      recordRTC = RecordRTC(stream, options);
      recordRTC.startRecording();
  }

  errorCallback(error) {
    // maybe another application is using the device
}

  errorCallback(error) {
      // maybe another application is using the device
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          onClick={
            () => (
            navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback).catch(this.errorCallback)
          )}
        >
          1
        </button>
        <button
          onClick={
            () => {
                recordRTC.stopRecording(function (audioVideoWebMURL) {
                    video.src = audioVideoWebMURL;

                    var recordedBlob = recordRTC.getBlob();
                    recordRTC.getDataURL(function(dataURL) { });
                })
            }
          }
        >
          2
        </button>
      </div>
    );
  }
}

export default App;
