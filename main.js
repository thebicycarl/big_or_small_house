// main JS file to run the calculations

// declare the input variables
let loan_variables = {
    expensive_house_price: 750000,
    cheaper_house_price: 500000,
    deposit: 150000,
    contribution: 3500,
    contribution_frequency: 'monthly',
    interest_rate: 6
}

let today = new Date()

// function that takes the inputs, performs some initial calcs and calls a monthly or weekly calculation function
function payOffExpensive(obj) {
    let { expensive_house_price, cheaper_house_price, deposit, contribution, contribution_frequency, interest_rate } = obj
    let current_loan_value = expensive_house_price - deposit
    let daily_interest_rate = (interest_rate / 365 / 100)

    let calc_variables = {
        house_price: expensive_house_price,
        current_loan_value,
        contribution,
        daily_interest_rate
    }

    if (contribution_frequency === 'monthly') {
        return monthlyCalc(calc_variables)
    }

    if (contribution_frequency === 'weekly') {
        return weeklyCalc(calc_variables)

    }
}

// calculation for monthly contributions
function monthlyCalc(obj) {
    let { house_price, current_loan_value, contribution, daily_interest_rate } = obj
    frequency_in_days = 365 / 12
    let total_interest_cost = 0
    let daily_count = 0
    while (current_loan_value > contribution) {
        // calculate the interest cost for one day, based on the current loan value
        let daily_interest_cost = current_loan_value * daily_interest_rate 
               
        // calculate the total interest cost for the month
        let cost_between_contributions = daily_interest_cost * frequency_in_days  
         
        // add the average days for 1 month to the daily count
        daily_count += frequency_in_days                                            
        // add the cost for the month to the total interest cost
        total_interest_cost += cost_between_contributions                           
        // and to the current loan value
        current_loan_value += cost_between_contributions                            
        // then subtract the contribution for that month
        current_loan_value -= contribution                                          
    }
    let year_count = daily_count / 365
    let monthly_output = {
        house_price,
        total_interest_cost,
        daily_count,
        year_count
    }

    return monthly_output
}

function weeklyCalc(obj) {
    let { house_price, current_loan_value, contribution, daily_interest_rate } = obj
    let total_interest_cost = 0
    let thirty_day_interest = 0
    let daily_count = 0
    let daily_interest_cost = 0

    while (current_loan_value > 0) {
        daily_interest_cost = Math.ceil(current_loan_value * daily_interest_rate * 100) / 100
        total_interest_cost += daily_interest_cost
        thirty_day_interest += daily_interest_cost
        if (today.getDate() === 1) {
            current_loan_value += thirty_day_interest
            thirty_day_interest = 0
        }
        if (daily_count % 7 === 0) {
            current_loan_value -= contribution
        }

        daily_count++
        today.setDate(today.getDate() + 1);
    }

    let year_count = daily_count / 365

    return {
        house_price,
        total_interest_cost,
        daily_count,
        year_count
    }

}



// comparison function that takes the inputs and time to pay off an expensive loan, and returns:
// - time to pay off cumulative cheaper loans until expensive house price is reached as equity
function payOffCheaper(obj) {
    let { expensive_house_price, cheaper_house_price, deposit, contribution, contribution_frequency, interest_rate } = obj
    let current_loan_value = cheaper_house_price - deposit
    let daily_interest_rate = (interest_rate / 365 / 100)

    let calc_variables = {
        house_price: cheaper_house_price,
        current_loan_value,
        contribution,
        daily_interest_rate
    }

    if (contribution_frequency === 'monthly') {
        return monthlyCalc(calc_variables)
    }

    if (contribution_frequency === 'weekly') {
        return weeklyCalc(calc_variables)

    }
}

// - amount of equity gained using cheaper loans in the same amount of time as the expensive loan
// function comparison(cheaper_inputs, expensive_outputs) {
//     const { expensive_house_price, cheaper_house_price, deposit, contribution, contribution_frequency, interest_rate } = cheaper_inputs

// }


// call functions and log the results

console.log(payOffExpensive(loan_variables))
console.log(payOffCheaper(loan_variables))