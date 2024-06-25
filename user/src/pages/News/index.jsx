import React from 'react';

const posts = [
    {
        id: 1,
        title: 'Green onion knife and salad...',
        date: '25 Jan, 2022',
    },
    {
        id: 2,
        title: 'Health and skin for your organic...',
        date: '25 Jan, 2022',
    },
    {
        id: 3,
        title: 'Organics mix masala fresh...',
        date: '25 Jan, 2022',
    },
    {
        id: 4,
        title: 'Fresh organics brand and...',
        date: '25 Jan, 2022',
    },
    // Add more posts as needed
];

const Sidebar = () => (
    <div className="w-full md:w-1/4 p-4">
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search...."
                className="w-full p-2 border rounded-lg"
            />
        </div>
        <div className="mb-4 border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Recent Post</h2>
            {posts.map((post) => (
                <div key={post.id} className="flex items-center mb-4">
                    <img src="https://via.placeholder.com/450x300" alt="" className="w-16 h-16 rounded-lg mr-4" />
                    <div className="flex-1 min-w-0">
                        <a href="#" className="block font-bold truncate w-full overflow-hidden whitespace-nowrap">
                            {post.title}
                        </a>
                        <p className="text-sm text-gray-600">{post.date}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Category</h2>
            <ul>
                <li className="mb-2">
                    <a href="#" className="block">Latest Recipes (10)</a>
                </li>
                <li className="mb-2">
                    <a href="#" className="block">Diet Food (6)</a>
                </li>
                <li className="mb-2">
                    <a href="#" className="block">Low calorie Items (8)</a>
                </li>
                <li className="mb-2">
                    <a href="#" className="block">Cooking Method (9)</a>
                </li>
            </ul>
        </div>
    </div>
);

const PostList = () => (
    <div className="w-full md:w-3/4 p-4">
        {posts.map((post) => (
            <div key={post.id} className="mb-8 flex flex-col md:flex-row items-start border rounded-lg p-4">
                <img src="https://via.placeholder.com/450x300" alt="" className="mb-2 md:mb-0 md:mr-4 w-full md:w-auto rounded-lg" />
                <div>
                    <p className="text-sm text-gray-600 mb-2">{post.date}</p>
                    <a href="#" className="block text-xl font-bold mb-2 truncate">
                        {post.title}
                    </a>
                    <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula dolor nec...</p>
                    <a href="#" className="text-teal-500 mt-2 inline-block">Read More</a>
                </div>
            </div>
        ))}
    </div>
);

const NewsPage = () => (
    <div className="container mx-auto p-4 flex flex-wrap">
        <Sidebar />
        <PostList />
    </div>
);

export default NewsPage;
