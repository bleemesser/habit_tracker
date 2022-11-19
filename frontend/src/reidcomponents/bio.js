import React from 'react';
import { ChartBarIcon, ArchiveIcon, AcademicCapIcon, AdjustmentsIcon } from '@heroicons/react/outline';
import Platform from '../assets/images/platform.png';

const Bio = () => {
  return (
    <div className='mb-0 flex flex-row min-h-screen justify-center items-center mt-25'>
      <div className='justify-center items-center mt-25'>
        <div className='md:flex'>
        <div className='w-'>
        <div className='h-5'></div>
        <img src={Platform} className='drop-shadow-lg rounded-lg'></img>
        <div className='h-20'></div>
        <h2 className=''>A New Way to Understand Yourself</h2>
        <div className='h-5'></div>
        <p className=''>
          Whether you're trying to keep track of your habits for self improvement purposes or class, SEL tracker enables an all-in-one platform to manage your emotional habits.
        </p>
        </div>
        </div>
        
        <div className='mt-19 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
          <div className='flex'>
            <div>
              <ChartBarIcon className='w-7 mr-4 text-red-600' />
            </div>
            <div>
              <h3 className='font-bold text-lg'>Patterns</h3>
              <p className='text-lg pt-2 pb-4'>
                Patterns are one of the most important vehicles to recognize positive and negative trends. It's all tracked in one place.
              </p>
            </div>
          </div>
          <div className='flex'>
            <div>
              <ArchiveIcon className='w-7 mr-4 text-green-600' />
            </div>
            <div>
              <h3 className='font-bold text-lg'>History</h3>
              <p className='text-lg pt-2 pb-4'>
                Access your past data to see your mental evolution and general trends and understand what works well for you, and what doesn't.
              </p>
            </div>
          </div>
          <div className='flex'>
            <div>
              <AdjustmentsIcon className='w-7 mr-4 text-blue-600' />
            </div>
            <div>
              <h3 className='font-bold text-lg'>Statistics</h3>
              <p className='text-lg pt-2 pb-4'>
                Statistics are the key to keeping your mental health on track, and we provide an easy platform to understand yourself better.
              </p>
            </div>
          </div>
        </div>
        <div className='h-10'></div>
      </div>
    </div>
  );
};

export default Bio;