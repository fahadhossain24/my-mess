import React from 'react';

const ModalOfcurrentMemberDetails = ({details}) => {
    const {name, emailAddress, phoneNumber, nidNumber, memberRole, houseRant, othersCost, developmentCharge, paymentStatus, memberImage, roomCatagory} = details
    return (
        <div>
            <input type="checkbox" id="details-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-gray-600">
                    <h3 className="font-bold text-lg text-accent">Requested Member Details</h3>
                    <h2 className='mt-[12px] text-gray-400'>Member name: <span className='text-accent'>{name}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Phone number: <span className='text-accent'>{phoneNumber}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Email address: <span className='text-accent'>{emailAddress}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>NID number: <span className='text-accent'>{nidNumber}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Member role: <span className='text-accent'>{memberRole}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>HouseRant: <span className='text-accent'>{houseRant}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>OthersCost: <span className='text-accent'>{othersCost}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>DevelopmentCharge: <span className='text-accent'>{developmentCharge}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Room catagory: <span className='text-accent'>{roomCatagory}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Payment status: <span className='text-accent'>{paymentStatus}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Image url: <span className='text-accent'>{memberImage}</span></h2>
                    <div className="modal-action">
                        <label htmlFor="details-modal" className="btn btn-accent">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalOfcurrentMemberDetails;