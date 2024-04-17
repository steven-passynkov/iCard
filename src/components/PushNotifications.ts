import { useEffect } from "react";
import { PushNotifications } from "@capacitor/push-notifications";

const PushNotificationConfig = () => {
  useEffect(() => {
    registerPushNotifications();
  }, []);

  const registerPushNotifications = async () => {
    try {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === "prompt") {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== "granted") {
        throw new Error("User denied permissions!");
      }

      await PushNotifications.register();
      addNotificationListeners();
    } catch (error) {
      console.error("Error registering push notifications:", error);
    }
  };

  const addNotificationListeners = async () => {
    try {
      await PushNotifications.addListener("registration", (token) => {
        console.info("Registration token:", token.value);
      });

      await PushNotifications.addListener("registrationError", (err) => {
        console.error("Registration error:", err.error);
      });

      await PushNotifications.addListener(
        "pushNotificationReceived",
        (notification) => {
          console.log("Push notification received:", notification);
        }
      );

      await PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification) => {
          console.log(
            "Push notification action performed:",
            notification.actionId,
            notification.inputValue
          );
        }
      );

      getDeliveredNotifications();
    } catch (error) {
      console.error("Error adding notification listeners:", error);
    }
  };

  const getDeliveredNotifications = async () => {
    try {
      const notificationList =
        await PushNotifications.getDeliveredNotifications();
      console.log("Delivered notifications:", notificationList);
    } catch (error) {
      console.error("Error getting delivered notifications:", error);
    }
  };

  return null;
};

export default PushNotificationConfig;
