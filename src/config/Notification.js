import React from "react";
import { useState } from "react";

const NotificationContext = React.createContext({
  notification: null,
  notificationText: null,
  success: () => {},
});

const STATES = {
  SUCCESS: "success",
  ERROR: "error",
};

const NotificationProvider = (props) => {
  const [notification, setNotification] = useState(null);
  const [notificationText, setNotificationText] = useState(null);
  const success = (text) => {
    window.scroll(0, 0);
    setNotificationText(text);
    setNotification(STATES.SUCCESS);
  };

  const clear = () => {
    setNotificationText(null);
    setNotification(null);
  };
  return (
    <NotificationContext.Provider
      value={{
        success,
        clear,
        notification,
        notificationText,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
export default NotificationContext;
