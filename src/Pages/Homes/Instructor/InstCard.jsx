import React from 'react';

const InstCard = ({inst}) => {
  const {image, name, email} = inst;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl group overflow-hidden relative">
      <figure>
        <img  src={image} alt="Instructor Image" className=" h-40 object-cover transition-opacity duration-300" />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-1/2 text-center">
            <h2 className="text-white text-xl font-bold">{name}</h2>
            <p className="text-white">{email}</p>
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="font-bold text-xl text-center">Our Instructor</h2>
        <p></p>
        <div className="card-actions justify-end">
          
        </div>
      </div>
    </div>
  );
};

export default InstCard;