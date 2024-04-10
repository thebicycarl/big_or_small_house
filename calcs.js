// main file to run the calculations

// declare the input variables
let expensive_house_price = 750000
let cheaper_house_price = 500000
let deposit = 150000
let contribution = 3500
let contribution_frequency = 'monthly'
let interest_rate = 6
let daily_interest_rate = interest_rate / 365 / 100

// run function performing basic calcs, including converting from weekly to monthly contributions and passing object to calculation functions as required
function runCalcs() {
    if (contribution_frequency === 'weekly') {
        contribution = contribution * 52 / 12
    }

    let expensive_loan_value = expensive_house_price - deposit
    let cheaper_loan_value = cheaper_house_price - deposit

    let payoff_expensive = calculatePayoff(expensive_loan_value, contribution, daily_interest_rate)

    let payoff_cheaper = calculatePayoff(cheaper_loan_value, contribution, daily_interest_rate)

    console.log(payoff_expensive)
    console.log(payoff_cheaper)
    // let comparison_output = 
}

// function to calculate a single house
function calculatePayoff(loan_value, contribution, daily_interest_rate) {
    let start_value = loan_value
    let total_interest_cost = 0
    let daily_count = 0
    let average_days = 365 / 12
    while (loan_value > contribution) {
        // calculate the interest cost for one day, based on the current loan value
        let daily_interest_cost = loan_value * daily_interest_rate

        // calculate the toatal interest cost for the month
        let cost_between_contributions = daily_interest_cost * average_days

        // add the average days per month to the daily count
        daily_count += average_days

        //add the cost for the month to the total interest cost 
        total_interest_cost += cost_between_contributions

        // and to the current loan value
        loan_value += cost_between_contributions

        // then subtract the contribution for that month
        loan_value -= contribution
    }

    let year_count = daily_count / 365

    let payoff_outputs = {
        start_value,
        loan_value,
        total_interest_cost,
        daily_count,
        year_count
    }
    return payoff_outputs
}

// function to perform the comparison (will be some duplication)

runCalcs()