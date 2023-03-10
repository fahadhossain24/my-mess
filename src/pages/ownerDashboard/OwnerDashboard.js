import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shired/Loading/Loading';
import DashBoardActivity from './DashBoardActivity';

const OwnerDashboard = () => {
    const [currentUser] = useAuthState(auth);
    const [messInfo, setMessInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:5000/mess/${currentUser?.email}`)
            .then(res => res.json())
            .then(data => {
                if (data._id) {
                    setMessInfo(data);
                    setIsLoading(false)
                    console.log(data);
                } else {
                    setMessInfo(data);
                    setIsLoading(false)

                }
            })
    }, [])
    return (
        <div className='container'>
            {
                ((isLoading) && (<Loading></Loading>)) || ((!isLoading) && (messInfo._id ? <DashBoardActivity key={messInfo._id} messInfo = {messInfo}></DashBoardActivity> : <>
                    <div className='text-center mt-4'>
                        <h1 className='text-3xl'>404</h1>
                        <h2 className='text-error text-2xl'>{messInfo.message}</h2>
                        <p className=''>You should have access it after getting mess wonership</p>
                    </div>
                </>))


            }
        </div>
    );
};

export default OwnerDashboard;