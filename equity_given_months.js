// test variables:
// const months_remainder = 208
// let loan_value = 500000
// const contribution = 3500
// const monthly_interest_rate = 6/12/100

export function equityGivenMonths(months_remainder, loan_value, contribution, monthly_interest_rate) {
    let equity = 0
    let remaining_balance = loan_value
    let total_interest_cost = 0
    let months = 0
    while (months < months_remainder) {
        // calculate the interest cost the month, based on the current loan value
        let monthly_interest_cost = remaining_balance * monthly_interest_rate
        
        // add monthly interest to the total
        total_interest_cost += monthly_interest_cost

        // subtract the monthly interest cost from the contribution 
        let principle_repayment = Math.min(contribution, remaining_balance + monthly_interest_cost) - monthly_interest_cost

        // and subtract from the loan value
        remaining_balance -= principle_repayment

        // and add to the equity counter
        equity += principle_repayment

        // increment month counter
        months ++        
    }

    return {
        equity,
        total_interest_cost
    }

}

// test console log
// console.log(equityGivenMonths(months_remainder, loan_value, contribution, monthly_interest_rate))