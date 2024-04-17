import { LocalNotifications } from "@capacitor/local-notifications";

interface LocalNotificationProps {
  title?: string;
  body?: string;
  id?: number;
  schedule?: Date;
  sound?: string;
}

export const LocalNotification = ({
  title,
  body,
  id,
  schedule,
  sound,
}: LocalNotificationProps = {}) => {
  const scheduleNotification = async () => {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title || "",
          body: body || "",
          id: id || 1,
          schedule: { at: schedule || new Date(Date.now() + 5000) },
          sound: sound || "beep.wav",
        },
      ],
    });
  };

  return { scheduleNotification };
};

export default LocalNotification;
