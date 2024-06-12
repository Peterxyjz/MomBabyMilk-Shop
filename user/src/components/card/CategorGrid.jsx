import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CategoryCard from './CategoryCard';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VrpanoIcon from '@mui/icons-material/Vrpano';

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

export default function CategoryGrid() {
    return (
        <div>
            <Typography variant="h5" component="div" align="center" sx={{ my: 4 }}>
                See More
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
                {categories.map((category, index) => (
                    <Grid item key={index}>
                        <CategoryCard icon={category.icon} title={category.title} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
