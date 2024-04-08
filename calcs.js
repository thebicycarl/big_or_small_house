// main file to run the calculations

// declare the input variables
let loan_variables = {
    expensive_house_price: 750000,
    cheaper_house_price: 500000,
    deposit: 150000,
    contribution: 3500,
    contribution_frequency: 'monthly',
    interest_rate: 6
}
// run function performing basic calcs, including converting from weekly to monthly contributions and passing object to calculation functions as required
function runCalcs() {
    if (loan_variables.contribution_frequency === 'weekly') {
        loan_variables.contribution = loan_variables.contribution * 52 / 12
    }
    loan_variables.interest_rate = loan_variables.interest_rate / 365 / 100
    // console.log(loan_variables)
    calcExpensive(loan_variables)

    // let payoff_expensive = calcExpensive(loan_variables)
    // let payoff_cheaper = calcCheaper(loan_variables)
    // let comparison_output = calcCheaper(payoff_expensive, loan_variables)
}

// function to calculate the expensive house
function calcExpensive(loan_variables) {
    let current_loan_value = loan_variables.expensive_house_price - loan_variables.deposit
    console.log(current_loan_value)
}

// function to calculate the cheaper house

// function to perform the comparison (will be some duplication)

runCalcs()