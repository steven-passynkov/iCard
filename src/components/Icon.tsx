import { IonIcon } from "@ionic/react";
import * as icons from "ionicons/icons";

export interface Platform {
  Instagram?: string;
  Snapchat?: string;
  Tiktok?: string;
  Twitter?: string;
  WhatsApp?: string;
}

export const Icon: React.FC<{
  icon?: keyof Platform;
}> = ({ icon }) => {
  const iconList = [
    { Instagram: icons.logoInstagram },
    { Snapchat: icons.logoSnapchat },
    { Tiktok: icons.logoTiktok },
    { Twitter: icons.logoTwitter },
    { WhatsApp: icons.logoWhatsapp },
  ];

  type Platforms = keyof Platform;
  const getIcon = (key: Platforms) =>
  iconList.find((object) => object.hasOwnProperty(key))?.[key];

  return (
    <IonIcon slot="start" size="large" icon={icon && getIcon(icon)} />
  );
};

export default Icon;
