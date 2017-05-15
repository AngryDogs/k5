import React from 'react'
import RecordRTC from 'recordrtc'

const mediaConstraints = { audio: true, video: false }
const options = {
  mimeType: 'audio/ogg',
  audioBitsPerSecond: 128000
}
let recordRTC = null

export default ({
  onNewAudioBlob,
  changeAudioName,
  audioName,
  recording,
  toggleRecording,
  onSaveSound,
  onPlaySound,
  playing,
}) => {
  const startRecording = () => {
    navigator
      .mediaDevices
      .getUserMedia(mediaConstraints)
      .then((MediaStream) => {
        recordRTC = RecordRTC(MediaStream, options)
        recordRTC.startRecording()
      })
  }

  const stopRecording = () => {
    recordRTC
      .stopRecording((audioUrl) => {
        onNewAudioBlob(recordRTC.getBlob())
      })
  }

  const startStop = () => {
    toggleRecording()
    if (recording) {
      stopRecording()
    } else {
      startRecording()
    }
  }
  console.log(recordRTC)
  return (
    <div>
      <div className="d-flex">
        <input
          className="form-control"
          style={{ flex: 1 }}
          type="text"
          value={audioName}
          onChange={event => changeAudioName(event.target.value)}
        />
        <button
          className={`ml-2 btn btn-${recording ? 'danger' : 'primary'}`}
          onClick={startStop}
        >
          { recording ? 'stop' : 'record' }
        </button>
        <button
          className={`ml-2 btn btn-success`}
          onClick={onPlaySound}
        >
          { playing ? 'playing...' : 'play' }
        </button>
        <button
          className={`ml-2 btn btn-info`}
          onClick={onSaveSound}
        >
          save
        </button>
      </div>
    </div>
  )
}
