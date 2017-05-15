import React from 'react'

export default ({ audioTrack, playBlob, playing }) => {
  return (
    <li className="list-group-item justify-content-between">
      {audioTrack.name}
      {
        audioTrack.blob && (
          <button
            className={`ml-2 btn btn-${ playing ? 'danger' : 'success' }`}
            disabled={playing}
            onClick={() => playBlob(audioTrack.blob)}
          >
            { playing ? 'playing...' : 'play' }
          </button>
        )
      }
    </li>
  )
}
