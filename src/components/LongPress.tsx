import { useState, useEffect, ReactNode } from "react";
import SheetModal from "./SheetModal";

const LongPress: React.FC<{
  children: ReactNode;
  header?: string;
  subHeader?: string;
  image?: string;
  buttons: Array<any>;
}> = ({ children, header, subHeader, image, buttons }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [held, setHeld] = useState(false);
  const [coordinates, setCoordinates] = useState({
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
  });
  let timeoutId: number | undefined;

  useEffect(() => {
    if (held) {
      timeoutId = window.setTimeout(() => {
        if (
          (held && coordinates.x === 0 && coordinates.y === 0) ||
          (held &&
            Math.abs(coordinates.x - coordinates.startX) <= 25 &&
            Math.abs(coordinates.y - coordinates.startY) <= 25)
        ) {
          setIsOpen(true);
        }
      }, 200);
    } else {
      window.clearTimeout(timeoutId);
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [held]);

  return (
    <div
      onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.id !== "reorder") {
          setHeld(true);
          setCoordinates((prevCoordinates) => ({
            ...prevCoordinates,
            startX: Math.round(event.clientX),
            startY: Math.round(event.clientY),
          }));
        }
      }}
      onMouseMove={(event) =>
        setCoordinates((prevCoordinates) => ({
          ...prevCoordinates,
          x: event.clientX,
          y: event.clientY,
        }))
      }
      onMouseUp={() => (isOpen ? <></> : setHeld(false))}
      onTouchStart={(event: React.TouchEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.id !== "reorder") {
          setHeld(true);
          setCoordinates((prevCoordinates) => ({
            ...prevCoordinates,
            startX: Math.round(event.touches[0].clientX),
            startY: Math.round(event.touches[0].clientY),
          }));
        }
      }}
      onTouchMove={(event) => {
        setCoordinates((prevCoordinates) => ({
          ...prevCoordinates,
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        }));
      }}
      onTouchEnd={() => (isOpen ? <></> : setHeld(false))}
    >
      {children}
      <SheetModal
        isOpen={isOpen}
        onDidDismiss={() => (setHeld(false), setIsOpen(false))}
        header={header}
        subHeader={subHeader}
        image={image}
        buttons={buttons}
      />
    </div>
  );
};

export default LongPress;
