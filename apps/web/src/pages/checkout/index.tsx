import React, { useState } from "react";
import "./styles.css";
import { ContactForm, ContactFormData } from "../../components/contact-form";
import { PaymentSelection } from "../../components/payment-selection";
import { CheckoutSteps } from "../../components/checkout-steps";
import useCheckoutStore, { BankDetails } from "../../store/checkout-store";
import { CheckoutConfirmation } from "../../components/checkout-confirmation";
import { PromoCreateLogin } from "../../components/promo-create-login";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { BookingFormData, Room } from "~repo-shared";
import { format } from "date-fns";
import useSearchStore from "../../store/search-store";
import { bookingHotel } from "../../services/api/checkout";
import { formatBookingDates } from "../../utils/date-format";
import useUserStore from "../../store/user-store";
import { CheckoutHotelDetails } from "../../components/checkout-hotel-details";

export function RenderCheckout() {
  const steps = [
    { number: 1, title: "Select Room" },
    { number: 2, title: "Booking Details" },
    { number: 3, title: "Select Payment" },
    { number: 4, title: "Confirmation" },
  ];

  const {
    currentStep,
    contactDetail,
    selectedHotel,
    setCurrentStep,
    setPaymentMethod,
    setContactDetail,
    setSelectedRoom,
    selectedRoom,
    setNotes,
    notes,
  } = useCheckoutStore();
  const selectedRoomGuest = useSearchStore((state) => state.selectedRoomGuest);

  const { selectedDate } = useSearchStore();
  const { isLoggedIn } = useUserStore();

  const startDate = selectedDate.start?.toLocaleString();
  const endDate = selectedDate.end?.toLocaleString();

  const handleSubmit = (contactData: ContactFormData) => {
    setContactDetail(contactData);
    setCurrentStep(currentStep + 1);
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSubmit = async (method: BankDetails) => {
    setIsProcessing(true);
    if (!selectedHotel?.id || !selectedRoom?.id) {
      return;
    }

    const formattedDate = formatBookingDates(
      selectedDate.start as Date,
      selectedDate.end as Date
    );

    try {
      setPaymentMethod(method);
      const body: BookingFormData = {
        hotelId: selectedHotel.id,
        roomId: selectedRoom.id,
        email: contactDetail.email,
        fullName: contactDetail.fullName,
        phoneNumber: contactDetail.phoneNumber,
        paymentMethod: method.name,
        paymentAccountNumber: method.virtualAccount,
        checkIn: formattedDate.start,
        checkOut: formattedDate.end,
        notes,
      };
      setTimeout(() => {
        bookingHotel(body)
          .then((res) => {
            if (res.success) {
              setCurrentStep(currentStep + 1);
            }
          })
          .catch((error) => alert(error.toString()))
          .finally(() => setIsProcessing(false));
      }, 1000);
    } catch (error) {
      // Handle error
    } finally {
      setIsProcessing(false);
    }
  };

  const onSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-header">
        <div className="checkout-header-content">
          <div className="header-logo">Convertium</div>
          <CheckoutSteps steps={steps} currentStep={currentStep} />
        </div>
      </div>

      <div className="checkout-content-wrapper">
        <div className="checkout-content">
          {currentStep === 1 && !isLoggedIn && <PromoCreateLogin />}
          {currentStep === 1 && (
            <div className="column gap-y-2">
              <div className="checkout-content-card" style={{ flex: 1 }}>
                <CheckoutHotelDetails
                  img={selectedHotel?.images ?? ""}
                  address={selectedHotel?.address}
                  name={selectedHotel?.name}
                  star={selectedHotel?.classHotel}
                  description={selectedHotel?.description}
                  room={selectedRoomGuest.rooms}
                  checkIn={format(
                    selectedDate.start?.toString() ?? "",
                    "MMM dd, yyyy"
                  )}
                  checkOut={format(
                    selectedDate.end?.toString() ?? "",
                    "MMM dd, yyyy"
                  )}
                  guests={selectedRoomGuest.guests}
                />
                <div className="column p-2 gap-y-2">
                  <div className="column">
                    <p className="title">Add Notes (Optional)</p>
                    <input
                      placeholder="Please add one pillow.."
                      className="input"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                    />
                  </div>
                  <div className="column">
                    <div className="title">Select Room</div>
                    <div className="row gap-x-2">
                      {selectedHotel?.rooms?.map((room) => (
                        <div
                          key={room.id}
                          className={`checkout-content-card p-2 card-junior`}
                          style={{ flex: 1 }}
                        >
                          <div>
                            <div
                              className="row"
                              style={{ alignItems: "center" }}
                            >
                              <h2 style={{ flex: 1 }}>{room.type}</h2>
                              <div
                                className="column gap-y-2"
                                style={{ flex: 1 }}
                              >
                                {room.refundable && (
                                  <div className="refundable">Refundable</div>
                                )}
                                {!room.refundable && (
                                  <div className="not-refundable">
                                    Refundable
                                  </div>
                                )}
                              </div>
                            </div>
                            <h3>{room.description}</h3>
                          </div>
                          <div>
                            <div className="dashed-line" />
                          </div>
                          <strong>Facilities</strong>
                          <div className="column gap-y-2" style={{ flex: 1 }}>
                            <div className="column gap-y-2" style={{ flex: 1 }}>
                              {room?.facilities.split(",").map((facility) => (
                                <div key={facility}>
                                  <VscDebugBreakpointLog size={18} /> {facility}
                                </div>
                              ))}
                            </div>
                            <div className="column gap-y-2">
                              <div className="dashed-line" />
                              <div className="row justify-between">
                                <div>Availability:</div>
                                <strong>{room.totalCount} room left</strong>
                              </div>
                            </div>
                          </div>
                          <div
                            className="button-choose"
                            onClick={() => onSelectRoom(room)}
                          >
                            Choose Room
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="row gap-x-2">
              <div className="checkout-content-card" style={{ flex: 1 }}>
                <CheckoutHotelDetails
                  img={selectedHotel?.images ?? ""}
                  address={selectedHotel?.address}
                  name={selectedHotel?.name}
                  star={selectedHotel?.classHotel}
                  description={selectedHotel?.description}
                  room={selectedRoomGuest.rooms}
                  checkIn={format(
                    selectedDate.start?.toString() ?? "",
                    "MMM dd, yyyy"
                  )}
                  checkOut={format(
                    selectedDate.end?.toString() ?? "",
                    "MMM dd, yyyy"
                  )}
                  guests={selectedRoomGuest.guests}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="row gap-x-2">
              <ContactForm
                onSubmit={handleSubmit}
                buttonText="Select Payment"
              />
              <div className="checkout-content-card p-2">
                <div className="column gap-y-2" style={{ width: 300 }}>
                  <p className="subtotal-subtitle">
                    {selectedDate.start &&
                      format(
                        selectedDate.start.toString(),
                        "MMM dd, yyyy"
                      )}{" "}
                    {"->"}{" "}
                    {selectedDate.end &&
                      format(selectedDate.end?.toString(), "MMM dd, yyyy")}
                  </p>
                  <div className="column gap-y-2">
                    <div className="subtotal-title">
                      Room: {selectedRoom?.type}
                    </div>
                    <div className="subtotal-title">Days: 1 Night</div>
                  </div>
                  <div className="dashed-line" />
                  <div className="column gap-y-2" style={{ marginTop: 30 }}>
                    <div>SUBTOTAL</div>
                    <div className="row gap-x-2 subtotal-item">
                      <div>Room (per night)</div>
                      <div>${selectedRoom?.price}</div>
                    </div>

                    <div className="row gap-x-2 subtotal-item">
                      <div>Services</div>
                      <div>Free</div>
                    </div>
                    <div className="row gap-x-2 subtotal-item">
                      <div>Tax</div>
                      <div>${(selectedRoom?.price ?? 0) * 0.01}</div>
                    </div>
                  </div>
                  <div className="dashed-line" />
                  <div className="row gap-x-2 subtotal-item">
                    <h3>TOTAL: </h3>
                    <h3>
                      $
                      {(selectedRoom?.price ?? 0) +
                        (selectedRoom?.price ?? 0) * 0.01}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <PaymentSelection
                onSubmit={handlePaymentSubmit}
                loading={isProcessing}
              />
            </div>
          )}
          {currentStep === 4 && (
            <CheckoutConfirmation
              checkInDate={startDate && format(startDate, "MMM dd, yyyy")}
              checkOutDate={endDate && format(endDate, "MMM dd, yyyy")}
              totalPrice={`$ ${(selectedRoom?.price ?? 0) + (selectedRoom?.price ?? 0) * 0.01}`}
              email={contactDetail.email}
            />
          )}
        </div>
      </div>
    </div>
  );
}
