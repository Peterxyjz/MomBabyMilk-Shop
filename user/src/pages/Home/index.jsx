import React from "react";
import Loader from "../../assets/loading.gif";
import Hero from "../../components/hero/Hero";
import Slider from "../../components/slider/index";
import SecondHero from "../../components/hero/SecondHero";
import CategoryGrid from "../../components/card/CategorGrid";
import HeroAtLast from "../../components/hero/HeroAtLast";
import ProductCard from "../../components/card/Card";
import { useProductContext } from "../../context/ProductContext";

const MomNBaby = {
  title: "Sản phẩm hỗ trợ cho mẹ và bé",
  slides: [
    {
      image: "https://picsum.photos/300/400",
      title: "This is a title",
      description: "This is a description",
      clickEvent: () => console.log("Clicked"),
    },
    {
      image: "https://picsum.photos/300/400",
      title: "This is a second title",
      description: "This is a second description",
      clickEvent: () => console.log("Clicked"),
    },
    {
      image: "https://picsum.photos/300/400",
      title: "This is a third title",
      description: "This is a third description",
      clickEvent: () => console.log("Clicked"),
    },
    {
      image: "https://picsum.photos/300/400",
      title: "Product 1",
      description: "Description 1",
      clickEvent: () => console.log("Clicked"),
    },
    {
      image: "https://picsum.photos/300/400",
      title: "Product 2",
      description: "Description 2",
      clickEvent: () => console.log("Clicked"),
    },
    {
      image: "https://picsum.photos/300/400",
      title: "Product 3",
      description: "Description 3",
      clickEvent: () => console.log("Clicked"),
    },
  ],
};

const Mom = {
  title: "Sản phẩm cho mẹ",
  slides: [
    {
      image: "https://picsum.photos/300/400",
      title: "Product 1",
      description: "Description 1",
      clickEvent: () => console.log("Clicked"),
    },
    {
      image: "https://picsum.photos/300/400",
      title: "Product 2",
      description: "Description 2",
      clickEvent: () => console.log("Clicked"),
    },
    {
      image: "https://picsum.photos/300/400",
      title: "Product 3",
      description: "Description 3",
      clickEvent: () => console.log("Clicked"),
    },
    {
      image: "https://picsum.photos/300/400",
      title: "Product 1",
      description: "Description 1",
      clickEvent: () => console.log("Clicked"),
    },
    {
      image: "https://picsum.photos/300/400",
      title: "Product 2",
      description: "Description 2",
      clickEvent: () => console.log("Clicked"),
    },
    {
      image: "https://picsum.photos/300/400",
      title: "Product 3",
      description: "Description 3",
      clickEvent: () => console.log("Clicked"),
    },
  ],
};

const Home = () => {
  const { products, loading } = useProductContext();
  if (loading)
    return (
      <div
        className="fixed w-full h-full z-[10000] flex items-center justify-center bg-white"
        style={{ left: 0, top: 0 }}
      >
        <img src={Loader} alt="Loading..." />
      </div>
    );
  return (
    <div className="min-h-screen">
      <Hero />

      <ProductCard products={products} />
      <div>
        <Slider title={MomNBaby.title} slides={MomNBaby.slides} />
        <Slider title={Mom.title} slides={Mom.slides} />
      </div>
      <SecondHero />
      <ProductCard products={products} />
      <HeroAtLast />
      <CategoryGrid />
    </div>
  );
};

export default Home;
