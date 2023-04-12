import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';

const DashBoardActivity = ({ messInfo, findedMess }) => {
    const [currentUser] = useAuthState(auth);
    const [memberRole, setMemberRole] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/messMember/${currentUser.email}`)
            .then(res => res.json())
            .then(data => {
                setMemberRole(data.memberRole);
            })
    }, [currentUser])

    return (
        <div>
            <h2 className='text-center text-2xl mt-2 text-secondary font-bold'>Welcome to <span className='text-accent'>{(messInfo?.name) || findedMess?.name}</span>{findedMess?.name ? ' User ' : ' Owner '} Dashboard</h2>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-2 w-80 bg-base-100 text-secondary w-[200px]">
                        {/* Sidebar content here */}
                        <li><Link to='/ownerDashboard'>Dashboard Home</Link></li>
                        {(!(memberRole === 'Manager') && !(memberRole === 'Genarel Member')) && <li><Link to='/ownerDashboard/addMember'>Add or Update Member</Link></li>}
                        {(!(memberRole === 'Manager') && !(memberRole === 'Genarel Member')) && <li><Link to='/ownerDashboard/requestedMembers'>Requested Members</Link></li>}
                        {!(memberRole === 'Genarel Member') && <li><Link to='/ownerDashboard/currentMembers'>Current Members</Link></li>}
                        {!(memberRole === 'Genarel Member') && <li><Link to='/ownerDashboard/messCost'>Cost Details</Link></li>}
                        {!(memberRole === 'Genarel Member') && <li><Link to='/ownerDashboard/mealCost'>Calculate Meal</Link></li>}
                        <li><Link to='/ownerDashboard/messGalary'>Mess Galary</Link></li>
                        {(!(memberRole === 'Manager') && !(memberRole === 'Genarel Member')) && <li><Link to='/ownerDashboard/adminCard'>Admin Card</Link></li>}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardActivity;