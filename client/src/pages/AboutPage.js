import React, { useEffect, useState, useRef } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import './AboutPage.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import Register from '../image/register-now.png';

const AboutPage = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef(null);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const footerPosition = footerRef.current?.offsetTop;

    if (footerPosition && scrollPosition >= footerPosition) {
      setIsFooterVisible(true);
    } else {
      setIsFooterVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
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
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1 }}
              >
                ABOUT US
              </motion.div>
            </h1>
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="bg-opacity-20 bg-blue-500 rounded-full w-40 h-40 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-6">
          {/* Main Content */}
          <div className="mt-6 overflow-auto">
            <p className="text-lg mb-4 font-lora">
              Welcome to Z-Group Company, your premier partner for company registration and promotion. We are dedicated to helping businesses grow and succeed by providing top-notch services tailored to their needs.
            </p>
            <h2 className="text-3xl font-bold mb-4 font-poppins animate-fade-in">
              Our Mission
            </h2>
            <p className="text-lg mb-4 font-lora animate-fade-in">
              At Z-Group Company, our mission is to empower businesses by simplifying the registration process and enhancing their visibility through effective promotion. We strive to provide comprehensive solutions that enable companies to focus on what they do best while we handle the administrative and promotional aspects.
            </p>
          </div>
          <h2 className="text-3xl font-bold mb-4 font-poppins animate-fade-in">
            Our Services
          </h2>
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            <div className="lg:w-1/2 space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in">
                <h3 className="text-2xl font-semibold mb-2 font-poppins flex items-center gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-blue-500" /> Company Registration
                </h3>
                <p className="font-lora">
                  We offer a streamlined registration process for businesses of all sizes. Whether you're starting a new venture or need to re-register your existing company, our team will guide you through every step, ensuring compliance with legal requirements and industry standards.
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in">
                <h3 className="text-2xl font-semibold mb-2 font-poppins flex items-center gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-blue-500" /> Company Promotion
                </h3>
                <p className="font-lora">
                  Our promotion services are designed to boost your company's visibility and attract potential clients. From digital marketing strategies to targeted advertising, we tailor our approach to meet your specific needs and goals.
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in">
                <h3 className="text-2xl font-semibold mb-2 font-poppins flex items-center gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-blue-500" /> Consulting & Support
                </h3>
                <p className="font-lora">
                  In addition to registration and promotion, we offer consulting services to help you navigate the complexities of business operations. Our experts provide valuable insights and support to help you make informed decisions and achieve long-term success.
                </p>
              </div>
            </div>
            {/* Image beside Our Services */}
            <div className="lg:w-1/2 mt-6 lg:mt-0">
              <img
                src={Register} // Replace with your desired image URL
                alt="Our Services"
                className="rounded-lg w-full h-auto object-cover transition-transform transform hover:scale-105 animate-fade-in"
              />
            </div>
          </div>
          <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4 mt-8 font-poppins animate-fade-in">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside mb-4 font-lora">
              <li className="text-lg flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-blue-500" />{' '}
                <b>Expertise:</b> <i>Our team of professionals has extensive experience in company registration and promotion.</i>
              </li>
              <li className="text-lg flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-blue-500" />{' '}
                <b>Tailored Solutions:</b> <i>We customize our services to meet the unique needs of each client.</i>
              </li>
              <li className="text-lg flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-blue-500" />{' '}
                <b>Comprehensive Support:</b> <i>From initial registration to ongoing promotion, we offer end-to-end support.</i>
              </li>
              <li className="text-lg flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-blue-500" />{' '}
                <b>Client-Centric Approach:</b> <i>Your satisfaction is our priority. We work closely with you to achieve your business goals.</i>
              </li>
            </ul>
            <p className="text-lg font-lora animate-fade-in">
              At Z-Group Company, we are committed to helping your business thrive. Contact us today to learn more about how we can assist you in achieving your goals.
            </p>
          </div>

          {/* Vision and Goal Section */}
          <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4 font-poppins animate-fade-in">
              Vision and Goal
            </h2>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg text-white space-y-6">
              <p className="text-lg font-lora">
                Our vision is to be the leading company in providing business registration and promotion services, recognized for our excellence and innovation. We aim to create a platform where businesses can thrive, focusing on their growth and success with our dedicated support.
              </p>
              <p className="text-lg font-lora">
                Our goal is to simplify and accelerate the process for businesses, ensuring they have the tools and opportunities to stand out in their respective industries. We are committed to continually improving our services and expanding our reach to serve more businesses globally.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer
        ref={footerRef}
        className={`transition-all duration-1000 ease-in-out transform ${
          isFooterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
        style={{ position: 'relative', zIndex: 0 }}
      >
        <Footer />
    
</footer>

    </div>
  );
};

export default AboutPage;
