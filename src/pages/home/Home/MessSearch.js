import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shired/Loading/Loading';
import DisplaySearchMess from './DisplaySearchMess';

const MessSearch = (props) => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [findedMesses, setFindedMesses] = useState([]);


    const handleLocationSearch = async () => {
        setIsloading(true)
        const locationObj = {
            locationName: searchText.toLocaleLowerCase(),
        }

        const url = 'http://localhost:5000/messLocation';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(locationObj),
        })
            .then(res => res.json())
            .then(data => {
                setIsloading(false);
                setFindedMesses(data);
            })
    }

    const handleEnterKey = () => {
        handleLocationSearch();
    }



    return (
        <div>
            {
                (isLoading && <Loading></Loading>) || (!isLoading && <div className="carousel-search">
                    <div className='w-[400px] lg:w-[600px] flex-col lg:flex-row'>
                        <input type="text" onChange={(e) => setSearchText(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? handleEnterKey() : ''} placeholder="Search your needed location..." className="input input-bordered input-warning max-w-xs lg:w-full bg-cyan-50" />
                        <button onClick={handleLocationSearch} className='btn btn-accent me-4 mb-1 text-2xl ml-2'>search</button>
                    </div>
                </div>)
            }

            <div className='w-[600px] mx-auto mt-2'>
                {findedMesses.length > 0 && <h2 className='ml-12'>total result: {findedMesses.length}</h2>}
                {
                    findedMesses.map(mess => <DisplaySearchMess key={mess._id} mess={mess} allMess={findedMesses}></DisplaySearchMess>
                    )
                }
            </div>

        </div>
    );
};

export default MessSearch;