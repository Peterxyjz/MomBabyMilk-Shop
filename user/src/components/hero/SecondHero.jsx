import React from 'react';
import baby_drink_milk from '../../assets/images/body/babyDrinkMilk.png';

function SecondHero() {
    return (
        <div className="py-20 mt-12">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center"
                    style={{
                        backgroundImage: `url(${baby_drink_milk})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        padding: '100px',
                        borderRadius: '10px'
                    }}>

                    <div className="md:w-1/2 lg:w-2/3">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl text-black font-bold mb-6">
                            <br className="hidden md:block" />
                            <span className="text-indigo-500">MomBabyMilk</span> Website
                        </h1>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecondHero;
