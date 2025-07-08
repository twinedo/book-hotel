import React, { useEffect, useState } from "react";
import "./styles.css";
import { citySuggestions } from "../../utils/const";
import { HotelClass } from "../../components/hotel-class";
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
    resetCheckout,
    notes,
  } = useCheckoutStore();

  const { selectedDate } = useSearchStore();
  const {user, isLoggedIn} = useUserStore()

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
      selectedDate?.start as Date,
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
      console.log("bodycok", body);
      setTimeout(() => {
        bookingHotel(body)
          .then((res) => {
            console.log('ress', res)
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

  useEffect(() => {
    return () => {
      resetCheckout();
    };
  }, []);

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
                <div className="row gap-x-2">
                  <img
                    src={selectedHotel?.images}
                    className="booking-details-img"
                  />
                  <div className="list-item-info-wrapper">
                    <h1 className="hotel-title">{selectedHotel?.name}</h1>
                    <HotelClass star={selectedHotel?.classHotel ?? 1} />
                    <div>4.5/5.0 (1,000 reviews)</div>
                    <div>
                      {/* <h3>Facilities</h3> */}
                      <p>{selectedHotel?.description}</p>
                    </div>
                    <div>
                      <h3>Add Notes (Optional)</h3>
                      <input
                        placeholder="Please add one pillow.."
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                <h2>Select Room</h2>
                <div className="row gap-x-2">
                  {selectedHotel?.rooms?.map((room) => (
                    <div
                      key={room.id}
                      className="checkout-content-card"
                      style={{ flex: 1 }}
                    >
                      <div>
                        <h2>{room.type}</h2>
                        <h3>{room.description}</h3>
                      </div>
                      <div>Facilities</div>
                      <div className="row gap-x-2">
                        <div className="column gap-y-2" style={{ flex: 1 }}>
                          {room?.facilities.split(",").map((facility) => (
                            <div key={facility}>
                              <VscDebugBreakpointLog size={18} /> {facility}
                            </div>
                          ))}
                        </div>
                        <div className="column gap-y-2" style={{ flex: 1 }}>
                          <div>
                            Refundable:{" "}
                            {room.refundable ? "Refundable" : "Non Refundable"}
                          </div>
                          <div
                            className="button-search"
                            onClick={() => onSelectRoom(room)}
                          >
                            Choose Room
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="row gap-x-2">
              <div className="checkout-content-card" style={{ flex: 1 }}>
                <h2>Booking Details</h2>
                <div className="row gap-x-2">
                  <img
                    src={selectedHotel?.images}
                    className="booking-details-img"
                  />
                  <div className="list-item-info-wrapper">
                    <div className="hotel-title">{selectedHotel?.name}</div>
                    <HotelClass star={selectedHotel?.classHotel ?? 1} />
                    <div>4.5/5.0 (1,000 reviews)</div>
                    <div>
                      <h3>Facilities</h3>
                      <div className="grid-facilities">
                        {selectedHotel?.facilities
                          .split(",")
                          .map((facility) => (
                            <div key={facility}>
                              <VscDebugBreakpointLog size={18} /> {facility}
                            </div>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h3>Add Notes (Optional)</h3>
                      <input
                        placeholder="Please add one pillow.."
                        className="input"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="checkout-content-card">
                <div className="column" style={{ width: 300 }}>
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
                  <div className="subtotal-title">
                    Room: {selectedRoom?.type}
                  </div>
                  <div className="subtotal-title">Days: 1 Night</div>
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

          {currentStep === 2 && (
            <div className="row gap-x-2">
              <ContactForm
                onSubmit={handleSubmit}
                buttonText="Select Payment"
              />
              <div className="column" style={{ width: 350 }} />
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
