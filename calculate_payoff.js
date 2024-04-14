// test variables:
// let loan_value = 500000
// let contribution = 3500
// let monthly_interest_rate = 6 / 12 / 100
// let payoff_to = 0

// main function to perform a loan payoff calculation 
export function calculatePayoff(loan_value, contribution, monthly_interest_rate, payoff_to) {

    let remaining_balance = loan_value
    let total_interest_cost = 0
    let months = 0
    while (remaining_balance > payoff_to) {
        // calculate the interest cost the month, based on the current loan value
        let monthly_interest_cost = remaining_balance * monthly_interest_rate
        
        // add monthly interest to the total
        total_interest_cost += monthly_interest_cost

        // subtract the monthly interest cost from the contribution 
        let principle_repayment = Math.min(contribution, remaining_balance + monthly_interest_cost) - monthly_interest_cost

        // and subtract from the loan value
        remaining_balance -= principle_repayment

        // increment month counter
        months ++
    }

    let year_count = Math.floor(months / 12)
    let and_months = months % 12

    let payoff_outputs = {
        loan_start_value: loan_value,
        loan_end_value: remaining_balance,
        total_interest_cost,
        months,
        year_count,
        and_months
    }
    return payoff_outputs
}

// test log:
// console.log(calculatePayoff(loan_value, contribution, monthly_interest_rate, payoff_to))