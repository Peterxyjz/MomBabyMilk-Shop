import React from 'react';
import banner from "../../assets/images/background/banner_baby.png"

function SecondHero() {
    return (
        <div className="relative bg-cover bg-center mt-12" style={{ backgroundImage: `url(${banner})`, height: '500px' }}>
            <div className="absolute inset-0 flex items-center justify-start bg-opacity-50">
                <div className="md:w-1/2 lg:w-2/3 ml-10 p-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl text-black font-bold mb-6">
                        Sữa dành cho <br className="hidden md:block" />
                        <span className="text-indigo-500">Mẹ và Bé</span>
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default SecondHero;
