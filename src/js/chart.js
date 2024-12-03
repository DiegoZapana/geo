const historial = SHOP_HISTORY.getFullHistory();  // Obtener historial del localStorage

function prepareChartData(historial) {
    const daily = { labels: [], sales: [] };

    historial.forEach(entry => {
        const entryDate = new Date(entry.time);
        const formattedDate = entryDate.toLocaleDateString();
        const { items } = entry.data;

        if (!daily.labels.includes(formattedDate)) {
            daily.labels.push(formattedDate);
            daily.sales.push(items.reduce((sum, item) => sum + item.count, 0));
        } else {
            const index = daily.labels.indexOf(formattedDate);
            daily.sales[index] += items.reduce((sum, item) => sum + item.count, 0);
        }
    });

    return { daily };
}

const data = prepareChartData(historial);

const colors = {
    sales: 'rgba(75, 192, 192, 0.2)',
    salesBorder: 'rgba(75, 192, 192, 1)',
};

const initChart = (id, labelData, salesData) => {
    const ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelData,
            datasets: [
                {
                    label: 'Ventas realizadas',
                    data: salesData,
                    backgroundColor: colors.sales,
                    borderColor: colors.salesBorder,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
};

initChart('dailyChart', data.daily.labels, data.daily.sales);
