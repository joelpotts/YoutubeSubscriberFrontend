import React, { useEffect, useState } from 'react'
import {NotificationManager} from 'react-notifications';

function SubscriptionPage(props) {
    const [subList, setSubList] = useState([]);

    const deleteSubscription = async (channelId) => {
        try {
            const deleteResponse = await fetch(
                '/api/subscriptions/' + channelId, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Token ' + props.token
                    },
                }
            );

            if(!deleteResponse.ok) {
                throw Error(deleteResponse.statusText);
            }
            else {
                let newSubList = subList.filter(subscription => subscription.id != channelId);
                setSubList(newSubList);
            }

        } catch (error) {
            NotificationManager.error('Failed to remove the subscription');
        }
    }

    useEffect(
        () => {
            if(props.token)
            {
                console.log(props.token);
                fetch('/api/subscriptions/', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + props.token
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setSubList(data);
                })
                .catch(error => {
                    NotificationManager.error('Failed to load your subscription.');
                });
            }
        },
        [props.token]
    )

    return (
        <div className="container">
            <h1>My Subscriptions</h1>
            <div className="list-group">
                {subList.map(subscription => 
                    <div key={subscription.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <p className="m-0">{subscription.channel}</p>
                        <button className="btn btn-danger" onClick={() => deleteSubscription(subscription.id)}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SubscriptionPage