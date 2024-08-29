import React,{useEffect, useState} from 'react'
import ModalPopup from './ModalPopup';
import Cards from './Cards';
import GetMethod from '../../ApiCalls/GetMethod';
import LoginModalpopup from '../../middlewares/LoginModalpopup';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player'
function Home() {

  const state=useSelector((state)=>state?.Login);

  const {GetDataApi,response,loading,error}=GetMethod();
  const getApi=async()=>{
    try {
 await GetDataApi("/image/get","")
    } catch (error) {
    }
  }
  useEffect(()=>{
    getApi();
  },[state?.loginModal])
  if(loading)
  {
    <div>Loading...</div>
  }
  if(error)
  {
    <div>{error}</div>
  }


  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0); 
  const [volume, setVolume] = useState(0.8); 
  const [muted, setMuted] = useState(false); 
  const [playbackRate, setPlaybackRate] = useState(1.0); 
  const playerRef = React.useRef(null); 

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {

    console.log(state?.duration)
    const minutes = Math.floor(state.playedSeconds / 60);
    const remainingSeconds = Math.round(state.playedSeconds) % 60;

    console.log("minutes: "+ minutes + " " +  "remainingSeconds : " + remainingSeconds)
    setPlayed(state.played);
  };

  const handleSeek = (e) => {
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  // Volume change handler
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  // Mute/Unmute handler
  const handleMute = () => {
    setMuted(!muted);
  };

  // Playback rate change handler
  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };



  return (
    <div>
<div>
  <ModalPopup
  getApi={getApi}
  state={state?.loginModal}

  />
</div>
<div>
  <LoginModalpopup
  state={state?.loginModal}
  />
</div>


<ReactPlayer
        ref={playerRef}
        url="https://www.youtube.com/watch?v=RGYQ-_lAnRs"
        playing={playing}
        controls={true}
        volume={volume}
        muted={muted}
        playbackRate={playbackRate}
        onProgress={handleProgress}
      />


<div>
  {played}
        <button onClick={handlePlayPause}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleMute}>
          {muted ? 'Unmute' : 'Mute'}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={handleSeek}
        />
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={handleVolumeChange}
        />
        <select
          value={playbackRate}
          onChange={(e) => handlePlaybackRateChange(e.target.value)}
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>

<div>
  <Cards response={response}/>
</div>
</div>
  )
}

export default Home