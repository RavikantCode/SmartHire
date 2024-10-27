import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-6 mt-10'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row md:justify-between'>

          {/* <div className='mb-4 md:mb-0'>
            <h4 className='text-lg font-semibold mb-2'>Quick Links</h4>
            <ul>
              <li><a href="/about" className='hover:text-blue-400'>About Us</a></li>
              <li><a href="/contact" className='hover:text-blue-400'>Contact</a></li>
              <li><a href="/privacy-policy" className='hover:text-blue-400'>Privacy Policy</a></li>
              <li><a href="/terms-of-service" className='hover:text-blue-400'>Terms of Service</a></li>
            </ul>
          </div> */}

         
          <div className='mb-4 md:mb-0'>
            {/* <h4 className='text-lg font-semibold mb-2'>Follow Us On :</h4>
            <div className='flex space-x-4'> */}
              {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className='text-xl hover:text-blue-600' />
              </a> */}
              {/* <a href="https://twitter.com/YRavi_1" target="_blank" rel="noopener noreferrer">
                <FaTwitter className='text-xl hover:text-blue-400' />
              </a> */}
              {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className='text-xl hover:text-blue-700' />
              </a> */}
              {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className='text-xl hover:text-pink-600' />
              </a> */}
            {/* </div> */}
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-2'>Contact Us</h4>
            {/* <p>Email: <a href="mailto:support@smarthire.com" className='hover:underline'>support@smarthire.com</a></p> */}
            <p className='mb-10'>Phone:+91-8097103975</p>
          </div>
        </div>

        <div className='mt-6 border-t border-gray-700 pt-4 text-center'>
          <p>&copy; {new Date().getFullYear()} SmartHire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
