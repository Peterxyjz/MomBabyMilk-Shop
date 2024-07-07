import { useEffect, useState } from "react";
import PostListNews from "../../components/news/PostListNews";
import SidebarNews from "../../components/news/SidebarNews";
import { fetchGetAllNews } from "../../data/api";
import Loader from "../../assets/loading2.gif";
import Breadcrumbs from "../../components/elements/Breadcrumb";
const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const data = await fetchGetAllNews();
        setPosts(data.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };
    getAllPosts();
  }, []);
  console.log(posts);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <img src={Loader} alt="loading" />
      </div>
    );
  }
  const recent = posts.slice(-5).reverse();
  return (
    <>
      <Breadcrumbs headline="Tin tức" />
      <div className="container mx-auto p-4 flex flex-wrap md:flex-nowrap">
        <SidebarNews posts={recent} />
        <PostListNews posts={posts} />
      </div>
    </>
  );
};

export default News;
