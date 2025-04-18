import React from 'react';
import { Link } from 'react-router-dom';
import { GrYoga } from "react-icons/gr";
import gymg from '../photos/istockphoto-1207041834-612x612.jpg';

const Fit = () => {
  return (
    <div className="flex items-center justify-center mt-12 p-4">
      <div className="flex flex-col lg:flex-row bg-gradient-to-br from-gray-700 to-blue-950 rounded-b-full rounded-t-xl lg:rounded-full w-full shadow-lg overflow-hidden max-w-7xl">
        
        <div className="w-full lg:w-1/2 p-6 lg:p-12   flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 text-white text-center lg:text-left">
            Welcome to Our Gym !!
          </h1>
          <p className="text-gray-300 mb-6 text-center lg:text-left italic">
            <ul className='font-extrabold text-lg sm:text-xl lg:text-xl'>
              The only bad workout is the one that didn't happen
            </ul>
            <ul className='font-extrabold text-lg sm:text-xl lg:text-xl'>
              "Sweat is just fat crying. Keep going!"
            </ul>
            <ul className='font-extrabold text-lg sm:text-xl lg:text-xl'>
              "Your only limit is you. Now, make it count!"
            </ul>
          </p>
          <div className="flex justify-center lg:justify-start">
            {/* <Link to="/Fitness">
              <button className="bg-pink-700 w-full lg:w-auto font-extrabold font-serif flex gap-4 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition duration-300">
                Virtual Gym
                <GrYoga className='mt-1' />
              </button>
            </Link> */}
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <img src={gymg} alt="Gym" className="object-cover w-full h-72 sm:h-80 md:h-96 lg:h-full" />
        </div>
      </div>
    </div>
  );
};

export default Fit;
