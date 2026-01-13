import React, { Component } from "react";
import UserClass from "./UserClass";

class About extends Component {
  render() {
    return (
      <div className="p-24 bg-gray-50 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-6">
          Welcome to Just4Food! We are dedicated to delivering delicious meals right to your doorstep with speed and convenience.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <UserClass name="Rusmeen Khan" location="Gurgaon, Haryana" />
      </div>
    );
  }
}

export default About;
