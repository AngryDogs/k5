import React from 'react'

import AudioTrack from './audioTrack'

export default ({ audioTracks, playBlob, playing }) => {
  return (
    <ul className="list-group">
      {
        audioTracks &&
        audioTracks.map(track => (
          <AudioTrack
            key={track.name}
            audioTrack={track}
            playBlob={playBlob}
            playing={playing}
          />
        ))
      }
    </ul>
  )
}
