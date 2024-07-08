import Hero from "../../components/hero/Hero";
import SecondHero from "../../components/hero/SecondHero";
import CategoryGrid from "../../components/card/CategorGrid";
import HeroAtLast from "../../components/hero/HeroAtLast";
import ProductCard from "../../components/card/Card";
import { useProductContext } from "../../context/ProductContext";
import Loader from "../../assets/loading.gif";
import NewsSection from "../../components/news/NewsSection";

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
  const newProducts = products.slice(-10).reverse();

  const bestSellers = products.slice().sort((a, b) => a.sales - b.sales).slice(0, 10);
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductCard products={newProducts} headline={"Sản phẩm mới"} viewAllLink="/latest_product" />
      <ProductCard products={bestSellers} headline={"Sản phẩm bán chạy"} viewAllLink="/best_seller" />
      <SecondHero />
      <ProductCard products={products} headline={"Sữa dành cho mẹ bầu"} />
      <ProductCard products={products} headline={"Sữa dành cho trẻ sơ sinh"} />
      <HeroAtLast />
      <CategoryGrid />
      <NewsSection />
    </div>
  );
};

export default Home;
