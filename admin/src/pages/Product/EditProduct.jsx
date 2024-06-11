import React, { useEffect, useState } from "react";
import {
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
  Alert,
  Textarea,
} from "flowbite-react";
import { imageDb } from "../../data/firebase.config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { useLocation } from "react-router-dom";
const EditProduct = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id").toString();
  console.log("id: ", id);
  const [product_id, setProduct_id] = useState({});
  const [product_name, setProduct_name] = useState("123");
  const [age, setAge] = useState("123");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("123");
  const [product_img_url, setProduct_img_url] = useState("");

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);

  const token = JSON.parse(localStorage.getItem("result"));

  useEffect(() => {
    // Gọi API để lấy dữ liệu category
    fetch("http://localhost:4000/categories/all-categories")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result) {
          setCategories(data.result);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Gọi API để lấy dữ liệu brand
    fetch("http://localhost:4000/brands/all-brands")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result) {
          setBrands(data.result);
        }
      })
      .catch((error) => console.error("Error fetching brands:", error));

    fetch(`http://localhost:4000/products/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result) {
          console.log("result", data.result);
          setProduct_id(data.result._id);
          setProduct_name(data.result.product_name);
          setAge(data.result.age);
          setPrice(data.result.price);
          setDiscount(data.result.discount);
          setDescription(data.result.description);
          setSelectedCategoryId(data.result.category_id);
          setSelectedBrandId(data.result.brand_id);
          setProduct_img_url(data.result.imgUrl);
        }
      })
      .catch((error) => console.error("Error fetching brands:", error));

    listAll(ref(imageDb, "files")).then((imgs) => {
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl(url);
        });
      });
    });
  }, []);
 
  const handleChangeSelectedCategory = (event) => {
    const selectedCategoryName = event.target.value;
    const selectedCategory = categories.find(
      (category) => category.category_name === selectedCategoryName
    );
    if (selectedCategory) {
      setSelectedCategoryId(selectedCategory._id);
    }
  };

  const handleChangeSelectedBrand = (event) => {
    console.log(event.target.value);
    const selectedBrandName = event.target.value;
    const selectedBrand = brands.find(
      (brand) => brand.brand_name === selectedBrandName
    );
    if (selectedBrand) {
      setSelectedBrandId(selectedBrand._id);
    }
  };

  const handleChangeProductName = (event) => {
    setProduct_name(event.target.value);
  };
  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleChangeDiscount = (event) => {
    setDiscount(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  async function uploadImage(id) {
    if (img !== null) {
      const imgRef = ref(imageDb, `product_img/${v4()}`);
      const snapshot = await uploadBytes(imgRef, img);
      const url = await getDownloadURL(snapshot.ref);

      await sendURL(id, url);
    } 
  }
  const sendURL = async (id, url) => {
    return await axios.post(
      "http://localhost:4000/products/update",
      { id, url },
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );
  };
  // const handleSaveImg = (url) => {

  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const product = {
      brand_id: selectedBrandId,
      category_id: selectedCategoryId,
      product_name,
      price: Number(price),
      description,
      age,
      discount,

    };
    console.log(product);
    console.log(JSON.stringify({ ...product }));
    // send data to db:
    await axios
      .post(
        "http://localhost:4000/products/update",
        { product, id: id, url: product_img_url },
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      )
      .then(async (res) => {
       

       
          await uploadImage(id);
       
      })
      .then((data) => {
        <Alert color="success" onDismiss={() => alert("Alert dismissed!")}>
          Chỉnh sửa thông tin <span className="font-medium"> Thành Công!</span>
        </Alert>;
        console.log("xong");
        form.reset();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="px-20 my-12 w-full">
      <h2 className="mb-8 text-3xl font-bold">Cập nhật sản phẩm</h2>
      <form
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
        onSubmit={handleSubmit}
      >
     

        <div className="lg:w-1/5">
          {product_img_url && (
            <img
              className="h-auto max-w-full"
              src={product_img_url}
              alt="image description"
            />
          )}
        </div>
        <div className="flex gap-8">
          <Label htmlFor="file-upload" value="Chọn ảnh sản phẩm" />
        </div>
        <div>
          <FileInput
            id="file-upload"
            onChange={(event) => {
              setImg(event.target.files[0]);
              setProduct_img_url("");
            }}
          />
        </div>
        {/* row1 */}
        <div className="flex gap-8">
          {/* product_name */}
          <div className="lg:w-3/5">
            <div className="mb-2 block">
              <Label htmlFor="product_name" value="Tên Sản Phẩm" />
            </div>
            <div></div>
            <TextInput
              id="product_name"
              type="text"
              name="product_name"
              placeholder="Tên Sản Phẩm..."
              value={product_name}
              onChange={handleChangeProductName}
              required
            />
          </div>
          {/* age */}
          <div className="lg:w-2/5">
            <div className="mb-2 block">
              <Label htmlFor="age" value="Độ Tuổi Sử Dụng" />
            </div>
            <TextInput
              id="age"
              type="text"
              name="age"
              placeholder="Độ Tuổi Sử Dụng"
              value={age}
              onChange={handleChangeAge}
              required
            />
          </div>
        </div>

        {/* row2 */}
        <div className="flex gap-8">
          {/* category */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="category" value="Loại Sản Phẩm" />
            </div>

            <Select
              id="category"
              className="w-full rounded"
              onChange={handleChangeSelectedCategory}
              required
            >
              <option value="" disabled selected>
                Chọn Loại Sản Phẩm
              </option>
              {categories.map((option) => (
                <option
                  key={option._id}
                  value={option.category_name}
                  selected={selectedCategoryId === option._id}
                >
                  {option.category_name}
                </option>
              ))}
            </Select>
          </div>

          {/* Brand */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="brand" value="Thương Hiệu Sản Phẩm" />
            </div>

            <Select
              id="brand"
              className="w-full rounded"
              onChange={handleChangeSelectedBrand}
              required
            >
              <option value="" disabled selected>
                Chọn Loại Thương Hiệu
              </option>
              {brands.map((option) => (
                <option
                  key={option._id}
                  value={option.brand_name}
                  selected={selectedBrandId === option._id}
                >
                  {option.brand_name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* row3 */}
        <div className="flex gap-8">
          {/* price */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="price" value="Giá Sản Phẩm" />
            </div>
            <TextInput
              id="price"
              type="number"
              name="price"
              placeholder="Giá Sản Phẩm..."
              value={price}
              min={0}
              onChange={handleChangePrice}
              required
            />
          </div>
          {/* discount */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="discount" value="Discount" />
            </div>
            <TextInput
              id="discount"
              type="number"
              min={0}
              max={100}
              name="discount"
              placeholder="Mức giảm giá..."
              value={discount}
              defaultValue={0}
              onChange={handleChangeDiscount}
              required
            />
          </div>
        </div>

        {/* row4 */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Mô Tả Sản Phẩm" />
          </div>
          <Textarea
            id="description"
            name="description"
            placeholder="Mô Tả Sản Phẩm..."
            value={description}
            required
            className="w-full"
            onChange={handleChangeDescription}
            rows={6}
          />
        </div>

        <Button type="submit" className="mt-5">
          Lưu sản phẩm 
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;
