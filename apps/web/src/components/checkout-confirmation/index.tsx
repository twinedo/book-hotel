import React, { useState } from "react";
import "./styles.css";
import { HotelClass } from "../hotel-class";
import useCheckoutStore from "../../store/checkout-store";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { useNavigate } from "react-router";
import useSearchStore from "../../store/search-store";

type ConfirmationProps = {
  checkInDate: string | undefined;
  checkOutDate: string | undefined;
  totalPrice: string;
  email: string;
};

export function CheckoutConfirmation({
  checkInDate,
  checkOutDate,
  totalPrice,
  email,
}: ConfirmationProps) {
  const navigate = useNavigate();
  const { contactDetail, selectedHotel, selectedRoom, notes, resetCheckout } =
    useCheckoutStore();
  const { resetSearch } = useSearchStore();
  const [viewBooking, setViewBooking] = useState(false);

  const onBackHome = () => {
    resetCheckout();
    resetSearch();
    navigate("/");
  };

  return (
    <div className="confirmation-container column gap-y-2">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <h1>YOUR BOOKING HAS BEEN CONFIRMED</h1>
          <p className="confirmation-subtext">
            We have confirmed your booking with email <strong>{email}</strong>
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
            <span className="detail-label">Total Price:</span>
            <span className="detail-value">{totalPrice}</span>
          </div>
        </div>

        <button
          className="confirmation-button"
          onClick={() => setViewBooking(!viewBooking)}
        >
          View Booking Details
        </button>
      </div>
      {viewBooking && (
        <div className="row gap-x-2">
          <div
            className="checkout-content-card"
            style={{ width: "300px", overflow: "hidden" }}
          >
            <img src={selectedHotel?.images} className="booking-detail-image" />
            <div className="row gap-x-2 p-2">
              <div className="list-item-info-wrapper">
                <div className="hotel-title">{selectedHotel?.name}</div>
                <HotelClass star={selectedHotel?.classHotel ?? 1} />
                <div>{selectedHotel?.description}</div>
                <div>
                  <h3>Facilities</h3>
                  <div className="grid-facilities">
                    {selectedRoom?.facilities.split(",").map((facility) => (
                      <div>
                        <VscDebugBreakpointLog size={18} /> {facility}
                      </div>
                    ))}
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

          <div
            className="checkout-content-card"
            style={{ width: "300px", padding: 20 }}
          >
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
        </div>
      )}

      <button
        className="confirmation-button"
        style={{ background: "red" }}
        onClick={onBackHome}
      >
        Back to Home
      </button>
    </div>
  );
}
