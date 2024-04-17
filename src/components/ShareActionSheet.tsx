import { ReactNode } from "react";
import { Share } from "@capacitor/share";

export const ShareActionSheet: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  //connect to database to get the title, text, url and dialogTitle
  const share = async () => {
    await Share.share({
      title: "See cool stuff",
      text: "Really awesome thing you need to see right meow",
      url: "http://ionicframework.com/",
      dialogTitle: "Share with buddies",
    });
  };
  return (
    <>
      {children !== undefined ? (
        <div onClick={() => share()}>{children}</div>
      ) : (
        <div onClick={() => share()} />
      )}
    </>
  );
};

export default ShareActionSheet;
