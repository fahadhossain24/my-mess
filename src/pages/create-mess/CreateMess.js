import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const CreateMess = () => {
    const navigate = useNavigate();
    const [currentUser] = useAuthState(auth);

    const handleCreateNewMess = (event) => {
        event.preventDefault();
        const messInfo = {
            name: event.target.name.value,
            address: (event.target.address.value).toLocaleLowerCase(),
            latitude: event.target.latitude.value,
            longitude: event.target.longitude.value,
            ownerEmail: event.target.OwnerEmail.value,
            houseRant: event.target.houseRant.value,
            currentBill: event.target.currentBill.value,
            wifiBill: event.target.wifiBill.value,
            auntyBill: event.target.auntyBill.value,
            othersBill: event.target.othersBill.value,
            totalMember: event.target.totalMember.value,
        }
        //send mess information to database by server
        const url = `http://localhost:5000/mess/${messInfo.ownerEmail}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ messInfo, currentUser }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    navigate('/ownerDashboard');
                    toast.success(`Your ${messInfo.name} mess successfully created`);
                }
                else {
                    toast.warning(data.message)
                }
                event.target.reset();

            })

    }

    return (
        <div className='container'>
            <h2 className='text-center text-3xl font-bold mt-3 text-secondary'>Mess <span className='text-accent'>Information</span></h2>
            <div className="form-control w-full lg:w-[50%] mx-auto p-4 border-accent-focus">
                <form onSubmit={handleCreateNewMess}>
                    <input type="text" placeholder="Mess Name" name='name' className="input input-bordered border-accent rounded w-100" required />
                    <input type="text" placeholder="Mess Address" name='address' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="text" placeholder="Latitude" name='latitude' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="text" placeholder="Longitude" name='longitude' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="email" placeholder="Mess Owner Email" name='OwnerEmail' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="text" placeholder="Total Member" name='totalMember' className="input input-bordered border-accent rounded w-100 mt-3" required />
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