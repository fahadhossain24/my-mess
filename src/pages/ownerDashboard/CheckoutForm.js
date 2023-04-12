import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';

const CheckoutForm = ({ paymentAmount, currentMember }) => {
    const { name, emailAddress } = currentMember
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (paymentAmount) {
            // Create PaymentIntent as soon as the page loads
            fetch("http://localhost:5000/createPaymentIntent", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paymentAmount),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data?.clientSecret) {
                        setClientSecret(data.clientSecret);
                    }
                });
        }
    }, [paymentAmount]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (elements === null) {
            return;
        }

        const card = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        setCardError(error?.message || '');
        setSuccess('');
        //confirm car payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: emailAddress,
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message);
        } else {
            setCardError('');
            setSuccess('Congrates, your payment done.');
            console.log(paymentIntent)
        }
    }
    return (
        <>
            <form className='mt-4' onSubmit={handleSubmit}>
                <CardElement />
                <button className='btn btn-accent btn-sm mt-3' type="submit" disabled={!stripe || !elements || !clientSecret}>
                    Pay
                </button>
            </form>
            {cardError && <p className='text-error'>{cardError}</p>}
            {success && <p className='text-success'>{success}</p>}
        </>
    );
};

export default CheckoutForm;