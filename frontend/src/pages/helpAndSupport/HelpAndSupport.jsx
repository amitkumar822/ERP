import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function HelpAndSupport() {
  const [openHelpModal, setOpenHelpModal] = useState(false); 
  const modalRef = useRef(null);

  return ( 
    <div className="flex flex-col items-center justify-center py-8"> 
      {/* Top Section */}
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h2> 
      {/* Navigation Links */}
      <ul className="mt-4 flex space-x-6">
        <li> <Link to="/help_guide/login" className="hover:underline text-blue-500">Login Help</Link></li>
        <li> <Link to="/help_guide/password" className="hover:underline text-blue-500">Password Help</Link></li>
        <li> <Link to="/help_guide/course_creation" className="hover:underline text-blue-500">Course Creation Help</Link></li>
        {/* ...add more links here */}
      </ul>

      {/*  Button to trigger the modal (with a hover effect) */}
      <button 
        onClick={() => setOpenHelpModal(true)} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
      >
        Need Help?
      </button>

      {/* Modal component (with dark mode class) */}
      {openHelpModal && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg" ref={modalRef}>  
            {/* Modal content goes here */} 
            <h2 className="text-3xl font-bold mb-4">Support Request</h2> 
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold">Your Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>  
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold">Your Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email address" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
              </div> 
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold">Message:</label>
                <textarea id="message" name="message" rows={8} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
              </div> 
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>  
          </form>
          </div> 
        </div>
      )} 
    </div>
  );
}

export default HelpAndSupport;

