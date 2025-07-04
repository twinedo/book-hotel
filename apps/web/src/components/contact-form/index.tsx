import React, { useState } from "react";
import "./styles.css";

export type ContactFormData = {
  fullName: string;
  phoneNumber: string;
  email: string;
};

type ContactFormProps = {
  initialValues?: ContactFormData;
  onSubmit: (data: ContactFormData) => void;
  buttonText?: string;
  showHeader?: boolean;
};

export const ContactForm = ({
  initialValues = { fullName: "", phoneNumber: "", email: "" },
  onSubmit,
  buttonText = "Submit",
  showHeader = true,
}: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>(initialValues);
  const [errors, setErrors] = useState<ContactFormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const newErrors = {
      fullName: !formData.fullName.trim() ? "Full name is required" : "",
      phoneNumber: !formData.phoneNumber.trim()
        ? "Phone number is required"
        : !/^\d+$/.test(formData.phoneNumber)
          ? "Please enter a valid phone number"
          : "",
      email: !formData.email.trim()
        ? "Email is required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
          ? "Please enter a valid email"
          : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="checkout-content-card" style={{ flex: 1 }}>
      {showHeader && <h2>Contact Details</h2>}
      <form onSubmit={handleSubmit} className="column">
        <div className="form-group">
          <div>Fullname</div>
          <input
            name="fullName"
            placeholder="Full Name"
            className={`input ${errors.fullName ? "error" : ""}`}
            type="text"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>

        <div className="form-group">
          <div>Phone Number</div>
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            className={`input ${errors.phoneNumber ? "error" : ""}`}
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <span className="error-message">{errors.phoneNumber}</span>
          )}
        </div>

        <div className="form-group">
          <div>Email</div>
          <input
            name="email"
            placeholder="Email"
            className={`input ${errors.email ? "error" : ""}`}
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          {buttonText}
        </button>
      </form>
    </div>
  );
};
