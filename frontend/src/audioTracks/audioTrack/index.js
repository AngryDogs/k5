import React from 'react'

export default ({ audioTrack, playBlob, playing }) => {
  return (
    <li className="list-group-item justify-content-between">
      {audioTrack.name}
      {
        audioTrack.blob && (
          <button
            className={`ml-2 btn p-2 btn-outline-${ playing ? 'danger' : 'success' }`}
            disabled={playing}
            onClick={() => {
              fetch(`http://localhost:1335/${audioTrack.blob.path}`, {
                method: 'GET',
              })
              .then(response => response.blob())
              .then(res => playBlob(res))
            }}
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
    </li>
  )
}
