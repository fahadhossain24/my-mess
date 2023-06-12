import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const { email } = useParams()
    const [currentMember, setCurrentMember] = useState({});
    const [paymentAmmount, setPaymentAmmount] = useState('');


    const stripePromise = loadStripe('pk_test_51MvOzeGUxH0oKgmSjPF2rMDKVFWdTdpv4V7TPjBjzvABwo56H571X1JLXbMstxs7ljEMKCPpdTpW9GaOEBYDQjgN006inu0XBD');

    const houseRantInt = parseInt(currentMember.houseRant);
    const othersCostInt = parseInt(currentMember.othersCost);
    const upliftCharge = parseInt(currentMember.developmentCharge);
    const totalWithUplift = houseRantInt + othersCostInt + upliftCharge;
    const totalWithoutUplift = houseRantInt + othersCostInt;

    useEffect(() => {
        fetch(`http://localhost:5000/messMember/${email}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCurrentMember(data);
                }
            })
    }, [])


    return (
        <div className='lg:flex gap-2'>
            <div className="card w-96 bg-cyan-100 shadow-xl mt-5">
                <div className="p-4">
                    <h2 className='font-bold'>Payment for <span className="text-center font-bold text-xl capitalize">{currentMember.name}</span></h2>
                    <p className='mt-2'>Select Ammount Type:</p>
                    <input className='mx-2' type="radio" onChange={(e) => setPaymentAmmount(e.target.value)} name="pwu" value={totalWithUplift} id="pwu" />
                    <lebel forhtml='pwu' className="">Payment with uplift ({totalWithUplift})</lebel><br />
                    <input className='mx-2' type="radio" onChange={(e) => setPaymentAmmount(e.target.value)} name="pwu" value={totalWithoutUplift} id="pwu" />
                    <lebel forhtml='pwu' className="">Payment with uplift ({totalWithoutUplift})</lebel>
                    <p>Notice: If you are a new member, you should have select payment with uplift</p>
                </div>
            </div>
            <div className="card w-96 bg-cyan-10 shadow-xl mt-5">
                <div className="p-4">
                    <h2 className='font-bold'>Your Payable Ammount: {paymentAmmount ? paymentAmmount : "00"}</h2>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm paymentAmount={paymentAmmount} currentMember={currentMember} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;