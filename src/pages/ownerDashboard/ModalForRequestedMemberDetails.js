import React from 'react';

const ModalForRequestedMemberDetails = ({details}) => {
    const {name, messId, email, phone, image, parentsPhone, status, nidNumber, roomCatagory,} = details
    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-gray-600">
                    <h3 className="font-bold text-lg text-accent">Requested Member Details</h3>
                    <h2 className='mt-[12px] text-gray-400'>Member name: <span className='text-accent'>{name}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Phone number: <span className='text-accent'>{phone}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Email address: <span className='text-accent'>{email}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>NID number: <span className='text-accent'>{nidNumber}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Status: <span className='text-accent'>{status}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Mess id: <span className='text-accent'>{messId}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Image url: <span className='text-accent'>{image}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Parents phone: <span className='text-accent'>{parentsPhone}</span></h2>
                    <h2 className='mt-[8px] text-gray-400'>Room catagory: <span className='text-accent'>{roomCatagory}</span></h2>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn btn-accent">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalForRequestedMemberDetails;