import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

interface PaymentButtonProps {
  amount: number;
  currency: string;
  txRef: string;
  customer: {
    email: string;
    name: string;
    phone_number: string;
  };
  onSuccess: (transactionId: number, txRef: string) => void;
  onClose: () => void;
  className?: string;
  children?: React.ReactNode;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  currency,
  txRef,
  customer,
  onSuccess,
  onClose,
  className,
  children
}) => {
  const config = {
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY || '',
    tx_ref: txRef,
    amount,
    currency,
    payment_options: 'card, mobilemoney, ussd, banktransfer',
    customer,
    customizations: {
      title: 'Dev ninja Web',
      description: 'Payment for growth strategy',
      logo: 'https://picsum.photos/seed/agency/200/200',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
      className={className}
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            if (response.status === 'successful') {
              onSuccess(response.transaction_id, response.tx_ref);
            }
            closePaymentModal();
          },
          onClose,
        });
      }}
    >
      {children || `Pay ${currency} ${amount}`}
    </button>
  );
};

export default PaymentButton;
