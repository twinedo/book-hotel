import React, { useState } from "react";
import "./styles.css";
import { citySuggestions } from "../../utils/const";
import { HotelClass } from "../../components/hotel-class";
import { MdFreeBreakfast } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { FaParking, FaWifi } from "react-icons/fa";
import { ContactForm, ContactFormData } from "../../components/contact-form";
import { PaymentSelection } from "../../components/payment-selection";
import { CheckoutSteps } from "../../components/checkout-steps";
import useCheckoutStore, { BankDetails } from "../../store/checkout-store";
import { CheckoutConfirmation } from "../../components/checkout-confirmation";

export function RenderCheckout() {
  const steps = [
    { number: 1, title: "Booking Details" },
    { number: 2, title: "Select Payment" },
    { number: 3, title: "Confirmation" },
  ];

  const {
    currentStep,
    contactDetail,
    paymentMethod,
    selectedHotel,
    setCurrentStep,
    setPaymentMethod,
    setContactDetail,
    setSelectedHotel,
    resetCheckout,
  } = useCheckoutStore();

  const handleSubmit = (contactData: ContactFormData) => {
    console.log("contactData", contactData);
    setContactDetail(contactData)
    setCurrentStep(currentStep + 1);
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSubmit = async (method: BankDetails) => {
    setIsProcessing(true);
    try {
      setPaymentMethod(method)
      setCurrentStep(currentStep + 1);
    } catch (error) {
      // Handle error
    } finally {
      setIsProcessing(false);
    }
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
          {currentStep === 1 && <div className="promo-wrapper">
            <a className="promo-link" href="/auth" target="_blank">
              Create account
            </a>
            <span className="promo-divider">or</span>
            <a className="promo-link" href="/auth" target="_blank">
              Login
            </a>
            <span className="promo-divider"> to get more discount</span>
          </div>}
          {currentStep === 1 && (
            <div className="row gap-x-2">
              <div className="checkout-content-card" style={{ flex: 1 }}>
                <h2>Booking Details</h2>
                <div className="row gap-x-2">
                  <img
                    src={citySuggestions[0].imageSource}
                    className="booking-details-img"
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
                    Jun 1, 2025 {"->"} Jun 2, 2025
                  </p>
                  <div className="subtotal-title">Room: 1 Guest</div>
                  <div className="subtotal-title">Days: 1 Night</div>
                  <div className="column gap-y-2" style={{ marginTop: 30 }}>
                    <div>SUBTOTAL</div>
                    <div className="row gap-x-2 subtotal-item">
                      <div>Room (per night)</div>
                      <div>$300</div>
                    </div>

                    <div className="row gap-x-2 subtotal-item">
                      <div>Services</div>
                      <div>Free</div>
                    </div>
                    <div className="row gap-x-2 subtotal-item">
                      <div>Tax</div>
                      <div>$30</div>
                    </div>
                  </div>
                  <div className="row gap-x-2 subtotal-item">
                    <h3>TOTAL: </h3>
                    <h3>$330</h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="row gap-x-2">
              <ContactForm
                onSubmit={handleSubmit}
                buttonText="Select Payment"
              />
              <div className="column" style={{ width: 350 }} />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <PaymentSelection
                onSubmit={handlePaymentSubmit}
                loading={isProcessing}
              />
            </div>
          )}
          {currentStep === 3 && (
            <CheckoutConfirmation
              bookingNumber="BK20250601123456"
              checkInDate="Jun 1, 2025"
              checkOutDate="Jun 2, 2025"
              totalPrice="IDR 1,250,000"
              email={contactDetail.email}
            />
          )}
        </div>
      </div>
    </div>
  );
}
