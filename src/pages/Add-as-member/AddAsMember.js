import React from 'react';

const AddAsMember = () => {

    const handleAddAsMember = (event) => {
        event.preventDefault();
        const requestedMemberInformation = {
            messId: event.target.id.value,
            memberName: event.target.name.value,
            memberEmail: event.target.email.value,
            memberPhone: event.target.phone.value,
            memberStatus: event.target.status.value,
            memberAddress: event.target.address.value,
            memberParentsPhone: event.target.parentsPhone.value,
            memberImage: event.target.memberImage.value,
        }
        console.log('request successfull', requestedMemberInformation);
        event.target.reset()
    }
    return (
        <div className='container'>
            <h2 className='text-center text-3xl font-bold mt-3 text-secondary'>Member <span className='text-accent'>Request</span></h2>
            <div className="form-control w-50 mx-auto p-4 border-accent-focus">
                <form onSubmit={handleAddAsMember}>
                    <input type="text" placeholder="Mess Id" name='id' className="input input-bordered border-accent rounded w-100" required />
                    <input type="text" placeholder="Your Name" name='name' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="text" placeholder="Email" name='email' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="text" placeholder="Phone" name='phone' className="input input-bordered border-accent rounded w-100 mt-3" required />
                    <input type="text" placeholder="Status" name='status' className="input input-bordered border-accent rounded w-100  mt-3" required />
                    <input type="text" placeholder="Address" name='address' className="input input-bordered border-accent rounded w-100  mt-3" required />
                    <input type="text" placeholder="Parents Phone" name='parentsPhone' className="input input-bordered border-accent rounded w-100  mt-3" required />
                    <label htmlFor="" className='mt-3'>Upload Your Image</label><br />
                    <input type="file" name="memberImage" className='mt-1' id="" />
                    <input className='btn btn-accent mt-3 w-100 capitalize ' type="submit" value="Create Mess" />
                </form>
            </div>
        </div>
    );
};

export default AddAsMember;