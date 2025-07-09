import React from "react";
import "./styles.css";
import { HotelClass } from "../hotel-class";

type CheckoutHotelDetailsProps = {
  img?: string;
  name?: string;
  star?: number;
  description?: string;
  address?: string;
  checkIn?: string;
  checkOut?: string;
  room?: number;
  guests: number;
};

export function CheckoutHotelDetails(props: CheckoutHotelDetailsProps) {
  const { img, name, star, description, address, checkIn, checkOut, room, guests } = props;

  return (
    <div className="hotel-detail-wrapper">
      <img className="hotel-detail-image" src={img} alt="image-detail" />
      <div className="hotel-detail-info">
        <div className="row gap-x-2">
          <strong>{name}</strong>
          <HotelClass star={star ?? 1} />
        </div>
        <p>{description}</p>
        <div className="row gap-x-2">
          <div className="column" style={{flex: 1}}>
            <strong>Location</strong>
            <input className="input" disabled value={address} />
          </div>
          <div className="column" style={{flex: 1}}>
            <strong>Check-in Date</strong>
            <input className="input" disabled value={checkIn} />
          </div>
          <div className="column" style={{flex: 1}}>
            <strong>Check-out Date</strong>
            <input className="input" disabled value={checkOut} />
          </div>
          <div className="column" style={{flex: 1}}>
            <strong>Rooms & Guest</strong>
            <input className="input" disabled value={`${room} Room(s) ${guests} Guest(s)`} />
          </div>
        </div>
      </div>
    </div>
  );
}
