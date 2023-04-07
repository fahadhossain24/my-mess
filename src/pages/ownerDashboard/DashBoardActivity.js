import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashBoardActivity = ({ messInfo, actualMember }) => {
    const [messInformation, setMessInformation] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/messById/${actualMember.messId}`)
        .then(res => res.json())
        .then(data => {
            setMessInformation(data.name)
        })
    }, [])
    console.log(messInformation)
    return (
        <div>
            <h2 className='text-center text-2xl mt-2 text-secondary font-bold'>Welcome to <span className='text-accent'>{(messInfo?.name) || (messInformation)}</span> Dashboard</h2>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side z-0">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-2 w-80 text-secondary w-[200px]">
                        {/* Sidebar content here */}
                        <li><Link to='/ownerDashboard'>Dashboard Home</Link></li>
                        <li><Link to='/ownerDashboard/addMember'>Add or Update Member</Link></li>
                        <li><Link to='/ownerDashboard/requestedMembers'>Requested Members</Link></li>
                        <li><Link to='/ownerDashboard/currentMembers'>Current Members</Link></li>
                        <li><Link to='/ownerDashboard/messCost'>Mess Cost</Link></li>
                        <li><Link to='/ownerDashboard/mealCost'>Meal Cost</Link></li>
                        <li><Link to='/ownerDashboard/messGalary'>Mess Galary</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardActivity;