import React from 'react';

const Inst = ({inst}) => {
  const {instImage} = inst;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
    <figure className="px-10 pt-10">
      <img src={instImage} alt="Shoes" className="rounded-xl" />
    </figure>
    
  </div>
  );
};

export default Inst;