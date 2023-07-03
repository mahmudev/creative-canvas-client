import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Carousel = () => {
  return (
    <div className="">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <div className=" h-screen">
          <SwiperSlide>
            <div className=" w-full">
              <section
                className="bg-cover bg-center py-96 w-full"
                style={{
                  backgroundImage:
                    'url("https://i.ibb.co/QHB9ng2/pexels-lwfwefumn-587958.jpg")',
                }}
              >
                <div className="container mx-auto text-left text-white">
                  <div className="flex items-center">
                    <div className="w-full">
                      <h1 className="text-5xl text-gray-900 font-medium mb-6">
                        Creative Canvas
                      </h1>
                      <p className="text-xl mb-12 text-gray-900">
                        “Art breathes life into the world, weaving dreams and
                        emotions into a tapestry of boundless expression.”
                      </p>
                      <Link to={"/classes"}>
                        <button className="btn btn-primary">
                          View Classes
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" w-full">
              <section
                className="bg-cover bg-center py-96 w-full"
                style={{
                  backgroundImage:
                    'url("https://i.ibb.co/TKK2rVf/pexels-steve-johwfqwfnson-1047540.jpg")',
                }}
              >
                <div className="container mx-auto text-left text-white">
                  <div className="flex items-center">
                    <div className="w-full">
                      <h1 className="text-5xl text-gray-900 font-medium mb-6">
                        Creative Canvas
                      </h1>
                      <p className="text-xl mb-12 text-gray-900">
                        “Art breathes life into the world, weaving dreams and
                        emotions into a tapestry of boundless expression.”
                      </p>
                      <Link to={"/classes"}>
                        <button className="btn btn-primary">
                          View Classes
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" w-full">
              <section
                className="bg-cover bg-center py-96 w-full"
                style={{
                  backgroundImage:
                    'url("https://i.ibb.co/V2RVtL1/pexels-eqdwqdmily-hopper-1084406.jpgs")',
                }}
              >
                <div className="container mx-auto text-left text-white">
                  <div className="flex items-center">
                    <div className="w-full">
                      <h1 className="text-5xl text-gray-900 font-medium mb-6">
                        Creative Canvas
                      </h1>
                      <p className="text-xl mb-12 text-gray-900">
                        “Art breathes life into the world, weaving dreams and
                        emotions into a tapestry of boundless expression.”
                      </p>
                      <Link to={"/classes"}>
                        <button className="btn btn-primary">
                          View Classes
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
};

export default Carousel;
