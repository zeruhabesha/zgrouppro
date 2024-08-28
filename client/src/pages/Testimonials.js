import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      feedback: 'Amazing services! Highly recommend.',
      rating: 5,
    },
    {
      name: 'Jane Smith',
      feedback: 'Great support and excellent results.',
      rating: 4,
    },
    {
      name: 'Emily Davis',
      feedback: 'Professional and timely delivery of services.',
      rating: 5,
    },
    {
      name: 'Michael Brown',
      feedback: 'A great platform for promoting our business.',
      rating: 4,
    },
  ];

  return (
    <div className="w-full bg-gray-100 py-12"> {/* Full width with background color */}
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">What Our Clients Say</h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        className="testimonialSwiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-8 rounded-lg shadow-lg mx-auto max-w-lg text-center">
              <p className="text-xl mb-4 font-semibold text-gray-800">{testimonial.name}</p>
              <p className="text-gray-600 mb-4">{testimonial.feedback}</p>
              <p className="text-yellow-500">{'⭐'.repeat(testimonial.rating)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Z-Group Promotion Idea Section */}
      <div className="mt-12 bg-blue-500 text-white text-center p-8 rounded-lg w-full">
        <h3 className="text-2xl font-bold mb-4">Z-Group Promotion</h3>
        <p className="text-lg">
          Register your company for free and promote it on our platform. Take advantage of our robust search engine and centralized information system to boost your visibility and connect with potential clients!
        </p>
        <button className="mt-6 bg-white text-blue-500 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-gray-200">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
