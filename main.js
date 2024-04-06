// main JS file to run the calculations

// declare the input variables
let loan_variables = {
    expensive_house_price: 1000000,
    cheaper_house_price: 50000,
    deposit: 200000,
    contribution: 6000,
    contribution_frequency: 'monthly',
    interest_rate: 7
}

// function that takes the inputs and returns:
// - time to pay off loan
// - total interest cost
function payoffExpensive(obj) {
    let { expensive_house_price, cheaper_house_price, deposit, contribution, contribution_frequency, interest_rate } = obj
    let frequency_in_days = null
    let current_loan_value = expensive_house_price - deposit
    let daily_interest_rate = interest_rate / 365 / 100

    if (contribution_frequency === 'monthly') {
        frequency_in_days = 365 / 12
        return monthlyCalc(current_loan_value, contribution, frequency_in_days, daily_interest_rate)
    }
    if (contribution_frequency === 'fortnightly') {
        frequency_in_days = 14
    }
    if (contribution_frequency === 'weekly') {
        frequency_in_days = 7
    }
}

// calculation for monthly contributions
function monthlyCalc(current_loan_value, contribution, frequency_in_days, daily_interest_rate) {
    let total_interest_cost = 0
    let daily_count = 0
    while (current_loan_value > contribution) {
        let daily_interest_cost = current_loan_value * daily_interest_rate          // calculate the interest cost for one day, based on the current loan value
        let cost_between_contributions = daily_interest_cost * frequency_in_days    // calculate the total interest cost for the month
        daily_count += frequency_in_days                                            // add the average days for 1 month to the daily count
        total_interest_cost += cost_between_contributions                           // add the cost for the month to the total interest cost
        current_loan_value += cost_between_contributions                            // and to the current loan value
        current_loan_value -= contribution                                          // then subtract the contribution for that month
    }
    let year_count = daily_count / 365
    let monthly_output = {
        total_interest_cost,
        daily_count,
        year_count
    }

    return monthly_output

}



console.log(payoffExpensive(loan_variables))

// comparison function that takes the inputs and time to pay off an expensive loan, and returns:
// - time to pay off cumulative cheaper loans until expensive house price is reached as equity
// - amount of equity gained using cheaper loans in the same amount of time as the expensive loan

// call functions and log the results
