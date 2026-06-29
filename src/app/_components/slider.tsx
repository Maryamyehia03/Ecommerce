"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
// import { getCategories } from "../service/categories";
import { Icategories } from "../types/ctegories";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
export default function Mainslider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className=" container bg-amber-100 m-auto">
      <Slider {...settings}>
        <div>
          <Image src="/41nN4nvKaAL._AC_SY200_.jpeg" width={500} height={500} alt="Picture of the author"/>
        </div>
        <div>
          {/* <Image src="/baby.jpg" width={500} height={500} alt="Picture of the author"/> */}
        </div>
        <div>
          {/* <Image src="/accessory.jpg" width={500} height={500} alt="Picture of the author"/> */}
        </div>
      </Slider>
    </div>
  );
}
export function Categoryslider({data}:{data:Icategories[]}) {
  
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <div className="my-10 ">
      <Slider {...settings}>
        {data.map((item)=>
        <div key={item?._id} className="flex justify-center">
          <Image src={item?.image} width={500} height={500} alt={item?.name} className=" h-[200px] w-[100%]"/>
        </div>
        )}
      </Slider>
    </div>
  );
}
