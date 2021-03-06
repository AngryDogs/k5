import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import AudioInput from './audioInput'
import AudioTracks from './audioTracks'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blob: null,
      newAudioName: '',
      recording: false,
      playing: false,
      audioTracks: [],
    }
    this.onNewAudioBlob = this.onNewAudioBlob.bind(this)
    this.changeAudioName = this.changeAudioName.bind(this)
    this.toggleRecording = this.toggleRecording.bind(this)
    this.onSaveSound = this.onSaveSound.bind(this)
    this.playBlob = this.playBlob.bind(this)
    this.onCancel = this.onCancel.bind(this)

    this.addData = this.addData.bind(this)
    this.fetchAllData = this.fetchAllData.bind(this)

    this.audioPlayer = null
  }

  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData() {
    fetch("http://localhost:1335/all").then(res => {
      return res.json();
    }).then(res => {
      this.setState({
        audioTracks: res,
      });
    });
  }

  addData() {
    const { newAudioName, blob } = this.state;
    let fd = new FormData()
    fd.append('blob', blob, newAudioName);

    fetch("http://localhost:1335/add", {
      method: 'POST',
      body: fd,
    }).then(res => {
      this.setState({ playing: false, recording: false, blob: null, newAudioName: '' })
      this.fetchAllData();
    });
  }

  onNewAudioBlob(blob) { this.setState({ blob: blob }) }

  changeAudioName(audioName) { this.setState({ newAudioName: audioName }) }

  toggleRecording(audioName) { this.setState({ recording: !this.state.recording }) }

  onSaveSound() {
    this.addData();
  }

  onCancel() {
    this.setState({ playing: false, recording: false, blob: null, newAudioName: '' })
  }

  playBlob(blob) {
    const audio = new Audio(blob && window.URL.createObjectURL(blob))
    audio.play()
    audio.onplay = () => this.setState({ playing: true })
    audio.onended = () => this.setState({ playing: false })
  }

  render() {
    const { blob, newAudioName, recording, playing, audioTracks } = this.state
    const filteredAudioTracks = audioTracks
      .filter(track => track.name && track.name.toLowerCase().includes(newAudioName.toLowerCase()))
    return (
      <div className="App">
        <div className="App-header">
          <div style={{ position: 'absolute', top: '35px', left: 0, width: '100%', opacity: 0.5 }}>
            <i className="text-success fa px-2 fa-eur fa-5x"></i>
            <i className="text-info fa px-2 fa-dollar fa-5x"></i>
            <i className="text-danger fa px-2 fa-jpy fa-5x"></i>
          </div>
          <i className="App-logo fa fa-music fa-5x"></i>
          <h2>Welcome to <span className="text-success">audimoosoundsonline</span>.biz.gov.uk.ru.mobi</h2>
        </div>
        <div className="App-intro d-flex justify-content-center">
          <h3 className="text-success px-3 pt-3 pb-2">type it!</h3>
          <h3 className="text-primary px-3 pt-3 pb-2">record it!</h3>
          <h3 className="text-info px-3 pt-3 pb-2">save it!</h3>
        </div>

        <div className="container">
          <div className="input-container pb-3">
            <AudioInput
              blob={this.state.blob}
              onNewAudioBlob={this.onNewAudioBlob}
              audioName={newAudioName}
              changeAudioName={this.changeAudioName}
              toggleRecording={this.toggleRecording}
              recording={recording}
              onSaveSound={this.onSaveSound}
              onPlaySound={this.playBlob}
              playing={playing}
              onCancel={this.onCancel}
            />
          </div>
          {
            (blob && filteredAudioTracks.filter(track => track.name.toLowerCase() === newAudioName.toLowerCase()).length) ? (
              <div className="pb-2">
                <h2>
                  <span className="text-warning">
                    Saving this sound will overwrite an existing sound
                  </span>
                </h2>
              </div>
            ) : ''
          }
          <div className="tracks-container">
            <AudioTracks
              audioTracks={filteredAudioTracks}
              playBlob={this.playBlob}
              playing={playing}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
