import React from 'react';
import ReactCardSlider from 'react-card-slider-component';

const Slider = ({ title, slides }) => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center mt-20 mb-4">
                <h2 className="text-2xl font-semibold text-left mr-12">{title}</h2>
                <a href="#" className="text-blue-500 hover:text-blue-700">Xem tất cả</a>
            </div>
            <div className="w-full flex justify-center">
                <ReactCardSlider slides={slides} />
            </div>
        </div>
    );
};

export default Slider;
