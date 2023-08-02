import React from 'react';

const Faq = () => {
  return (
    <div className='mt-20'>
      <div className="w-1/3 mx-auto my-7">
      <h1
          data-aos="fade-up"
          data-aos-duration="1500"
          className="text-3xl font-semibold text-center text-blue-600 bordr border-b-2 border-slate-500 p-5"
        >
          F A Q ?
        </h1>
      </div>
     
      <div className="collapse collapse-arrow bg-lime-200 mb-8">
  <input type="radio" name="my-accordion-2" checked="checked" /> 
  <div className="collapse-title text-xl font-medium">
    How much time the course wil be continued?
  </div>
  <div className="collapse-content "> 
    <p>The course will be continued at leat four month</p>
  </div>
</div>
<div className="collapse collapse-arrow text-white bg-[#4831D4] mb-8">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
    Will you get support after the course time?
  </div>
  <div className="collapse-content"> 
    <p>Of course! you wil get support for life time </p>
  </div>
</div>
<div className="collapse collapse-arrow bg-lime-200 mb-8">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
    will you provide certificate after successfully completed the cousre?
  </div>
  <div className="collapse-content"> 
    <p>Yes we will provide a certificate, if you finish the course on time</p>
  </div>
</div>
    </div>
  );
};

export default Faq;