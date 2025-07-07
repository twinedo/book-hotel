import React, { useMemo, useState } from 'react';
import './styles.css';
import { BankDetails } from '../../store/checkout-store';

type PaymentSelectionProps = {
  onSubmit: (bankDetails: BankDetails) => void;
  initialSelected?: BankDetails | null;
  loading?: boolean;
};

export const PaymentSelection = ({
  onSubmit,
  initialSelected = null,
  loading = false
}: PaymentSelectionProps) => {
  const [selectedBank, setSelectedBank] = useState<BankDetails | null>(initialSelected);
  const banks: BankDetails[] = useMemo(() => [
    {
      id: 'BCA',
      name: 'BCA Virtual Account',
      virtualAccount: `8${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    },
    {
      id: 'BNI',
      name: 'BNI Virtual Account',
      virtualAccount: `8${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    },
    {
      id: 'Mandiri',
      name: 'Mandiri Virtual Account',
      virtualAccount: `8${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    }
  ], []);

  const handleSubmit = () => {
    if (selectedBank) {
      onSubmit(selectedBank);
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Select Payment Method</h2>
      
      <div className="payment-options">
        {banks.map((bank) => (
          <div 
            key={bank.id}
            className={`payment-option ${selectedBank?.id === bank.id ? 'selected' : ''}`}
            onClick={() => setSelectedBank(bank)}
          >
            <div className="bank-info">
              <div className="bank-details">
                <h3>{bank.name}</h3>
                <p className="virtual-account">VA: {bank.virtualAccount}</p>
              </div>
            </div>
            <div className="radio-container">
              <input
                type="radio"
                id={bank.id}
                name="paymentMethod"
                checked={selectedBank?.id === bank.id}
                readOnly
              />
            </div>
          </div>
        ))}
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!selectedBank || loading}
      >
        {loading ? 'Processing...' : 'Confirm Payment'}
      </button>
    </div>
  );
};