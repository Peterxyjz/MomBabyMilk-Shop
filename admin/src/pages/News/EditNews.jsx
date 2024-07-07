import React, { useEffect, useState, useRef } from "react";
import { Button, FileInput, Label, TextInput, Textarea } from "flowbite-react";
import { imageDb } from "../../data/firebase.config";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import {
  fetchAllUsers,
  fetchNewsByID,
  fetchProducts,
  fetchUpdateNews,
  fetchUploadNews,
} from "../../data/api";
import { Col, Input, notification, Row, Select, Upload } from "antd";
import { Card } from "primereact/card";

import { useLocation, useNavigate } from "react-router-dom";

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
import { PlusOutlined } from "@ant-design/icons";
import { HStack } from "@chakra-ui/react";

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
  const [username, setUsername] = useState("");
  const [user_id, setUser_id] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [dayCreated, setDayCreated] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = location.state?.id;
  const [news, setNews] = useState(null);
  const [imgUrlOld, setImgUrlOld] = useState([]);
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
    initData: description,
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

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await fetchNewsByID(id);
        const newsData = response.data.result;
        setNews(newsData);
        setImgUrlOld(newsData.img_url);
        if (newsData.img_url) {
          setFileList([
            {
              uid: "-1",
              name: "image.png",
              status: "done",
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
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  useEffect(() => {
    if (users.length > 0 && news) {
      const staff = users.find((user) => user._id === news.staff_id);
      if (staff) {
        setUsername(staff.username);
        setUser_id(staff._id);
      } else {
        console.warn("No staff found for news:", news);
      }
    }

    setNews_name(news?.news_name);
    setDescription(news?.description);
    setDayCreated(news?.created_at);
    setSelectedProductId(news?.product_id);
  }, [news, users]);

  async function uploadImage(news, id) {
    
    console.log("img: ",img !== null);
    if (fileList[0] !== null) {
      const imgRef = ref(imageDb, `news_img/${v4()}`);
      const imgRefOld = ref(imageDb, news.img_url);
      deleteObject(imgRefOld);
      const snapshot = await uploadBytes(imgRef, img);
      const url = await getDownloadURL(snapshot.ref);

      news.img_url = url;
      await sendURL(news, id);
    }
  }

  const sendURL = async (news, id) => {
    return await fetchUpdateNews(news, token, id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const news = {
      news_name,
      staff_id: user_id,
      product_id: selectedProductId,
      description,
      img_url: imgUrlOld,
    };
    console.log(news);
    await fetchUpdateNews(news, token, id)
      .then(async (res) => {
        console.log("xong update");
        await uploadImage(news, id).then(() => {
          notification.success({
            message: "Thêm bài viết thành công!",
            placement: "top",
          });
          form.reset();
          setDescription("");
        });
      })
      .catch((error) => {
        console.error("Error updating news:", error);
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
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
    >
      <div>
        <link
          rel="stylesheet"
          href="https://cdn.ckeditor.com/ckeditor5/42.0.0/ckeditor5.css"
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          style={{ width: "100%", marginTop: "20px", borderRadius: "20px" }}
        >
          <h1
            style={{
              fontSize: "30px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#1F5070",
              marginBottom: "50px",
            }}
          >
            Chỉnh sửa bài viết
          </h1>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="news_name"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Tên bài viết
              </label>
            </Col>
            <Col span={18}>
              <Input
                value={news_name}
                onChange={handleChangeNewsName}
                className="w-full"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
              />
            </Col>
          </Row>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="product_id"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Tên sản phẩm
              </label>
            </Col>
            <Col span={18}>
              <Select
                value={selectedProductId}
                onChange={handleChangeSelectedProduct}
                className="w-full"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
              >
                {products.map((product) => (
                  <Option key={product._id} value={product._id}>
                    {product.product_name}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="description"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Mô tả
              </label>
            </Col>
            <Col span={18}>
              {isLayoutReady && (
                <CKEditor
                  editor={InlineEditor}
                  data={description}
                  config={editorConfig}
                  onChange={handleEditorChange}
                />
              )}
            </Col>
          </Row>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="image"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Hình ảnh
              </label>
            </Col>
            <Col span={18}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={() => false}
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Col>
          </Row>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="created_at"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Ngày tạo
              </label>
            </Col>
            <Col span={18}>
              <Input
                readOnly
                value={formatDate(dayCreated)}
                className="w-full"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
              />
            </Col>
          </Row>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="staff"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Người tạo
              </label>
            </Col>
            <Col span={18}>
              <Input
                readOnly
                value={username}
                className="w-full"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
              />
            </Col>
          </Row>

          <HStack spacing="10px" justifyContent="center">
            <Button
              type="submit"
              style={{
                width: "150px",
                backgroundColor: "#1F5070",
                borderRadius: "0.375rem",
              }}
            >
              Lưu
            </Button>
            <Button
              color="gray"
              onClick={() => navigate("/news", { replace: true })}
              style={{ width: "150px", borderRadius: "0.375rem" }}
            >
              Hủy
            </Button>
          </HStack>
        </form>
      </div>
    </div>
  );
};

export default EditNews;
