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
  blob,
  onCancel,
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
  return (
    <div>
      <div className="d-flex">
        <input
          className="form-control"
          style={{ flex: 1 }}
          type="text"
          value={audioName}
          placeholder="audiotrack's name..."
          onChange={event => changeAudioName(event.target.value)}
        />
        <button
          className={`ml-2 btn btn-${recording ? 'danger' : 'primary'}`}
          onClick={startStop}
        >
          { recording ? 'stop' : 'record' }
        </button>
        {
          blob && (
            <button
              className={`ml-2 btn btn-${ playing ? 'danger' : 'success' }`}
              disabled={playing}
              onClick={() => onPlaySound(blob)}
            >
              { playing ? 'playing...' : 'play' }
            </button>
          )
        }
        {
          blob && (
            <button
              className={`ml-2 btn btn-info`}
              disabled={playing}
              onClick={onSaveSound}
            >
              save
            </button>
          )
        }
        {
          blob && (
            <button
              className={`ml-2 btn btn-danger`}
              disabled={playing}
              onClick={onCancel}
            >
              cancel
            </button>
          )
        }
      </div>
    </div>
  )
}
