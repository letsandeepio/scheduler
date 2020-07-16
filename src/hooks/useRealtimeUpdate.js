import { useEffect } from 'react';
import { SET_INTERVIEW } from 'reducers/application';

export default function useRealtimeUpdate(dispatch, updateSpots) {
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (typeof data === 'object' && data.type === SET_INTERVIEW) {
        dispatch(data);
        updateSpots();
      }
    };
    return () => {
      socket.close();
    };
  }, [dispatch, updateSpots]);
}
