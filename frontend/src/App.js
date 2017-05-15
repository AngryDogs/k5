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
    this.onPlayBlob = this.onPlayBlob.bind(this)
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

  onPlayBlob(blob) {
    const audio = new Audio(blob && window.URL.createObjectURL(blob))
    audio.play()
    audio.onplay = () => this.setState({ playing: true })
    audio.onended = () => this.setState({ playing: false })
  }

  render() {
    const { blob, newAudioName, recording, playing } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to <span className="text-success">audimoosoundsonline</span>.biz.gov.uk.ru.mobi</h2>
        </div>
        <div className="App-intro d-flex justify-content-center">
          <h3 className="text-success px-3 pt-3">type it!</h3>
          <h3 className="text-primary px-3 pt-3">record it!</h3>
          <h3 className="text-info px-3 pt-3">save it!</h3>
        </div>
        <div className="container">
          <AudioInput
            blob={this.state.blob}
            onNewAudioBlob={this.onNewAudioBlob}
            audioName={newAudioName}
            changeAudioName={this.changeAudioName}
            toggleRecording={this.toggleRecording}
            recording={recording}
            onSaveSound={this.onSaveSound}
            onPlaySound={this.onPlayBlob}
            playing={playing}
            onCancel={this.onCancel}
          />
        </div>
      </div>
    )
  }
}

export default App
