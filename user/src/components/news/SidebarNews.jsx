const SidebarNews = ({ posts }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year} `;
    };
  return (
    <div className="w-full md:w-1/4 p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm...."
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="mb-4 border rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">Bài đăng gần đây</h2>
        {posts.map((item) => (
          <div key={item._id} className="flex items-center mb-4">
            <img
              src={item.img_url}
              alt={item.news_name}
              className="w-16 h-16 rounded-lg mr-4"
            />
            <div className="flex-1 min-w-0">
              <a
                href="#"
                className="block font-bold truncate w-full overflow-hidden whitespace-nowrap"
              >
                {item.news_name}
              </a>
              <p className="text-sm text-gray-600">{formatDate(item.created_at)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">Loại tin tức</h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="block">
              Latest Recipes (10)
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block">
              Diet Food (6)
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block">
              Low calorie Items (8)
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block">
              Cooking Method (9)
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarNews;
