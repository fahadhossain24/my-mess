import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shired/Loading/Loading';
import { Link } from 'react-router-dom';

const DashBoardHome = () => {
    const [currentMember, setCurrentMember] = useState({});
    const [user] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState(false);

    const houseRant = parseInt(currentMember.houseRant);
    const othersCost = parseInt(currentMember.othersCost);
    const upliftCharge = parseInt(currentMember.developmentCharge);
    const totalWithUplift = houseRant + othersCost + upliftCharge;
    const totalWithoutUplift = houseRant + othersCost;

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5000/messMemberbyEmail/${user.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if(!data){
                    setCurrentMember({})
                    setIsLoading(false)
                }
                setCurrentMember(data);
                setIsLoading(false);
            })
    }, [user.email])

    // console.log(currentMember)

 
    return (
        <>{
            (isLoading && <Loading></Loading>) || (!isLoading && currentMember.status !== 'failed' ? <div>
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
                            {currentMember?.paymentStatus === 'Unpaid' && <Link to={`/ownerDashboard/payment/${currentMember?.emailAddress}`}><button className="badge badge-outline bg-accent p-3">Pay</button></Link>}
                        </div>
                    </div>
                </div>
            </div> : <h2 className=' h-[100vh] flex justify-center mt-44 text-3xl text-red-500 font-medium'>Profile Not Ready</h2> )
        }</>
    );
};

export default DashBoardHome;