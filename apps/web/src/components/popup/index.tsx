import React, { ComponentPropsWithRef, ReactNode } from "react";
import './styles.css'

type Position = "top" | "bottom" | "left" | "right";

type PopupProps = {
  mainComponent: ReactNode;
  children: ReactNode;
  position?: Position;
  isShowPopup?: boolean;
} & ComponentPropsWithRef<"div">;

export const Popup = ({
  mainComponent,
  children,
  position = "top",
  isShowPopup = false,
}: PopupProps) => {
  const positionClass = `popup-position-${position}`;

  return (
    <div className="popup-container">
      {mainComponent}
      
      {isShowPopup && (
        <div className={`popup-content ${positionClass}`}>
          {children}
        </div>
      )}
    </div>
  );
};