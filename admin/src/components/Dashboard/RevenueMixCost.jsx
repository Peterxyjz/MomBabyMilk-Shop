import React, { useEffect, useState } from 'react'
import { fetchRevenue } from '../../data/api';
import { Bar } from 'react-chartjs-2';

const RevenueMixCost = () => {
    const [revenues, setRevenues] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getRevenue = async () => {
            try {
                const data = await fetchRevenue();
                setRevenues(data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching revenue:", error);
                setLoading(false);
            }
        };

        getRevenue();
    }, []);

    const processData = (data) => {
        const result = {};

        data.forEach(item => {
            const date = new Date(item.completed_date);
            const month = date.getMonth() + 1; // getMonth() returns 0-11
            const year = date.getFullYear();
            const monthYear = `${month < 10 ? '0' : ''}${month}-${year}`;

            if (!result[monthYear]) {
                result[monthYear] = { revenue: 0, cost: 0, profit: 0 };
            }

            if (item.type === 1) { // Revenue
                result[monthYear].revenue += item.total;
            } else { // Cost
                result[monthYear].cost += item.total;
            }
        });

        return Object.keys(result).map(monthYear => ({
            monthYear,
            revenue: result[monthYear].revenue,
            cost: result[monthYear].cost,
        })).sort((a, b) => new Date(`01-${a.monthYear}`) - new Date(`01-${b.monthYear}`));
    };

    const processedData = processData(revenues);

    const chartData = {
        labels: processedData.map(item => item.monthYear),
        datasets: [
            {
                type: 'bar',
                label: 'Doanh thu',
                data: processedData.map(item => item.revenue),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                type: 'line',
                label: 'Vốn',
                data: processedData.map(item => item.cost),
                borderColor: 'rgba(153, 102, 255, 0.6)',
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                fill: false,
                tension: 0.1,
            },
        ],
    };
    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false,
            },
        },
    };
    return (
        <div>
            <Bar data={chartData} options={chartOptions} />

        </div>
    )
}

export default RevenueMixCost