import React, { useState } from 'react';
import Footer from '../../Shired/Footer/Footer';
import image1 from '../../../image/1.png'
import image2 from '../../../image/2.jpg'
import image3 from '../../../image/3.jpg'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shired/Loading/Loading';
import MessSearch from './MessSearch';
import { toast } from 'react-toastify';
import AutoTypedText from './AutoTypedText';

const Home = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const handleCreateMess = (user) => {
        navigate('/createMess')
    }

    const handleAddAsMember = (user) => {
        navigate('/addAsMember')
    }

    const handleFindMess = () => {
        navigate('/messSearch')
    }


    return (
        <>{
            (loading && <></>) || (!loading && <div>
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner carousell-image-wapper">
                        <div className="carousel-item active carousl-custom">
                            <img src={image1} className="d-block w-100 h-100" alt="..." />
                        </div>
                        <div className="carousel-item carousl-custom">
                            <img src={image3} className="d-block w-100 h-100" alt="..." />
                        </div>
                        <div className="carousel-item carousl-custom">
                            <img src={image2} className="d-block w-100 h-100 brightness-50" alt="..." />
                        </div>
                    </div>

                </div>

                <div className='absolute top-[25%] left-3 lg:left-[26%]  w-[500px] text-[25px] lg:text-[32px]'>
                    <AutoTypedText></AutoTypedText>
                </div>

                <div className="carousel-button text-center">
                    <button onClick={handleFindMess} className='btn btn-accent mb-1 me-2 text-2xl ml-2'>Find Mess</button>
                    <button onClick={handleCreateMess} className='btn btn-accent me-3 mb-1 text-2xl ml-2'>Create a mess</button>
                    <button onClick={handleAddAsMember} className='btn btn-accent text-2xl'>Add as member</button>
                </div>
            </div>)
        }
        </>
    );
};

export default Home;