import React, { useEffect, useState } from 'react'
import { fetchRevenue } from '../../data/api';
import { Bar } from 'react-chartjs-2';

const MonthlyProfit = () => {
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

            result[monthYear].profit = result[monthYear].revenue - result[monthYear].cost;
        });

        return Object.keys(result).map(monthYear => ({
            monthYear,
            profit: result[monthYear].profit,
        })).sort((a, b) => new Date(`01-${a.monthYear}`) - new Date(`01-${b.monthYear}`));
    };

    const processedData = processData(revenues);

    const chartData = {
        labels: processedData.map(item => item.monthYear),
        datasets: [
            {
                label: 'Lợi nhuận',
                data: processedData.map(item => item.profit),
                backgroundColor: 'white',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Ẩn chú thích (legend)
            },
        },
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false,
            },
        },
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Bar data={chartData} options={chartOptions} />
        </div>
    )
}

export default MonthlyProfit