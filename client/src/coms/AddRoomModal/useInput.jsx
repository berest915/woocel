import { useState } from "react";

export const useInput = initialValue => {
  const [roomname, setRoomname] = useState(initialValue);

  return {
    roomname,
    setRoomname,
    reset: () => setRoomname(""),
    bind: {
      roomname,
      onChange: e => {
        setRoomname(e.target.value);
      },
    },
  };
};
