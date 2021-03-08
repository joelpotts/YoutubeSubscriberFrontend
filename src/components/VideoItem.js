import React from 'react'

function VideoItem(props) {
    const url = props.url;
    const title = props.title;
    const imageUrl = props.imageUrl;
    const timestamp = new Date(props.timestamp).toDateString()

    return (
        <div className="card" style={{flexBasis: "25%", margin: "1em"}}>
            <img src={imageUrl} className="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p><b>Date Published: </b>{timestamp}</p>
                <a href={url} className="stretched-link"></a>
            </div>
        </div>
    );
}

export default VideoItem;