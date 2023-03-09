import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const OwnerDashboard = () => {
    const [currentUser] = useAuthState(auth);
    const [messInfo, setMessInfo] = useState({});
    const [isLoading, setIsLoading] =useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/mess/${currentUser?.email}`)
            .then(res => res.json())
            .then(data => {
                if (data._id) {
                    setMessInfo(data);
                    console.log(data);
                } else {
                    setMessInfo(data);

                }
            })
    }, [])
    return (
        <div className='container'>
            {
                messInfo._id ? <h2>Owner dashboard for {messInfo.name}</h2> : <>
                    <div className='text-center mt-4'>
                    <h1 className='text-3xl'>404</h1>
                    <h2 className='text-error text-2xl'>{messInfo.message}</h2>
                    <p className=''>You should have access it after getting mess wonership</p>
                    </div>
                </>
            }
        </div>
    );
};

export default OwnerDashboard;