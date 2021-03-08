import React, { useState } from 'react'
import {NotificationManager} from 'react-notifications';

// Import my components
import VideoList from '../components/VideoList'

function MyFeedPage(props) {
    const [newChannel, setNewChannel] = useState("")

    const addSubscription = async (event) => {
        // Stop the page from reloading
        event.preventDefault()

         // Post new channel
         try{
            const addSubResponse = await fetch(
                '/api/subscriptions/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + props.token,
                    },
                    body: JSON.stringify({
                        'channel': newChannel,
                    }),
                }
            );
            console.log("Response status code: " + addSubResponse.status);
            console.log("Response OK: " + addSubResponse.ok);
            if(!addSubResponse.ok){
                console.log(addSubResponse.statusText);
                throw Error(addSubResponse.statusText);
            }
            const responseJson = await addSubResponse.json();
            console.log(responseJson);
            NotificationManager.success('Successfully added subscription: ' + newChannel);
        } catch (error) {
            NotificationManager.error('Failed to add subscription: ' + newChannel);
            console.log(error);
        }
    }


    return (
        <div className="container">
            <h1>My Feed</h1>

            {props.token
            ?<>
                <div id="add-channel">
                    <form action="" id="add-channel-form">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Add a Channel</span>
                            </div>
                            <input 
                                className="form-control" 
                                type="text" name="channel"
                                id="channel-input"
                                placeholder="Channel ID"
                                value={newChannel}
                                onChange={event => setNewChannel(event.target.value)}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit" onClick={(event) => addSubscription(event)}>Add</button>
                            </div>
                        </div>
                    </form>
                </div>
                <VideoList token={props.token}/>
            </>
            : <h2>Please sign in to see your video feed.</h2>
            }

            
            
            
        </div>
    );
}

export default MyFeedPage;