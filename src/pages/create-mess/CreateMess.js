import React from 'react';
import {  useNavigate } from 'react-router-dom';

const CreateMess = () => {
    const navigate = useNavigate();
    
    const handleCreateNewMess = (event) => {
        event.preventDefault();
        const messInfo = {
            name: event.target.name.value,
            OwnerEmail: event.target.OwnerEmail.value,
            houseRant: event.target.houseRant.value,
            currentBill: event.target.currentBill.value,
            wifiBill: event.target.wifiBill.value,
            auntyBill: event.target.auntyBill.value,
            othersBill: event.target.othersBill.value,
        }
        console.log('evenything is ok', messInfo);
        event.target.reset()
        navigate('/ownerDashboard')
    }

    return (
        <div className='container'>
            <h2 className='text-center text-3xl font-bold mt-3 text-secondary'>Mess <span className='text-accent'>Information</span></h2>
            <div className="form-control w-50 mx-auto p-4 border-accent-focus">
                <form onSubmit={handleCreateNewMess}>
                    <input type="text" placeholder="Mess Name" name='name' className="input input-bordered border-accent rounded w-100" required />
                    <input type="text" placeholder="Mess Owner Email" name='OwnerEmail' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="text" placeholder="House Rant" name='houseRant' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="text" placeholder="Current Bill" name='currentBill' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="text" placeholder="Wifi Bill" name='wifiBill' className="input input-bordered border-accent rounded w-100  mt-3" required />
                    <input type="text" placeholder="Aunty Bill" name='auntyBill' className="input input-bordered border-accent rounded w-100  mt-3" required />
                    <input type="text" placeholder="Others Bill" name='othersBill' className="input input-bordered border-accent rounded w-100  mt-3" required />
                    <input className='btn btn-accent mt-3 w-100 capitalize ' type="submit" value="Create Mess" />
                </form>
            </div>
        </div>
    );
};

export default CreateMess;