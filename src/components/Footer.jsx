import React, { useState } from "react";
import footerLogo from "../assets/footer-logo.png";

import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useCreateSubscriberMutation } from "../redux/features/subscriber/subscriberApi";
import Swal from "sweetalert2";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribe, { isLoading, isSuccess, isError, error }] =
    useCreateSubscriberMutation();

  const handleSubscribe = async () => {
    if (!email) return alert("Please enter a valid email.");
    console.log("Trying to Subscribe with: ", email);
    try {
      await subscribe({ email }).unwrap();
      Swal.fire({
        title: "Subscription Successful",
        text: "You will get the update through your Email!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, it's Okay!",
      });
      setEmail(""); // Clear the field
    } catch (err) {
      console.error("Subscription failed:", err);
    }
  };
  return (
    <footer className="bg-gray-600 text-white py-10 px-4">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left side logo and nav */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <a href="#home" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side - Newsletter  */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest updates, news, and
            offers!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-l-md text-black bg-white focus:outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="bg-primary px-6 py-2 rounded-r-md hover:bg-primary-dark"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
          {/* {isSuccess && (
            <p className="text-green-300 mt-2">Subscribed successfully!</p>
          )}
          {isError && (
            <p className="text-red-300 mt-2">
              {error?.data?.message || "Subscription failed."}
            </p>
          )} */}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Left Side - Privacy Links */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li>
            <a href="#privacy" className="hover:text-primary">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-primary">
              Terms of Service
            </a>
          </li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
