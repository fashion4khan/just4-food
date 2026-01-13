import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    question: "What is this app about ?",
    answer:
      "this app helps users to provide online food delivery at home and work locations.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login screen and follow instructions.",
  },
  {
    question: "Can I use this app offline?",
    answer: "No, All features are available online after the initial setup.",
  },
];
const Contact = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className="max-w-xl mx-auto p-4 pt-24 text-xl font-sans">
      <h1 className="text-3xl mb-6 text-center font-bold">
        Frequently Asked Questions{" "}
      </h1>
      {faqs.map((faq, index) => (
        <div className="border-b border-gray-300 mb-4 text-xl" key={index}>
          <button
            className="w-full text-base p-4 flex justify-between items-center font-medium text-gray-800 bg-transparent border-none cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <span className="text-lg">{faq.question}</span>
            <span className="text-xl">
              {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
            </span>
          </button>
          {activeIndex === index && (
            <div className="px-4 pb-4 pt-3 bg-gray-100 text-gray-600 text-sm">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Contact;
