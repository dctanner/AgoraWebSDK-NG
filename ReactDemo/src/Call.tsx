import React, { useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './hooks/useAgora';
import MediaPlayer from './components/MediaPlayer';
import './Call.css';

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

function Call() {
  const [ appid, setAppid ] = useState('fe6a8ff4faa24236b54c08312998f488');
  const [ token, setToken ] = useState('');
  const [ channel, setChannel ] = useState('1');
  const {
    localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);

  return (
    <div className='call'>
      <form className='call-form'>
        <label>
          AppID:
          <input type='text' name='appid' value='fe6a8ff4faa24236b54c08312998f488' onChange={(event) => { setAppid(event.target.value) }}/>
        </label>
        <label>
          Token(Optional):
          <input type='text' name='token' onChange={(event) => { setToken(event.target.value) }} />
        </label>
        <label>
          Channel:
          <input type='text' name='channel' value='1' onChange={(event) => { setChannel(event.target.value) }} />
        </label>
        <div className='button-group'>
          <button id='join' type='button' className='btn btn-primary btn-sm' disabled={joinState} onClick={() => {join(appid, channel, token)}}>Join</button>
          <button id='leave' type='button' className='btn btn-primary btn-sm' disabled={!joinState} onClick={() => {leave()}}>Leave</button>
        </div>
      </form>
      <div className='player-container'>
        <div className='local-player-wrapper'>
          <p className='local-player-text'>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `(${client.uid})` : ''}</p>
          <MediaPlayer videoTrack={localVideoTrack}></MediaPlayer>
        </div>
        {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
            <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
            <button type="button" onClick={() => client.setRemoteVideoStreamType(user.uid, 1).then(() => {
              console.log("Set LOW quality stream success!");
            }).catch(err => {
              console.log(err);
            })}>Use LOW quality stream</button>
            <button type="button" onClick={() => client.setRemoteVideoStreamType(user.uid, 0).then(() => {
              console.log("Set HIGH quality stream success!");
            }).catch(err => {
              console.log(err);
            })}>Use HIGH quality stream</button>
            <MediaPlayer videoTrack={user.videoTrack}></MediaPlayer>
          </div>))}
      </div>
    </div>
  );
}

export default Call;
