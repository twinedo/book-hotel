import React, { useState } from "react";
import "./styles.css";
import { HotelClass } from "../hotel-class";
import { MdFreeBreakfast } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { FaParking, FaWifi } from "react-icons/fa";
import { citySuggestions } from "../../utils/const";
import useCheckoutStore from "../../store/checkout-store";

type ConfirmationProps = {
  bookingNumber: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: string;
  email: string;
};

export function CheckoutConfirmation({
  bookingNumber,
  checkInDate,
  checkOutDate,
  totalPrice,
  email,
}: ConfirmationProps) {
  const notes = useCheckoutStore((state) => state.notes);
  const contactDetail = useCheckoutStore((state) => state.contactDetail);
  const [viewBooking, setViewBooking] = useState(false)

  return (
    <div className="confirmation-container column gap-y-2">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <h1>YOUR BOOKING HAS BEEN CONFIRMED</h1>
          <p className="confirmation-subtext">
            We have sent booking confirmation to <strong>{email}</strong>
          </p>
        </div>

        <div className="confirmation-details">
          <div className="detail-row">
            <span className="detail-label">Check-in/Check-out:</span>
            <span className="detail-value">
              {checkInDate} → {checkOutDate}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Booking confirmation Number:</span>
            <span className="detail-value">{bookingNumber}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Total Price:</span>
            <span className="detail-value">{totalPrice}</span>
          </div>
        </div>

        <button className="confirmation-button" onClick={() => setViewBooking(!viewBooking)}>View Booking Details</button>
      </div>
      {viewBooking && <div className="row gap-x-2">
        <div className="checkout-content-card" style={{ flex: 1, padding: 20 }}>
          <h2>Booking Details</h2>
          <div className="row gap-x-2">
            <img
              src={citySuggestions[0].imageSource}
              style={{ width: 150, height: 100 }}
            />
            <div className="list-item-info-wrapper">
              <div className="hotel-title">Hotel Jakarta</div>
              <HotelClass star={4} />
              <div>4.5/5.0 (1,000 reviews)</div>
              <div>
                <h3>Facilities</h3>
                <div className="grid-facilities">
                  <div>
                    <MdFreeBreakfast size={18} /> Breakfast
                  </div>
                  <div>
                    <TbAirConditioning size={18} />
                    Air Conditioner
                  </div>
                  <div>
                    <FaWifi size={18} /> WiFi
                  </div>
                  <div>
                    <FaParking size={18} /> Parking
                  </div>
                </div>
              </div>
              {notes.length > 0 && (
                <div>
                  <h3>Notes</h3>
                  <input value={notes} className="input" disabled />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="checkout-content-card" style={{ flex: 1, padding: 20 }}>
          <h2>Guest Details</h2>
          <div className="row gap-x-2">
            <div className="list-item-info-wrapper">
              <div className="hotel-title">Name</div>
              <div>{contactDetail.fullName}</div>
              <div className="hotel-title">Phone Number</div>
              <div>{contactDetail.phoneNumber}</div>
              <div className="hotel-title">Email</div>
              <div>{contactDetail.email}</div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}
