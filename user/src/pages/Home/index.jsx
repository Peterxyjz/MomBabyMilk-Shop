import Hero from "../../components/hero/Hero";
import SecondHero from "../../components/hero/SecondHero";
// import CategoryGrid from "../../components/card/CategorGrid";
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
  
    const getCategoryProducts = (categoryName) => {
      return products.filter((product) => product.category_name === categoryName);
    };
  
    const newProducts = products.slice(-(products.length - 1)).reverse();
    const bestSellers = products.sort((a, b) => b.sales - a.sales);
    const categoryProductsMomToBe = getCategoryProducts("Sữa cho mẹ bầu");
    const categoryProductsInfantMilk = getCategoryProducts("Sữa bột");
  
    return (
      <div className="container mx-auto min-h-screen">
        <Hero />
        <ProductCard products={newProducts} headline={"Sản phẩm mới"} />
        <ProductCard products={bestSellers} headline={"Sản phẩm bán chạy"} />
        <SecondHero />
        <ProductCard
          products={categoryProductsMomToBe}
          headline={"Sữa dành cho mẹ bầu"}
        />
        <ProductCard
          products={categoryProductsInfantMilk}
          headline={"Sữa dành cho trẻ sơ sinh"}
        />
        <HeroAtLast />
        {/* <CategoryGrid /> */}
        <NewsSection />
      </div>
    );
};

export default Home;
