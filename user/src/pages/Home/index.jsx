import Hero from "../../components/hero/Hero";
import SecondHero from "../../components/hero/SecondHero";
import CategoryGrid from "../../components/card/CategorGrid";
import HeroAtLast from "../../components/hero/HeroAtLast";
import ProductCard from "../../components/card/Card";
import { useProductContext } from "../../context/ProductContext";
import Loader from "../../assets/loading.gif";
import NewsSection from "../../components/news/NewsSection";

const newsData = [
  {
    id: 1,
    imageUrl: '/path/to/image1.jpg',
    date: '17',
    month: 'T06',
    title: 'Vitamin D3 và lợi ích không thể thiếu cho bé yêu nhà bạn',
    excerpt: 'Vitamin D3 cho trẻ là một sản phẩm không thể thiếu...',
    comments: 0,
    author: 'Nhi Marketing',
  },
  {
    id: 2,
    imageUrl: '/path/to/image2.jpg',
    date: '17',
    month: 'T06',
    title: 'Hướng dẫn chăm sóc não bộ ở trẻ nhỏ',
    excerpt: 'Chăm sóc não bộ cho trẻ nhỏ là một việc hết sức quan trọng...',
    comments: 0,
    author: 'Nhi Marketing',
  },
  {
    id: 3,
    imageUrl: '/path/to/image3.jpg',
    date: '01',
    month: 'T06',
    title: '[Hà Nội] Thế Giới Sữa tuyển dụng',
    excerpt: 'VIỆC NGAY TẦM TAY – CHỚP NGAY KẺO LỠ...',
    comments: 0,
    author: 'ADMIN THẾ GIỚI SỮA',
  },
];

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
      <NewsSection news={newsData} />
    </div>
  );
};

export default Home;
