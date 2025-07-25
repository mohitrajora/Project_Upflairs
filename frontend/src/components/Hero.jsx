import React from "react";

const Hero = () => {
  return (
    <section className="bg-pink-100 py-20 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">New Season, New Style</h2>
      <p className="text-lg md:text-xl text-gray-700 mb-6">
        Discover the latest trends in fashion
      </p>
      <button className="px-6 py-3 bg-pink-600 text-white rounded hover:bg-pink-700 transition">
        Shop Now
      </button>
    </section>
  );
};

export default Hero;
