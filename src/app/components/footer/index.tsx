import React from 'react';

type Props = {};

const Footer = (props: Props) => {
  return (
    <section>
    <div className='flex flex-col h-80 w-full justify-center items-center relative'>
      <div className='bg-black text-white lg:text-3xl md:text-2xl sm:text-xl text-lg text-center font-extrabold'>
        Let's Create Something New Together!
      </div>
      <div className='flex items-center justify-center mt-4'>
        <p className='text-red-100 text-3xl font-extrabold'>Aryan</p>
        <p className='text-green-500 text-3xl font-extrabold'>.</p>
      </div>
      <div className='absolute bottom-4 text-center text-opacity-50'>
        <p>© 2024 Aryan Rathod. All Rights Reserved</p>
      </div>
    </div>
    </section>
  );
};

export default Footer;
