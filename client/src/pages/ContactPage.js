
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaTelegram  } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../image/contact-us.png';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


   const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    if (!message) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setIsSubmitting(true); // Set submitting state

      // Template parameters for EmailJS
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
      };

      // Send email using EmailJS
      emailjs
        .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
        .then(
          (response) => {
            console.log('SUCCESS!', response.status, response.text);
            setIsSubmitting(false); // Reset submitting state

            // Clear form fields
            setName('');
            setEmail('');
            setMessage('');
            setErrors({});
            alert('Message sent successfully!');
          },
          (error) => {
            console.log('FAILED...', error);
            setIsSubmitting(false); // Reset submitting state
            alert('Failed to send the message. Please try again.');
          }
        );
    }
  };


  return (
    <div>
      <Navbar />
      <div className="relative h-60">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://png.pngtree.com/thumb_back/fw800/background/20220217/pngtree-simple-atmosphere-black-line-promotion-background-image_954276.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1 className="text-4xl font-bold text-white relative z-10 flex justify-center items-center h-full font-poppins">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              CONTACT US
            </motion.div>
          </h1>
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-opacity-20 bg-blue-500 rounded-full w-40 h-40 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="flex justify-center items-center">
              <motion.img
                src={Contact}
                alt="Contact Us"
                // className="rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>  {/* Form Section */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  rows="10"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-label="Message"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </motion.div>
              <motion.button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          disabled={isSubmitting} // Disable button during submission
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </motion.button>
      </form>
          
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Location
            </motion.div>
          </h2>
          <div className="relative w-full h-80">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d492.54814264740776!2d38.75168415522537!3d9.028586559144419!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f18287ac61%3A0x6c03d3567560724c!2zTS5rIEJ1c2luZXNzIENlbnRlciB8IFBpYXp6YSB8IOGKpOGIneGKrCDhi6jhjIjhiaDhi6sg4Yib4Yql4Yqo4YiNIHwg4Y2S4Yur4Yiz!5e0!3m2!1sen!2set!4v1723977247132!5m2!1sen!2set" 
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="absolute inset-0"
          title="Company Location">

          </iframe>
         
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
            </motion.div>
          </h2>
          <ul className="list-disc ml-5">
            <li> You can reach us anytime, and we'll respond as soon as possible</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Connect with Us
            </motion.div>
          </h2>
          <div className="flex space-x-4">
            <motion.a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaFacebook size={32} />
            </motion.a>
            <motion.a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaTwitter size={32} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaLinkedin size={32} />
            </motion.a>
            <motion.a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaInstagram size={32} />
            </motion.a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
