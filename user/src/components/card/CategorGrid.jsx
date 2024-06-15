import * as React from 'react';
import Typography from '@mui/material/Typography';
import CategoryCard from './CategoryCard';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VrpanoIcon from '@mui/icons-material/Vrpano';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Swiper.css'; // Đảm bảo bạn import file CSS mới vào đây

const categories = [
    { icon: SportsEsportsIcon, title: 'Sữa tươi' },
    { icon: SportsEsportsIcon, title: 'Sữa bột' },
    { icon: LocalOfferIcon, title: 'Sữa chua' },
    { icon: AddBoxIcon, title: 'Sữa pha sẵn' },
    { icon: FreeBreakfastIcon, title: 'Sữa hạt' },
    { icon: VideogameAssetIcon, title: 'Sữa cho mẹ' },
    { icon: SubscriptionsIcon, title: 'Sữa hộp' },
    { icon: VrpanoIcon, title: 'Sữa Tây' },
];

function NextArrow(props) {
    const { onClick } = props;
    return (
        <div className="slick-arrow slick-next" onClick={onClick}>
            <button className="slick-arrow-button">
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <div className="slick-arrow slick-prev" onClick={onClick}>
            <button className="slick-arrow-button">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        </div>
    );
}

export default function CategoryGrid() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Hiển thị 4 sản phẩm cùng lúc
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <div>
            <Typography variant="h5" component="div" align="center" sx={{ my: 4 }}>
                See More
            </Typography>
            <Slider {...settings}>
                {categories.map((category, index) => (
                    <div key={index}>
                        <CategoryCard icon={category.icon} title={category.title} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
