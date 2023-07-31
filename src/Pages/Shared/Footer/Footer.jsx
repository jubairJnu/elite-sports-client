
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles
import logo from '../../../../public/logo.png'
import { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({ duration: 800 });
  }, []);
  return (
    <footer data-aos="fade-up"
    data-aos-anchor-placement="bottom-bottom" className="footer p-10 bg-black text-white my-10">
  <div >
   <img className='w-28' src={logo} alt="" />
    <p>Elite Sport.<br/>Providing Sports Teaching</p>
  </div> 
  <div>
    <span className="footer-title">Services</span> 
    <a className="link link-hover">Branding</a> 
    <a className="link link-hover">Design</a> 
    <a className="link link-hover">Marketing</a> 
    <a className="link link-hover">Advertisement</a>
  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <a className="link link-hover">About us</a> 
    <a className="link link-hover">Contact</a> 
    <a className="link link-hover">Jobs</a> 
    <a className="link link-hover">Press kit</a>
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <a className="link link-hover">Terms of use</a> 
    <a className="link link-hover">Privacy policy</a> 
    <a className="link link-hover">Cookie policy</a>
  </div>
</footer>
  );
};

export default Footer;