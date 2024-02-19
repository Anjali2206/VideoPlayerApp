import React from 'react';

const Playlist = ({ playlist, onSelectVideo }) => {
  const handleSelectVideo = (video) => {
    onSelectVideo(video);
  };

  return (
    <div className='border-2 p-4'>
      <h2 className='mb-4 border-2 p-4'>Playlist</h2>
      {playlist.map((video) => (
        <div  key={video.id} onClick={() => handleSelectVideo(video)} className="flex items-center mb-5 cursor-pointer">
          <img src={video.thumb} alt={video.title} className="w-22 h-20 mr-2" />
          <p>{video.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
