import React, { useState } from 'react'
import { Header } from '../components'
import { Button, FormControl, InputLabel, TextField, styled } from '@mui/material';
import { MenuItem, Select } from '@mui/material';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { EditorData } from '../data/dummy';
import { IoIosCloudUpload } from 'react-icons/io';

const AddProduct = () => {

    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [category, setCategory] = useState('');

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Create a product object with the form data
    //     const newProduct = {
    //         productName,
    //         productBrand,
    //         category,
    //     };
    //     // Pass the new product data to the onSubmit function
    //     onSubmit(newProduct);
    //     // Reset the form fields after submission
    //     setProductName('');
    //     setProductBrand('');
    //     setCategory('');
    // };



    const handleChangeBrand = (event) => {
        setProductBrand(event.target.value);
    };

    const handleChangeCat = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="Add product" />
            <div className="mt-6 flex flex-col items-center">
                <div className="mb-6 w-full max-w-xl">
                    <TextField
                        required
                        id="outlined-required"
                        label="Tên sản phẩm"
                        defaultValue=""
                        className="w-full"
                        style={{ marginBottom: '30px' }}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Hãng</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productBrand}
                            label="brand"
                            onChange={handleChangeBrand}
                            className="w-full"
                            style={{ marginBottom: '30px' }}

                        >
                            <MenuItem value={'bimbosan'}>Bimbosan</MenuItem>
                            <MenuItem value={'TH'}>TH</MenuItem>
                            <MenuItem value={'nestle'}>Nestle</MenuItem>
                            <MenuItem value={'nutifood'}>Nutifood</MenuItem>

                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="category">Phân loại</InputLabel>
                        <Select
                            labelId="category"
                            id="demo-simple-select"
                            value={category}
                            label="Phân loại"
                            onChange={handleChangeCat}
                            className="w-full"
                            style={{ marginBottom: '30px' }}

                        >
                            <MenuItem value={'suabot'}>Sữa bột</MenuItem>
                            <MenuItem value={'suaphasan'}>Sữa pha sẵn</MenuItem>
                            <MenuItem value={'suachomebau'}>Sữa cho mẹ bầu</MenuItem>
                            <MenuItem value={'suatuoi'}>Sữa tươi</MenuItem>

                        </Select>
                    </FormControl>

                    <TextField
                        required
                        id="outlined-required"
                        label="Đơn giá"
                        defaultValue=""
                        type='number'
                        className="w-full"
                        style={{ marginBottom: '30px' }}
                    />

                    <TextField

                        id="outlined-required"
                        label="Giảm giá(%)"
                        defaultValue=""
                        InputProps={{
                            inputProps: {
                                min: 0,
                                max: 100,
                            },
                        }}
                        type='number'
                        helperText="Nhập từ 0-100"
                        className="w-full"
                        style={{ marginBottom: '30px' }}
                    />

                    <RichTextEditorComponent style={{ marginBottom: '30px' }}>
                        <h4>Nhập mô tả sản phẩm</h4>
                        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />

                    </RichTextEditorComponent>


                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<IoIosCloudUpload />}
                        style={{ marginBottom: '30px' }}

                    >
                        Up hình ảnh sản phẩm
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </div>

                <div className="flex justify-end mb-4">
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Lưu sản phẩm
                    </Button>
                </div>

            </div>


        </div>
    );
}

export default AddProduct