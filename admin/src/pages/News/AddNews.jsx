import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { imageDb } from "../../data/firebase.config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  fetchProducts,
  fetchUpdateNews,
  fetchUpdateProduct,
  fetchUploadFeedback,
  fetchUploadNews,
  fetchUploadProduct,
} from "../../data/api";
import { notification } from "antd";

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

const AddNews = () => {
  const [news_name, setNews_name] = useState("");

  const [products, setProducts] = useState([]);

  const [description, setDescription] = useState("");

  const [selectedProductId, setSelectedProductId] = useState("");

  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);

  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

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
        console.log(data);
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
  };

  const handleChangeNewsName = (event) => {
    setNews_name(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

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
        await uploadImage(news,id);
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

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl h-screen w-full">
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
      <h2 className="mb-8 text-3xl font-bold">Thêm Bài Viết</h2>
      <form
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
        onSubmit={handleSubmit}
      >
        {/* img: */}
        <div className="flex gap-8">
          <Label htmlFor="file-upload" value="Chọn ảnh bài viết" />
        </div>
        <FileInput
          id="file-upload"
          required
          onChange={(event) => setImg(event.target.files[0])}
        />
        {/* row1 */}
        <div className="flex gap-8">
          {/* product_name */}
          <div className="lg:w-3/5">
            <div className="mb-2 block">
              <Label htmlFor="product_name" value="Tên Bài Viết" />
            </div>
            <TextInput
              id="news_name"
              type="text"
              name="news_name"
              placeholder="Tên Bài Viết..."
              onChange={handleChangeNewsName}
              required
            />
          </div>
        </div>

        {/* row2 */}
        <div className="flex gap-8">
          {/* category */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="product" value="Chọn Sản Phẩm" />
            </div>

            <Select
              id="product"
              className="w-full rounded"
              onChange={handleChangeSelectedProduct}
              required
            >
              <option value="" disabled selected>
                Chọn Tên Sản Phẩm
              </option>
              {products.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.product_name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* row3 */}
        <div className="flex gap-8"></div>

        {/* row4 */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Mô Tả Bài Viết" />
          </div>
          {/* description  */}
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
                {/* <div dangerouslySetInnerHTML={{ __html: description }} /> Dung de render*/} 
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" className="mt-5">
          Lưu Bài Viết
        </Button>
      </form>
    </div>
  );
};

export default AddNews;
