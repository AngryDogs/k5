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
    }
    this.onNewAudioBlob = this.onNewAudioBlob.bind(this)
    this.changeAudioName = this.changeAudioName.bind(this)
    this.toggleRecording = this.toggleRecording.bind(this)
    this.onSaveSound = this.onSaveSound.bind(this)
    this.playBlob = this.playBlob.bind(this)
    this.onCancel = this.onCancel.bind(this)

    this.audioPlayer = null
  }

  onNewAudioBlob(blob) { this.setState({ blob: blob }) }

  changeAudioName(audioName) { this.setState({ newAudioName: audioName }) }

  toggleRecording(audioName) { this.setState({ recording: !this.state.recording }) }

  onSaveSound() {
    // TODO: Rain put stuff in mongu
    console.log('I tried to save, but it not do yet.')
  }

  onCancel() {
    this.setState({ playing: false, recording: false, blob: null })
  }

  playBlob(blob) {
    const audio = new Audio(blob && window.URL.createObjectURL(blob))
    audio.play()
    audio.onplay = () => this.setState({ playing: true })
    audio.onended = () => this.setState({ playing: false })
  }

  render() {
    const { blob, newAudioName, recording, playing } = this.state
    const mockTracks = [
      { name: '1yolo2', blob },
      { name: '2yolo3', blob },
      { name: '3yolo4', blob },
      { name: '4yolo5', blob },
    ]
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
          <div className="tracks-container">
            <AudioTracks
              audioTracks={
                mockTracks
                  .filter(track => track.name.toLowerCase().includes(newAudioName.toLowerCase()))
              }
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
