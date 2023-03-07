import React, { useState } from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from './Loading/Loading';

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    const [sendEmailVerification] = useSendEmailVerification(auth)
    const [verified, setVerified] = useState(false);
    const [verifyButton, setVerifyBUtton] = useState('Send Verification Mail');
    const [toastMsg, setToastMsg] = useState('Your verification mail sended');

    if (loading) {
        return <Loading></Loading>;
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
    }

    const handnleEmailVerificationMail = async () => {
        const emailVerification = await sendEmailVerification();
        toast.success(toastMsg);
            setVerifyBUtton('Click to Continue');

        if(emailVerification === false){
            setToastMsg('Sorry, You still don\'t verify your email.');
        }
        setVerified(user.emailVerified = emailVerification);
    }

    if (!user.emailVerified) {
        return <>
            <div className="text-center mt-5">
                <h2 className='text-3xl text-danger'>Your Email isn't verified!!!</h2>
                <h3 className='text-2xl text-green-400 mt-2'>Please verified your email.</h3>
                <button onClick={handnleEmailVerificationMail} className='btn btn-accent mt-2'>{verifyButton}</button>
            </div>
        </>
    }

    return children;

};

export default RequireAuth;