import React, { Component } from "react";
import UserClass from "./UserClass";

class About extends Component {
  render() {
    return (
      <div className="pt-24 pb-16 px-4 md:px-8 bg-gray-50 min-h-screen flex flex-col items-center text-center">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-orange-500">Just4Food</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            We're dedicated to delivering delicious meals right to your
            doorstep with speed and convenience.
          </p>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Meet the founder
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <UserClass name="Rusmeen Khan" location="Gurgaon, Haryana" />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
