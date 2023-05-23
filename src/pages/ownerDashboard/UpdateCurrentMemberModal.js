import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../Shired/Loading/Loading';

const UpdateCurrentMemberModal = ({ details }) => {
    const { name, emailAddress, phoneNumber, nidNumber, memberImage, roomCatagory } = details

    const [paymentStatus, setPaymentStatus] = useState('');
    const [memberRole, setMemberRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateCurrentMember = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const updateInfo = {
            name: name,
            phoneNumber: phoneNumber,
            emailAddress: emailAddress,
            nidNumber: nidNumber,
            houseRant: e.target.houseRant.value,
            othersCost: e.target.othersCost.value,
            developmentCharge: e.target.developmentCharge.value,
            paymentStatus: paymentStatus,
            memberRole: memberRole,
            memberImage: memberImage,
        }

        //update informations.........
        const url = `https://my-mess-server.vercel.app/addMessMember/${updateInfo.emailAddress}`
        fetch(url, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateInfo),
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setIsLoading(false);
                    toast.warning(data.message)
                } else {
                    if (data.upsertedId != null) {
                        setIsLoading(false);
                        toast.success(`${updateInfo.name} added successfully`);
                    } else {
                        setIsLoading(false);
                        toast.success(`${updateInfo.name} updated successfully`);
                    }
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="update-modals" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-gray-600">
                    <h3 className="font-bold text-lg text-accent p-2">{name}'s Update Information</h3>
                    <form onSubmit={handleUpdateCurrentMember}>
                        <input type="text" placeholder="House Rant" name='houseRant' className="input input-bordered border-accent rounded w-100 mt-3" required />
                        <input type="text" placeholder="Others Cost" name='othersCost' className="input input-bordered border-accent rounded w-100 mt-3" required />
                        <input type="text" placeholder="Development Charge" name='developmentCharge' className="input input-bordered border-accent rounded w-100 mt-3" required />
                        <select onChange={(event) => { setPaymentStatus(event.target?.value) }} name="paymentStatus" className="input input-bordered border-accent rounded w-100 mt-3" id="" required>
                            <option value="">Select Payment Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                        <select onChange={(event) => { setMemberRole(event.target?.value) }} name="memberRole" className="input input-bordered border-accent rounded w-100 mt-3" id="" required>
                            <option value="">Select Member Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Genarel Member">Genarel Member</option>
                        </select>
                        <input htmlFor='update-modals' className='btn btn-accent mt-3 capitalize ' type="submit" value="Add" />
                    </form>
                    <div className="modal-action">
                        <label htmlFor="update-modals" className="btn btn-accent">Close</label>
                    </div>
                </div>
            </div>
            {isLoading && <Loading></Loading>}
        </div>
    );
};

export default UpdateCurrentMemberModal;