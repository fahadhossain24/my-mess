import React from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayCurrentMember = ({ currentMember, setDetails, hanldeDeleteCurrentMember }) => {
    const { name, emailAddress, phoneNumber, nidNumber, memberRole, houseRant, othersCost, developmentCharge, paymentStatus, memberImage, roomCatagory } = currentMember;
    

    return (
        <div>
            <div className="card w-[200px] bg-base-100 shadow-xl">
                <figure className="px-2 pt-2">
                    <div className="indicator">
                        {(houseRant && memberRole && othersCost && developmentCharge && paymentStatus) && <span className="indicator-item  badge-success w-[13px] h-[13px] bg-success-700 rounded absolute top-[60px] right-2"></span>}
                        <img src={memberImage} alt="Shoes" className="w-[70px] h-[70px] relative" style={{ borderRadius: '50%' }} />
                        {/* <div className="grid w-32 h-32 bg-base-300 place-items-center">content</div> */}
                    </div>
                </figure>
                <div className="card-body p-2 items-center text-center leading-none">
                    <h2 className="card-title text-[17px] mt-0 leading-none">{name}</h2>
                    <p className="card-title text-[17px] mt-0 leading-none">R/C: <span className='text-accent font-bold'>{roomCatagory}</span></p>
                    <p className="card-title text-[17px] mt-0 leading-none">P/S: <span className='text-success font-bold'>{paymentStatus}</span></p>
                    <div className="card-actions justify-center px-2 w-full">
                        <label htmlFor="details-modal" onClick={() => setDetails(currentMember)} className="btn btn-accent btn-xs">More</label>
                        {(!houseRant && !memberRole && !othersCost && !developmentCharge && !paymentStatus) && <label htmlFor="update-modals" onClick={() => setDetails(currentMember)} className="text-warning cursor-pointer">Update</label>}
                        <button className="text-error font-bold text-[15px]" onClick={() => hanldeDeleteCurrentMember(emailAddress)}> Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayCurrentMember;