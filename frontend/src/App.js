import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import AudioInput from './audioInput'

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
    this.onPlaySound = this.onPlaySound.bind(this)
  }

  onNewAudioBlob(blob) { this.setState({ blob: blob }) }

  changeAudioName(audioName) { this.setState({ newAudioName: audioName }) }

  toggleRecording(audioName) { this.setState({ recording: !this.state.recording }) }

  onSaveSound() {
    // TODO: Rain put stuff in mongu
    console.log('I tried to save, but it not do yet.')
  }

  onPlaySound() {
    // TODO: Marten make the play thingy
    console.log('I tried to play, but it not do yet.')
  }

  render() {
    const { blob, newAudioName, recording, playing } = this.state
    console.log(this.state)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="container">
          <AudioInput
            onNewAudioBlob={this.onNewAudioBlob}
            audioName={newAudioName}
            changeAudioName={this.changeAudioName}
            toggleRecording={this.toggleRecording}
            recording={recording}
            onSaveSound={this.onSaveSound}
            onPlaySound={this.onPlaySound}
            playing={playing}
          />
          <audio controls src={blob && window.URL.createObjectURL(blob)} type="audio/webm" />
        </div>
      </div>
    )
  }
}

export default App
