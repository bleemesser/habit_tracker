import React from 'react';
import '../components/Home.scss';

const Data = () => {
  return (
    <div name='info' className='w-full text-white my-5 justify-content-md center align-items-center mt-5'>
      <div className='w-full h-[600px] bg-slate-300 absolute mix-blend-overlay justify-content-md center content-center'></div>

      <div className='w-full mx-auto py-12 justify-content-md center content-center'>

        <div className='text-center py-8 text-slate-300'>
          <h3 className='text-5xl font-bold text-white py-8'>Take your mental health to a new level.</h3>
          <p className='text-3xl'>
            Our platform gives analytics on your emotion habits in an easy to use interface.
          </p>
        </div>

        <div className='grid md:grid-cols-3'>
          <div></div>

          <div className='bg-white h-[100px] w-[200px] text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative'>
            <a href = "/login" className='no-underline'>
              <span className='no-underline'>Get Started</span>
            </a>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Data;