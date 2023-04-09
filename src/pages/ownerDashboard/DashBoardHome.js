import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shired/Loading/Loading';

const DashBoardHome = () => {
    const [currentMember, setCurrentMember] = useState({});
    const [currentUser] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState(false);

    const houseRant = parseInt(currentMember.houseRant);
    const othersCost = parseInt(currentMember.othersCost);
    const upliftCharge = parseInt(currentMember.developmentCharge);
    const totalWithUplift = houseRant + othersCost + upliftCharge;
    const totalWithoutUplift = houseRant + othersCost;

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5000/messMember/${currentUser.email}`)
            .then(res => res.json())
            .then(data => {
                setCurrentMember(data);
                setIsLoading(false);
            })
    }, [])
    
    return (
        <>{
            (isLoading && <Loading></Loading>) || (!isLoading && <div>
                <span className='mx-auto mb-[-5px] mt-3 w-[250px] h-[3px] bg-accent block'></span>
                <h2 className='text-center mt-2'>Hi <span className='text-uppercase font-bold'>{currentMember.name}</span></h2>
                <span className='mx-auto mt-1 w-[250px] h-[3px] bg-accent block'></span>
                {/* dashboard home card */}
                <div className="card mx-auto mt-4 w-96 bg-teal-100 shadow-xl">
                    <figure><img className='w-[100px] h-[100px] rounded-full mt-2' src={currentMember.memberImage} alt="Member" /></figure>
                    <div className="card-body mt-[-25px] font-bold">
                        <h2 className="card-title">
                            <span className='text-uppercase'>{currentMember.name}</span>
                            <div className="badge badge-secondary">{currentMember.memberRole}</div>
                        </h2>
                        <h2>Phone Number: {currentMember.phoneNumber}</h2>
                        <h2>Room Catagory: {currentMember.roomCatagory}</h2>
                        <h2>Total with Uplift: {totalWithUplift} (one time)</h2>
                        <h2>Total without Uplift: {totalWithoutUplift}</h2>
                        <h2>Payment Status: <span className='px-2 bg-accent border'>{currentMember.paymentStatus}</span></h2>
                        <div className="card-actions justify-end">
                            <button className="badge badge-outline bg-accent p-3">Pay</button>
                        </div>
                    </div>
                </div>
            </div>)
        }</>
    );
};

export default DashBoardHome;