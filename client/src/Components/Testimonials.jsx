import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

import userReviews from "./../Data/review";
const Testimonials = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll progress
  const handleScroll = () => {
    const container = carouselRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const scrollPercent = (container.scrollLeft / maxScroll) * 100;
    setScrollProgress(scrollPercent);
  };

  // Add scroll event listener
  useEffect(() => {
    const container = carouselRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="bg-gradient-to-b from-purple-900 to-gray-900 text-white py-12 h-screen">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Testimonials
        </h2>
        <div className="sm:flex flex-wrap justify-between space-x-4 px-4 w-[80vw] mx-auto hidden ">
          {userReviews.map((review, i) => (
            <div
              className={`relative ${i === 1 || i === 3 ? "mt-14" : ""}`}
              key={i}
            >
              <div className="w-34 h-34 rounded-t-full overflow-hidden bg-white/5">
                <div className="z-40 relative">
                  <img
                    src={review.profilePic}
                    alt={review.name}
                    className="w-34 h-34 rounded-full border-2 shadow-2xl object-contain"
                  />
                </div>
              </div>
              <motion.div
                initial={{ y: -70 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
                viewport={{ amount: 0.8 }}
                className="absolute top-18 w-34 h-auto  rounded-b-full rounded-t-3xl top-24 backdrop-blur-lg bg-white/5"
              >
                <div className="mt-14 mb-10">
                  <h3 className="text-sm text-center">{review.name}</h3>
                  <p className="text-xs text-center">{review.company}</p>
                  <p className="text-xs px-2 pt-3">{review.review}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="">
          <div className="relative w-[80vw] mx-auto hidden max-sm:block">
            {/* Left Arrow */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-purple-900 p-2 rounded-full shadow-md z-10 hidden md:block"
              onClick={scrollLeft}
            >
              ⬅️
            </button>

            {/* Scrollable Container */}
            <div
              ref={carouselRef}
              className="flex space-x-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar max-md:w-full"
            >
              {/* Slides */}
              {userReviews.map((review, index) => {
                const itemRef = useRef(null);
                const itemInView = useInView(itemRef, {
                  triggerOnce: true,
                  threshold: 0.2,
                });
                return (
                  <div
                    key={index}
                    className="snap-center flex-shrink-0 w-full h-[380px] flex  justify-center rounded-lg p-4 "
                  >
                    <div className="relative" ref={itemRef}>
                      <div className="w-44 h-44 bg-gray-300 rounded-t-full overflow-hidden bg-white/5">
                        <div className="z-40 relative">
                          <img
                            src={review.profilePic}
                            alt={review.name}
                            className="w-44 h-44 rounded-full border-2 shadow-lg object-contain"
                          />
                        </div>
                      </div>
                      <motion.div
                        initial={{ y: -70 }}
                        animate={itemInView ? { y: 0 } : {}}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute top-18 w-44 h-auto backdrop-blur-lg bg-white/5 rounded-full top-0"
                      >
                        <div className="mt-28 mb-10 pb-4">
                          <h3 className="text-sm text-center">{review.name}</h3>
                          <p className="text-xs text-center">
                            {review.company}
                          </p>
                          <p className="text-xs px-2 pt-3">{review.review}</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll Progress Bar */}
            <div className="w-full h-1 bg-gray-200 rounded mt-2">
              <div
                className="h-full bg-purple-500 rounded transition-all duration-200"
                style={{ width: `${scrollProgress}%` }}
              ></div>
            </div>

            {/* Right Arrow */}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-purple-900 p-2 rounded-full shadow-md z-10 hidden md:block"
              onClick={scrollRight}
            >
              ➡️
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
