import React from 'react';
import hero_img from '../../assets/images/body/hero_img.jpg';

function Hero() {
    return (
        <div className="bg-gray-900 py-20 mt-5">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 lg:w-2/3">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6">
                            Chào mừng đến với <br className="hidden md:block" />
                            <span className="text-indigo-500">MomBabyMilk</span> Website
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8">
                            Nơi cung cấp tất cả loại sữa dinh dưỡng cho mẹ và bé.
                        </p>
                        <div className="flex gap-2">
                            <a
                                href="#"
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-md"
                            >
                                Mua hàng
                            </a>
                            <a
                                href="#"
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md"
                            >
                                Về chúng tôi
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
                        <img
                            src={hero_img}
                            alt="Hero Image"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
