import React, { useEffect, useState } from 'react'
import {NotificationManager} from 'react-notifications';

import VideoItem from './VideoItem'

function VideoList(props){
  /*
    Video data format:
      {
        'url': '-MTSQjw5DrM',
        'title': 'RESTful APIs in 100 Seconds // Build an API from Scratch with Node.js Express',
        'image_url': 'https://i.ytimg.com/vi/-MTSQjw5DrM/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDe_tl8Blsk3WgeWw7IPnsoEMgHJA',
        'timestamp': '2021-02-19T14:06:27.933234'
      },
  */
    const [videoData, setVideoData] = useState([]);

    useEffect(
      () => {
        fetch('/api/videos/', {
          method: 'GET',
          headers: {
            'Authorization': 'Token ' + props.token
          }
        })
        .then(response => response.json())
        .then(data => {
          data.results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setVideoData(data["results"]);
        })
        .catch(error => {
          NotificationManager.error('Failed to load your subscription.');
        });
      },
      []
    );
  
    return (
        <div className="container d-flex flex-wrap justify-content-center">
            {videoData.map((videoItem) => 
                <VideoItem key={videoItem.url} url={videoItem.url} title={videoItem.title} imageUrl={videoItem.image_url.split("?")[0]} timestamp={videoItem.timestamp} />
            )}
        </div>
    );
}

export default VideoList;