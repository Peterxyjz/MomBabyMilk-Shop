import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Box } from '@mui/system';

export default function CategoryCard({ icon: Icon, title }) {
    return (
        <Card sx={{ width: 250, height: 250, m: 2, bgcolor: 'grey', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardActionArea sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                    <Icon sx={{ fontSize: 60, color: 'white' }} />
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
