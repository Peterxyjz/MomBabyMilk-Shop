import React from 'react'
import Hero from '../../components/hero/Hero'
import Slider from '../../components/slider/index'
import SecondHero from '../../components/hero/SecondHero';
import CategoryCard from '../../components/card/CategoryCard';
import CategoryGrid from '../../components/card/CategorGrid';
import HeroAtLast from '../../components/hero/HeroAtLast';
import ProductCard from '../../components/card/Card';

const MomNBaby = {
  title: "Sản phẩm hỗ trợ cho mẹ và bé",
  slides: [
    { image: "https://picsum.photos/300/400", title: "This is a title", description: "This is a description", clickEvent: () => console.log("Clicked") },
    { image: "https://picsum.photos/300/400", title: "This is a second title", description: "This is a second description", clickEvent: () => console.log("Clicked") },
    { image: "https://picsum.photos/300/400", title: "This is a third title", description: "This is a third description", clickEvent: () => console.log("Clicked") },
    { image: "https://picsum.photos/300/400", title: "Product 1", description: "Description 1", clickEvent: () => console.log("Clicked") },
    { image: "https://picsum.photos/300/400", title: "Product 2", description: "Description 2", clickEvent: () => console.log("Clicked") },
    { image: "https://picsum.photos/300/400", title: "Product 3", description: "Description 3", clickEvent: () => console.log("Clicked") }
  ]
};

const Mom = {
  title: "Sản phẩm cho mẹ",
  slides: [
    { image: "https://picsum.photos/300/400", title: "Product 1", description: "Description 1", clickEvent: () => console.log("Clicked") },
    { image: "https://picsum.photos/300/400", title: "Product 2", description: "Description 2", clickEvent: () => console.log("Clicked") },
    { image: "https://picsum.photos/300/400", title: "Product 3", description: "Description 3", clickEvent: () => console.log("Clicked") },
    { image: "https://picsum.photos/300/400", title: "Product 1", description: "Description 1", clickEvent: () => console.log("Clicked") },
    { image: "https://picsum.photos/300/400", title: "Product 2", description: "Description 2", clickEvent: () => console.log("Clicked") },
    { image: "https://picsum.photos/300/400", title: "Product 3", description: "Description 3", clickEvent: () => console.log("Clicked") }
  ]
};

const Home = () => {
  return (
    <div className='min-h-screen'>
      <Hero />
      <ProductCard />
      <div>
        <Slider title={MomNBaby.title} slides={MomNBaby.slides} />
        <Slider title={Mom.title} slides={Mom.slides} />
      </div>
      <SecondHero />
      <HeroAtLast />
      <CategoryGrid />
    </div>
  )
}

export default Home