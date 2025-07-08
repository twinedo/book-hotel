import React from "react";
import './styles.css';
import { Booking } from "~repo-shared";

interface BookingCardProps {
  booking: Booking;
  variant?: 'upcoming' | 'past';
  onCancel?: (bookingId: string) => void
}

export function BookingCard({ booking, variant = 'upcoming', onCancel }: BookingCardProps) {
  const statusColors = {
    CONFIRMED: '#4CAF50',
    PENDING: '#FFC107',
    CANCELLED: '#F44336',
    COMPLETED: '#9E9E9E'
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`booking-card ${variant}`}>
      <div className="booking-image">
        <img 
          src={booking?.hotel?.images} 
          alt={booking?.hotel?.name}
          className="image-hotel"
        />
      </div>
      
      <div className="booking-content">
        <div className="booking-header">
          <h3 className="hotel-name">{booking?.hotel?.name}</h3>
          <span 
            className="booking-status"
            style={{ backgroundColor: statusColors[booking.status] }}
          >
            {booking.status}
          </span>
        </div>
        
        <div className="booking-dates">
          <div className="date-range">
            <span className="date-label">Check-in:</span>
            <span>{formatDate(booking.checkIn)}</span>
          </div>
          <div className="date-range">
            <span className="date-label">Check-out:</span>
            <span>{formatDate(booking.checkOut)}</span>
          </div>
        </div>
        
        <div className="booking-details">
          <p className="hotel-address">
            <i className="icon-location"></i> {booking?.hotel?.address}
          </p>
          <p className="room-type">
            <i className="icon-bed"></i> {booking?.room?.type}
          </p>
        </div>
        
        <div className="booking-footer">
          <div className="price">
            Total: <span>${booking.totalPrice.toFixed(2)}</span>
          </div>
          {variant === 'upcoming' && (
            booking.status === 'CONFIRMED' && <button className="action-button" style={{background: 'red'}} onClick={() => onCancel?.(booking.id)}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}