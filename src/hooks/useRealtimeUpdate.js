/* Connects & establish a websocket connection and listen for the server to emit events.
based on the events recieved, dispatch them to update the local state */

import { useEffect } from 'react';
import { SET_INTERVIEW } from 'reducers/application';

export default function useRealtimeUpdate(dispatch, updateSpots) {
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (typeof data === 'object' && data.type === SET_INTERVIEW) {
        //if it is valid event
        dispatch(data); //update the local state with the payload recieved from the server
        updateSpots(); //also updates the number of spots available
      }
    };
    return () => {
      socket.close();
    };
  }, [dispatch, updateSpots]);
}
