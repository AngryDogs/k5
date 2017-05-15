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
          autoFocus
          onChange={event => changeAudioName(event.target.value)}
        />
        {
          !blob && (
            <button
              className={`ml-2 btn p-2 btn-outline-${recording ? 'danger' : 'primary'}`}
              onClick={startStop}
            >
              {
                recording ? (
                  <i className="fa fa-microphone-slash fa-2x" style={{ width: '32px', height: '32px' }}></i>
                ) : (
                  <i className="fa fa-microphone fa-2x" style={{ width: '32px', height: '32px' }}></i>
                )
              }
            </button>
          )
        }
        {
          blob && (
            <button
              className={`ml-2 btn p-2 btn-outline-${ playing ? 'danger' : 'success' }`}
              disabled={playing}
              onClick={() => onPlaySound(blob)}
            >
              {
                playing ? (
                  <i className="fa fa-pause fa-2x" style={{ width: '32px', height: '32px' }}></i>
                ) : (
                  <i className="fa fa-play fa-2x" style={{ width: '32px', height: '32px' }}></i>
                )
              }
            </button>
          )
        }
        {
          blob && (
            <button
              className={`ml-2 btn p-2 btn-outline-info`}
              disabled={playing}
              onClick={onSaveSound}
            >
              <i className="fa fa-save fa-2x" style={{ width: '32px', height: '32px' }}></i>
            </button>
          )
        }
        {
          blob && (
            <button
              className={`ml-2 btn p-2 btn-outline-danger`}
              disabled={playing}
              onClick={onCancel}
            >
              <i className="fa fa-close fa-2x" style={{ width: '32px', height: '32px' }}></i>
            </button>
          )
        }
      </div>
    </div>
  )
}
