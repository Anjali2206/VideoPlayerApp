import React, { useRef, useState, useEffect } from 'react';

const VideoPlayer = ({ src, autoplay, thumb }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('durationchange', updateDuration);
    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('durationchange', updateDuration);
    };
  }, []);

  const updateTime = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const updateDuration = () => {
    setDuration(videoRef.current.duration);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!isPlaying) {
      video.play().catch((error) => console.error('Autoplay error:', error));
    } else {
      video.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
    videoRef.current.playbackRate = parseFloat(e.target.value);
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  return (
    <div  onClick={togglePlay} style={{ cursor: 'pointer' }}>
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={updateTime}
        onDurationChange={updateDuration}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      ></video>

      <div className='flex'>
        <button className='border-2 m-2 py-2 px-3'>{isPlaying ? 'Pause' : 'Play'}</button>
        <input
          className='w-96'
          type='range'
          value={currentTime}
          min={0}
          max={duration}
          onChange={handleSeek}
        />
        
        <span className='border-2 m-2  py-2 px-3'>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <select className='border-2 ml-72 m-2 py-2 px-3' value={speed} onChange={handleSpeedChange}>
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
        <button className='border-2 m-2 p-2' onClick={toggleFullScreen}>
          Fullscreen
        </button>
      </div>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default VideoPlayer;
