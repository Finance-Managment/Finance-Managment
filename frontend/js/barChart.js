const getIncomes = async () => {
    const allIncomes = await fetch(
        `http://localhost:3000/api/incomes/${userID}/all`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }
    )

    const responseData = await allIncomes.json()
    // console.log("Response data:", responseData);

    const timestamp = new Date().toLocaleDateString('en-US', { month: 'long' })

    const incomeData = responseData.data
    if (!Array.isArray(incomeData)) {
        console.warn('Unexpected data format. Expected an array.')
        return { totalAmount: 0, timestamp }
    }

    let totalAmount = 0
    let monthsData = {}

    incomeData.forEach((income) => {
        const createdAt = new Date(income.createdAt)
        const amount = income.amount
        const month = createdAt.toLocaleDateString('en-US', { month: 'long' })

        totalAmount += amount

        if (monthsData[month]) {
            monthsData[month] += amount
        } else {
            monthsData[month] = amount
        }
    })

    return { totalAmount, monthsData, timestamp }
}

const getOutcomes = async () => {
    const allOutcomes = await fetch(
        `http://localhost:3000/api/outcomes/${userID}/all`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }
    )

    const responseData = await allOutcomes.json()
    // console.log("Response data:", responseData);

    const timestamp = new Date().toLocaleDateString('en-US', { month: 'long' })

    const outcomeData = responseData.data

    if (!Array.isArray(outcomeData)) {
        console.warn('Unexpected data format. Expected an array.')
        return { totalAmount: 0, timestamp }
    }

    let totalAmount = 0
    let monthsData = {}

    outcomeData.forEach((outcome) => {
        const createdAt = new Date(outcome.createdAt)
        const amount = outcome.amount
        const month = createdAt.toLocaleDateString('en-US', { month: 'long' })

        totalAmount += amount

        if (monthsData[month]) {
            monthsData[month] += amount
        } else {
            monthsData[month] = amount
        }
    })

    return { totalAmount, monthsData, timestamp }
}

const fetchDataAndUpdateChart = async () => {
    try {
        const [incomeData, outcomeData] = await Promise.all([
            getIncomes(),
            getOutcomes(),
        ])
        const months = Object.keys(incomeData.monthsData)

        const incomeAmounts = []
        const outcomeAmounts = []
        months.forEach((month) => {
            incomeAmounts.push(incomeData.monthsData[month] || 0)
            outcomeAmounts.push(outcomeData.monthsData[month] || 0)
        })

        myChart.data.labels = months
        myChart.data.datasets[0].data = incomeAmounts
        myChart.data.datasets[1].data = outcomeAmounts
        myChart.data.timestamp = incomeData.timestamp

        myChart.update()
    } catch (error) {
        console.error('Error fetching or updating data:', error)
    }
}

fetchDataAndUpdateChart()

const updateInterval = setInterval(fetchDataAndUpdateChart, 5000)

const ctx = document.getElementById('myChart').getContext('2d')
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Income',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Expense',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
})

