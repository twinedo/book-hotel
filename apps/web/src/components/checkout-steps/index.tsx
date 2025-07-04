import React from 'react';
import './styles.css'

type Step = {
  number: number;
  title: string;
};

type StepsProps = {
  steps: Step[];
  currentStep: number;
};

export function CheckoutSteps({ steps, currentStep }: StepsProps) {
  return (
    <div className="checkout-header-step-wrapper">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className={index < currentStep ? 'checkout-header-step' : 'checkout-header-step-disabled'}>
            <div className="checkout-header-step-number">{step.number}</div>
            <h3 className={index < currentStep ? 'checkout-header-step-title' : ''}>
              {step.title}
            </h3>
          </div>
          {index < steps.length - 1 && <div className="dashed-line" />}
        </React.Fragment>
      ))}
    </div>
  );
};