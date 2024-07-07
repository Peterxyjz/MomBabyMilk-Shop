import { Link } from 'react-router-dom';
import babynews from "../../assets/images/body/babynews.jpg";

const NewsSection = ({ news }) => {
    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 mt-12">
                <h2 className="text-2xl font-bold">Tin tức</h2>
                <Link to="/all-news" className="text-blue-500 hover:underline" onClick={() => window.scrollTo(0, 0)}>
                    Xem tất cả
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {news.map((item) => (
                    <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="relative">
                            {/* <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" /> */}
                            <img src={babynews} alt={item.title} className="w-full h-48 object-cover" />
                            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-lg">
                                <span className="block text-sm">{item.date}</span>
                                <span className="block text-sm">{item.month}</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>
                            <div className="flex justify-between items-center">
                                <div className="text-orange-500 flex items-center">
                                    <span>{item.comments} Bình luận</span>
                                    <span className="ml-2">{item.author}</span>
                                </div>
                                <Link to={`/news/${item.id}`} className="text-blue-500 hover:underline" onClick={() => window.scrollTo(0, 0)}>
                                    Đọc thêm
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
