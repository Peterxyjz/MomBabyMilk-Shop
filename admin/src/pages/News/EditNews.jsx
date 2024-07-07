import React, { useEffect, useState, useRef } from "react";
import {
    Button,
    FileInput,
    Label,
    TextInput,
    Textarea,
} from "flowbite-react";
import { imageDb } from "../../data/firebase.config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
    fetchAllUsers,
    fetchNewsByID,
    fetchProducts,
    fetchUpdateNews,
    fetchUpdateProduct,
    fetchUploadFeedback,
    fetchUploadNews,
    fetchUploadProduct,
} from "../../data/api";
import { Col, Input, notification, Row, Select, Upload } from "antd";
import { Card } from 'primereact/card'

import { useLocation, useNavigate } from 'react-router-dom';

import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
    InlineEditor,
    AccessibilityHelp,
    Autosave,
    Bold,
    Code,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    Highlight,
    Italic,
    Paragraph,
    RemoveFormat,
    SelectAll,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Subscript,
    Superscript,
    Underline,
    Undo,
} from "ckeditor5";

import "./ckeditor.css";
import { PlusOutlined } from '@ant-design/icons';
import { HStack } from '@chakra-ui/react';


const EditNews = () => {
    const [news_name, setNews_name] = useState("");

    const [products, setProducts] = useState([]);

    const [description, setDescription] = useState("");

    const [selectedProductId, setSelectedProductId] = useState("");

    const [img, setImg] = useState(null);
    const [imgUrl, setImgUrl] = useState([]);
    const [fileList, setFileList] = useState([]);

    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [dayCreated, setDayCreated] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id").toString();
    console.log("id: ", id);
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const { Option } = Select;


    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setDescription(data);
    };

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    const editorConfig = {
        toolbar: {
            items: [
                "undo",
                "redo",
                "|",
                "selectAll",
                "|",
                "fontSize",
                "fontFamily",
                "fontColor",
                "fontBackgroundColor",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "subscript",
                "superscript",
                "code",
                "removeFormat",
                "|",
                "specialCharacters",
                "highlight",
                "|",
                "accessibilityHelp",
            ],
            shouldNotGroupWhenFull: false,
        },
        plugins: [
            AccessibilityHelp,
            Autosave,
            Bold,
            Code,
            Essentials,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            Highlight,
            Italic,
            Paragraph,
            RemoveFormat,
            SelectAll,
            SpecialCharacters,
            SpecialCharactersArrows,
            SpecialCharactersCurrency,
            SpecialCharactersEssentials,
            SpecialCharactersLatin,
            SpecialCharactersMathematical,
            SpecialCharactersText,
            Strikethrough,
            Subscript,
            Superscript,
            Underline,
            Undo,
        ],
        fontFamily: {
            supportAllValues: true,
        },
        fontSize: {
            options: [10, 12, 14, "default", 18, 20, 22],
            supportAllValues: true,
        },
        placeholder: "Type or paste your content here!",
    };

    const token = JSON.parse(localStorage.getItem("result"));

    useEffect(() => {
        // Gọi API để lấy dữ liệu category
        fetchProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.log(error);
            });

        // Gọi API để lấy dữ liệu brand

        listAll(ref(imageDb, "files")).then((imgs) => {
            imgs.items.forEach((val) => {
                getDownloadURL(val).then((url) => {
                    setImgUrl(url);
                });
            });
        });
    }, []);

    const handleChangeSelectedProduct = (event) => {
        const selectedProductId = event.target.value;

        setSelectedProductId(selectedProductId);
        console.log(selectedProductId);
    };

    const handleChangeNewsName = (event) => {
        setNews_name(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };


    // useEffect(() => {
    //     fetchUpdateNews(id)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log("data:", data);
    //             if (data && data.result) {
    //                 console.log("result:", data.result);
    //                   set(data.result._id);
    //                   setProduct_name(data.result.product_name);
    //                   setAge(data.result.age);
    //                   setPrice(data.result.price);
    //                   setDiscount(data.result.discount);
    //                   setDescription(data.result.description);
    //                   setSelectedCategoryId(data.result.category_id);
    //                   setSelectedBrandId(data.result.brand_id);
    //                   setImgUrl(data.result.imgUrl);
    //                   setIsActive(data.result.isActive);
    //             }
    //         })
    //         .catch((error) => console.error("Error fetching brands:", error));
    // }, []);

    useEffect(() => {
        const getNews = async () => {
            try {
                const response = await fetchNewsByID(id);
                console.log("API response for news:", response.data.result);
                const newsData = response.data.result;
                setNews(newsData);

                if (newsData.img_url) {
                    setFileList([
                        {
                            uid: '-1',
                            name: 'image.png',
                            status: 'done',
                            url: newsData.img_url,
                        },
                    ]);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        getNews();
    }, [id]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchAllUsers(token);
                console.log("API response for users:", response.data.users);
                setUsers(response.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [token]);

    useEffect(() => {
        if (users.length > 0 && news) {
            const staff = users.find(user => user._id === news.staff_id);
            if (staff) {
                setNews(prevNews => ({
                    ...prevNews,
                    staff,
                }));
            } else {
                console.warn("No staff found for news:", news);
            }
        }

        setNews_name(news.news_name);
        setDescription(news.description);
        setDayCreated(news.created_at);
        setSelectedProductId(news.product_id);
        setUsername(news.staff.username);
    }, [news, users]);

    console.log("news:", news);
    console.log("name:", news_name);
    console.log("description:", description);
    console.log("dayCreated:", dayCreated);
    console.log("selectedProductId:", selectedProductId);
    console.log("username:", username);

    async function uploadImage(news, id) {
        if (img !== null) {
            const imgRef = ref(imageDb, `news_img/${v4()}`);
            const snapshot = await uploadBytes(imgRef, img);
            const url = await getDownloadURL(snapshot.ref);

            news.img_url = url;
            console.log("news: ", news);
            await sendURL(news, id);
        } else {
            console.log("null");
        }
    }
    const sendURL = async (news, id) => {
        return await fetchUpdateNews(news, token, id);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const news = {
            product_id: selectedProductId,
            news_name,
            description,
        };
        console.log(news);
        // send data to db:
        await fetchUploadNews(news, token)
            .then(async (res) => {
                console.log(res.data);
                const id = res.data.result.insertedId
                await uploadImage(news, id);

            })
            .then((data) => {
                notification.success({
                    message: "Thêm bài viết thành công!",
                    placement: "top",
                })
                form.reset();
                setDescription("");
            })
            .catch((error) => {
                console.log(error.response);
            });
    };


    const handleChange = ({ fileList: newFileList }) => {
        // Only keep the latest file in the list
        setFileList(newFileList.slice(-1));
        if (newFileList.length > 0) {
            setImg(newFileList[0].originFileObj);
        } else {
            setImg(null);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
            <div>
                <link
                    rel="stylesheet"
                    href="https://cdn.ckeditor.com/ckeditor5/42.0.0/ckeditor5.css"
                />
                {/* If you are using premium features: */}
                <link
                    rel="stylesheet"
                    href="https://cdn.ckeditor.com/ckeditor5-premium-features/42.0.0/ckeditor5-premium-features.css"
                />
            </div>

            <Card
                title={<h2 className="text-2xl font-bold">Thêm bài viết</h2>}
                style={{ width: '90%', maxWidth: '70wh', margin: '30px auto', minHeight: '70vh' }}
            >
                <form onSubmit={handleSubmit}>
                    <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
                        <Col span={4}>
                            <label htmlFor="img" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Hình ảnh</label>
                        </Col>
                        <Col span={18}>
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleChange}
                                beforeUpload={() => false}
                            >
                                {fileList.length < 1 && (
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Tải hình ảnh</div>
                                    </div>
                                )}
                            </Upload>
                        </Col>
                    </Row>

                    <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
                        <Col span={4}>
                            <label htmlFor="img" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Tiêu đề</label>
                        </Col>
                        <Col span={18}>
                            <TextInput
                                id="news_name"
                                type="text"
                                value={news_name}
                                name="news_name"
                                placeholder="Nhập tiêu đề"
                                style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                                onChange={handleChangeNewsName}
                                required
                            />
                        </Col>
                    </Row>

                    <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
                        <Col span={4}>
                            <label htmlFor="img" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Ngày tạo</label>
                        </Col>
                        <Col span={18}>
                            <Input
                                readOnly
                                // value={formatDate(news.created_at)}
                                className="w-full"
                                style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                            />
                        </Col>
                    </Row>

                    <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
                        <Col span={4}>
                            <label htmlFor="img" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Người tạo</label>
                        </Col>
                        <Col span={18}>
                            <Input
                                readOnly
                                // value={news.staff.username}
                                className="w-full"
                                style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                            />
                        </Col>
                    </Row>

                    <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
                        <Col span={4}>
                            <label htmlFor="product" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Sản phẩm</label>
                        </Col>
                        <Col span={18}>
                            <Select
                                id="product"
                                className="w-full"
                                // value={news.product._id}
                                onChange={handleChangeSelectedProduct}
                                style={{ height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                                required
                            >
                                <option value="" disabled selected>
                                    Chọn sản phẩm
                                </option>
                                {products.map((option) => (
                                    <Option key={option._id} value={option._id}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={option.imgUrl}
                                                style={{ width: 20, height: 20, marginRight: 10 }}
                                                alt={option.product_name}
                                            />
                                            {option.product_name}
                                        </div>
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>

                    <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
                        <Col span={4}>
                            <label htmlFor="" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Nội dung bài viết</label>
                        </Col>
                        <Col span={18}>
                            <div>
                                <div className="main-container">
                                    <div
                                        className="editor-container editor-container_inline-editor"
                                        ref={editorContainerRef}
                                    >
                                        <div className="editor-container__editor">
                                            <div ref={editorRef}>
                                                {isLayoutReady && (
                                                    <CKEditor
                                                        data={description}
                                                        onChange={handleEditorChange}
                                                        editor={InlineEditor}
                                                        config={editorConfig}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        {/* <div dangerouslySetInnerHTML={{ __html: description }} />  */}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row justify="center" align="middle">
                        <HStack spacing={10}>
                            <Button
                                type="default"
                                onClick={() => navigate("/all-blog")}
                                style={{
                                    borderColor: "#55B6C3",
                                    color: "#55B6C3",
                                    fontSize: "10px",
                                    backgroundColor: "white",
                                }}
                            >
                                Quay về trang danh sách
                            </Button>
                            <Button
                                type="default"
                                htmlType="submit"
                                style={{
                                    backgroundColor: "#55B6C3",
                                    fontSize: "10px",
                                }}
                            >
                                Lưu
                            </Button>
                        </HStack>
                    </Row>
                </form>
            </Card>
        </div>
    )
}

export default EditNews