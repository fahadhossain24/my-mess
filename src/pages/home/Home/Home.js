import React from 'react';
import Footer from '../../Shired/Footer/Footer';
import image1 from '../../../image/1.png'
import image2 from '../../../image/2.jpg'
import image3 from '../../../image/3.jpg'

const Home = () => {
    return (
        <div>
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner carousell-image-wapper">
                    <div class="carousel-item active carousl-custom">
                        <img src={image2} class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item carousl-custom">
                        <img src={image3} class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item carousl-custom">
                        <img src={image1} class="d-block w-100" alt="..."/>
                    </div>
                </div>
                
            </div>
            <div className="carousel-button">
                    <button className='btn btn-accent me-4 text-2xl'>Create a mess</button>
                    <button className='btn btn-accent text-2xl'>Add as member</button>
                </div>
        </div>
    );
};

export default Home;