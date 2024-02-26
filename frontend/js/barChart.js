const getIncomes = async () => {
    const allIncomes = await fetch(`/api/incomes/${userID}/all`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    })

    const responseData = await allIncomes.json()
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
    const allOutcomes = await fetch(`/api/outcomes/${userID}/all`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    })

    const responseData = await allOutcomes.json()
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

const getNetSavings = async () => {
    const [incomeData, outcomeData] = await Promise.all([
        getIncomes(),
        getOutcomes(),
    ])

    const months = Object.keys(incomeData.monthsData)
    const netSavings = []

    months.forEach((month) => {
        const income = incomeData.monthsData[month] || 0
        const outcome = outcomeData.monthsData[month] || 0
        const savings = income - outcome
        netSavings.push(savings)
    })

    return netSavings
}

const fetchDataAndUpdateChart = async () => {
    try {
        const [incomeData, outcomeData, netSavings] = await Promise.all([
            getIncomes(),
            getOutcomes(),
            getNetSavings(),
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
        myChart.data.datasets[2].data = netSavings // Update net savings data
        myChart.data.timestamp = incomeData.timestamp

        myChart.update()
    } catch (error) {
        console.error('Error fetching or updating data:', error)
    }
}

// Update the chart with data every 1 seconds
const updateInterval = setInterval(fetchDataAndUpdateChart, 1000)

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
            {
                label: 'Net Savings',
                data: [],
                backgroundColor: 'rgba(255, 159, 64, 0.2)', // Orange color
                borderColor: 'rgba(255, 159, 64, 1)', // Orange color
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

fetchDataAndUpdateChart() // Fetch and update chart initially
