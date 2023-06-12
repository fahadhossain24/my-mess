import React from 'react';
import { useNavigate } from 'react-router-dom';

const DisplaySearchMess = ({mess}) => {
    const navigate = useNavigate()
    
    const {name, address, _id, latitude, longitude} = mess;

    const handleMessMap = (messId) => {
        navigate(`/map/${messId}`)
    }

    return (
        <div>
            <h2 onClick={() => {handleMessMap(_id)}} className='ml-4 lg:ml-1 text-[25px] mt-3 underline text-blue-500 cursor-pointer'>{name} <span className='text-[15px]'>{address}</span> - {_id}</h2>
        </div>
    );
};

export default DisplaySearchMess;