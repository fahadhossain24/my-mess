import React from 'react';

const DisplayCurrentMember = ({currentMember, setDetails}) => {
    const {name, emailAddress, phoneNumber, nidNumber, memberRole, houseRant, othersCost, developmentCharge, paymentStatus, memberImage, roomCatagory} = currentMember;
    return (
        <div>
            <div className="card w-[200px] bg-base-100 shadow-xl">
                <figure className="px-2 pt-2">
                    <img src={memberImage} alt="Shoes" className="w-[70px] h-[70px]" style={{borderRadius: '50%'}} />
                </figure>
                <div className="card-body p-2 items-center text-center leading-none">
                    <h2 className="card-title text-[17px] mt-0 leading-none">{name}</h2>
                    <p className="card-title text-[17px] mt-0 leading-none">R/C: <span className='text-accent font-bold'>{roomCatagory}</span></p>
                    <p className="card-title text-[17px] mt-0 leading-none">P/S: <span className='text-accent font-bold'>{paymentStatus}</span></p>
                    <div className="card-actions justify-between px-3 w-full">
                        <label htmlFor="details-modal" onClick={() => setDetails(currentMember)} className="btn btn-accent btn-xs">More</label>
                        
                        <button className="text-error font-bold text-[15px]">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayCurrentMember;