import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Import Autoplay module from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'; // Include if you want scrollbars
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Imges1 from '../image/view-city-square.jpg';
import Imges2 from '../image/4.jpg';
import Imges3 from '../image/2.jpg';
import Imges4 from '../image/3.jpg';
import FAQ from '../image/register-now-banner.png';
import AnimatedIcon from './AnimatedIcon';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaRegListAlt, FaBullhorn, FaHandHoldingUsd, FaUsersCog } from 'react-icons/fa';
import { AiOutlineCheckCircle, AiOutlineHome } from 'react-icons/ai';
import Testimonials from './Testimonials';
// import './home.css';
// import SwiperCore from 'swiper';
// import 'swiper/swiper-bundle.css';

// SwiperCore.use([Autoplay]);
//   hidden: { opacity: 0, height: 0, overflow: 'hidden' },
//   visible: { opacity: 1, height: 'auto', overflow: 'visible' },
// };

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Open the first FAQ item by default
  const [notifications, setNotifications] = useState([]);
  const token = 'your-auth-token'; // Replace with actual token
  const faqVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);


  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('/api/companies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies', error);
      }
    };

    fetchCompanies();
  }, []);

  // const notifications = [
  //   'Special Offer: Get 20% off on all services!',
  //   'New Feature: Check out our latest updates!',
  //   'Limited Time Deal: Sign up today and save!',
  // ];
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/promotions');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    };

    fetchNotifications();
  }, []);
  const images = [
    {
      src: Imges1,
      title: 'Welcome to Z-Group',
      link: '/about',
    },
    {
      src: Imges3,
      title: 'Company Registration',
      link: '/companies',
    },
    {
      src: Imges4,
      title: 'Promotion Services',
      link: '/promotions',
    },
  ];

  // FAQ Questions and Answers
  const faqs = [
    { question: 'What services do you offer?', answer: 'We offer a range of services including company registration, promotion services, and business consultation.' },
    { question: 'How do I register my company?', answer: 'You can register your company by filling out our online form, and our team will assist you with the entire process.' },
    { question: 'What are your promotion strategies?', answer: 'Our promotion strategies are tailored to your business needs, focusing on increasing visibility and attracting customers.' },
    { question: 'How much do your services cost?', answer: 'Our pricing is competitive and varies depending on the services you choose. Contact us for a detailed quote.' },
    { question: 'How can I get started?', answer: 'Getting started is easy! Just contact us, and we’ll guide you through the process.' },
  ];

  // Toggle FAQ
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


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
    <div className="font-roboto" style={{zIndex: 1}}>
      <Navbar />
      


<div className=" mt-0" style={{zIndex: 1, position: '',backgroundColor: 'white'}}>

      {/* Image Slider Section */}
      <div className="relative mt-0" style={{zIndex: 1}}>

      {/* <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-8 px-6 rounded-lg shadow-xl"> */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-opacity-75 bg-gray-900 text-lg font-bold p-3 rounded-lg shadow-lg text-white">
          Advert Here
        </div>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="relative z-10 notification-swiper"
      >
        {notifications.map((notification, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-center relative overflow-hidden"
              style={{
                backgroundColor: '#f7f3e9',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5), 0 2px 5px rgba(0,0,0,.1)',
                border: '1px solid #e0d6c4',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow =
                  'inset 0 1px 0 rgba(255,255,255,.5), 0 10px 15px rgba(0,0,0,.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  'inset 0 1px 0 rgba(255,255,255,.5), 0 2px 5px rgba(0,0,0,.1)';
              }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{notification.title}</h3>
              <p className="text-gray-700 text-lg">{notification.description}</p>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-300 opacity-30 rounded-lg"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          modules={[Autoplay]} // Add Autoplay module here
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Configure autoplay
          className="image-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-screen">
                <img
                  src={image.src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover" style={{objectFit: 'cover', objectPosition: 'center', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}    
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
                <h1 className="text-4xl font-bold mb-4">{image.title}</h1>
                  <a href={image.link}
                    className="bg-blue-600 px-4 py-2 no-underline rounded text-white hover:bg-blue-700 flex items-center justify-center"
                  >
              <FaArrowRight className="hover:animate-spin transform transition duration-500" />
              </a>

                    {/* <AnimatedIcon link={image.link} /> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <main className="container mx-auto p-6" style={{zIndex: 1}}>
        <p className="text-lg mb-6">
          Welcome to Z-Group Company, where we specialize in company registration and promotion. Our goal is to simplify the process of setting up your business and help you gain visibility in the market.
        </p>
        <p className="text-base mb-6">
          We provide comprehensive solutions tailored to your needs, whether you're a new business seeking registration or an existing company looking to enhance your presence through targeted promotions.
        </p>

{/* Services Section */}
<div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 font-poppins">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-2xl hover:bg-indigo-500 hover:text-blue-500">
              <div className="flex items-center mb-4">
                <FaRegListAlt className="text-4xl text-blue-600 mr-4" />
                <h3 className="text-xl font-semibold">Company Registration</h3>
              </div>
              <p className="text-gray-600 hover:text-blue-500">
                We provide hassle-free company registration services to get your business up and running.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-2xl hover:bg-indigo-500 hover:text-blue-500">
              <div className="flex items-center mb-4">
                <FaBullhorn className="text-4xl text-blue-600 mr-4" />
                <h3 className="text-xl font-semibold">Promotion Services</h3>
              </div>
              <p className="text-gray-600 hover:text-blue-500">
                Boost your company's visibility with our targeted promotion strategies.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-2xl hover:bg-indigo-500 hover:text-blue-500">
              <div className="flex items-center mb-4">
                <FaHandHoldingUsd className="text-4xl text-blue-600 mr-4" />
                <h3 className="text-xl font-semibold">Consultation</h3>
              </div>
              <p className="text-gray-600 hover:text-blue-500">
                Get expert advice and guidance on various business aspects to help you succeed.
              </p>
            </div>
          </div>
        </div>
        </main>
       

        {/* Companies Section */}
        <div 
  className="relative mt-8 py-8 w-full"
  style={{
    backgroundImage: `url(${Imges2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    zIndex: 1,
  }}
>
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="relative z-10 max-w-screen-xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-4 text-white text-center">
      Our Companies
    </h2>
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay]}
    >
      {companies.map((company) => (
        <SwiperSlide key={company.id}>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        
            <img
             src={`/${company.logoUrl}`}
              alt={company.name}
              className="w-full h-32 mx-auto mb-2 object-cover"
            />
            <h3 className="text-xs font-semibold">{company.name}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>


       <div className="relative mt-0">
<main className="container mx-auto p-6" style={{zIndex: 1}}>
       {/* Why Choose Us Section */}
       <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 font-poppins">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <AiOutlineCheckCircle className="text-4xl text-blue-600 mr-4" />
                <h3 className="text-xl font-semibold">Expert Team</h3>
              </div>
              <p className="text-gray-600">
                Our team consists of experienced professionals who are dedicated to your success.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <FaUsersCog className="text-4xl text-blue-600 mr-4" />
                <h3 className="text-xl font-semibold">Tailored Solutions</h3>
              </div>
              <p className="text-gray-600">
                We offer customized solutions that cater to your specific business needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <AiOutlineHome className="text-4xl text-blue-600 mr-4" />
                <h3 className="text-xl font-semibold">Comprehensive Services</h3>
              </div>
              <p className="text-gray-600">
                From registration to promotion, we provide a full range of services under one roof.
              </p>
            </div>
          </div>
        </div>
{/* <Testimonials/> */}
        {/* FAQ Section */}
        <div className="mt-12" >
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-2/3 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-300 rounded-lg shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: activeIndex === index ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="w-full px-6 py-4 bg-white text-left text-gray-800 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="px-6 py-4 bg-gray-50 text-gray-600"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={faqVariants}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

            <div className="lg:w-1/3 mt-8 lg:mt-0 flex justify-center items-center">
              <img
                src={FAQ} // Replace with your image URL
                alt="FAQ Image"
                // className="rounded-lg shadow-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </main>
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

export default HomePage;