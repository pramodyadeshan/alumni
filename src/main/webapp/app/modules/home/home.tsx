import './home.scss';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'app/config/store';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { FaCalendarAlt, FaBars, FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  const form = useRef();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [viewDiv, setViewDiv] = useState(false);
  const animation = useAnimation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/email/sendEmail', formData);
      console.log(response.data);
      // Reset form after successful submission
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  useEffect(() => {
    if (inView) {
      setViewDiv(true);
    } else {
      setViewDiv(false);
    }
  }, [inView, animation]);

  const contactAnimation = {
    hidden: {
      y: -200,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.75,
        duration: 0.5,
      },
    },
  };

  const headingAnimation = {
    hidden: {
      y: -200,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, type: 'spring' },
    },
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <main className="container mx-auto p-8">
        {/* Main Content */}
        <section className="text-center my-16">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-12 rounded-lg shadow-lg">
            <h1 className="text-5xl font-extrabold text-white mb-4 animate__animated animate__fadeIn">
              Welcome to Alumni Management with Event Management
            </h1>
            <p className="text-2xl text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
              Your Pathway to Personalized Alumni Get Together
            </p>
            <p className="text-lg text-white mb-8 animate__animated animate__fadeIn animate__delay-2s">
              Empowering every alumni to collaborate together.
            </p>
            {!account?.login && (
              <div className="flex justify-center space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section className="my-16 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">About Us</h2>
          <p className="text-xl text-gray-700 text-justify">
            Welcome to Alumni Management With Event Management where we seamlessly integrate alumni management with dynamic event management
            to foster lifelong connections and engagement. Our platform is designed to enhance the alumni experience by offering a
            comprehensive suite of tools for tracking leadership roles, managing events, and facilitating meaningful interactions. Whether
            you're an administrator aiming to streamline alumni relations or a member seeking to stay connected, our system provides an
            intuitive interface and robust features to meet your needs. With a focus on user-friendly design and effective management,
            Alumni Management With Event Management is dedicated to supporting the growth and success of your alumni network through
            innovative solutions and exceptional service.
          </p>
        </section>

        {/* About Alumni Management With Event Management Section */}
        <section className="my-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">About Alumni Management With Event Management</h2>
          <p className="text-lg text-gray-700 text-justify">
            At Alumni Management with Event Management, we provide an integrated solution designed to bring together the best of alumni
            engagement and event coordination. Our platform simplifies the complexities of managing alumni networks while offering powerful
            tools for organizing and executing events. With our system, you can effortlessly track alumni achievements, coordinate impactful
            events, and foster meaningful connections within your community. Our user-centric approach ensures that both administrators and
            alumni have access to a seamless, intuitive experience. By combining advanced technology with a commitment to excellence, we
            empower organizations to enhance their alumni relations and drive successful events that strengthen their network.
          </p>
        </section>

        {/* Contact Section */}
        <section className="my-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Contact</h2>
          <div className="text-lg text-gray-700 mb-4">
            <div className="flex items-center mb-2">
              <FaUser className="text-gray-500 mr-2" />
              <p>
                <strong>Name:</strong> Mr. Director
              </p>
            </div>
            <div className="flex items-center mb-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <p>
                <strong>Email:</strong> info@alumnimanagementwitheventmanagement.com
              </p>
            </div>
            <div className="flex items-center mb-2">
              <FaPhone className="text-gray-500 mr-2" />
              <p>
                <strong>Phone:</strong> +94 76 963 1234
              </p>
            </div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <p>
                <strong>Address:</strong> Godakawela, Sri Lanka
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
