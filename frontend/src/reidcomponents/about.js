import React from 'react'

const About = () => {
  return (
    <div name='about' className='w-full my-32'>
        <div className='max-w-[1240px] mx-auto'>
            <div className='text-center'>
                <h2 className='text-5xl font-bold'>A Platform for Students and Teachers</h2>
                <p className='text-3xl py-6 text-gray-500'>SEL Habit Tracker is the first student-teacher supported platform for easy interactions. Jump in today.</p>
            </div>
            <div className='my-5'></div>
            <div className='grid md:grid-cols-1 gap-1 px-2 text-center'>
                <div  className='border py-8 rounded-xl shadow-xl' >
                    <a href='/login' className='no-underline text-black-600'>
                    <p className='text-3xl font-bold'>Get Started</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About