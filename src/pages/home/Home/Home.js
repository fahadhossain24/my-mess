import React from 'react';
import Footer from '../../Shired/Footer/Footer';
import image1 from '../../../image/1.png'
import image2 from '../../../image/2.jpg'
import image3 from '../../../image/3.jpg'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleCreateMess = (user) => {
        navigate('/createMess')
    }

    const handleAddAsMember = (user) => {
        navigate('/addAsMember')
    }
    return (
        <div>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner carousell-image-wapper">
                    <div className="carousel-item active carousl-custom">
                        <img src={image2} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item carousl-custom">
                        <img src={image3} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item carousl-custom">
                        <img src={image1} className="d-block w-100" alt="..."/>
                    </div>
                </div>
                
            </div>
            <div className="carousel-button">
                    <button onClick={handleCreateMess} className='btn btn-accent me-4 text-2xl'>Create a mess</button>
                    <button onClick={handleAddAsMember} className='btn btn-accent text-2xl'>Add as member</button>
                </div>
        </div>
    );
};

export default Home;