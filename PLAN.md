# House comparison
Site to show the financial difference between buying an expensive house or several cheaper houses.

When buying a house, if you buy an expensive house, most of your contributions to the loan is eaten up by the interest portion. If instead you buy cheaper houses one after the other, you will gain equity much faster.

Also displays some current interest rate examples from a comparison site. 

## Architecture
Simple front-end website

Need some way of displaying a graph/s

.js file to hold the calculations

Reverse compound interest calculator


## Calculations
Interest is calculated on the daily balance, and charged monthly
### Inputs: 
- deposit
- contribution amount
- contribution frequency? initially just do calcs for monthly. include conversion from weekly to monthly payments, but note on the page that the comparison is done based on a monthly repayment.
- interest rate 
- house price 

### Outputs: 
- graph of equity over time, with both house options
and/or
- graphs of loan value over time
- time to pay off expensive loan
- time to pay off cumulative cheaper loans until the same equity is reached
- amount of equity gained using cheaper loans in the same amount of time as the expensive loan

## Roadmap
- ~~plan architecture~~
- make calculations in .js
    - ~~basic calculations on the inputs~~
    - ~~calculation for loan payoff~~
    - ~~comparison calcs~~
    - ~~need to re-work to have the cheaper loan payoff amounts the total house price, for every time after the first~~
    - ~~and add the deposit amount to the expensive house equity~~
    - ~~where sensible, separate calculations into their own module js file~~
- build html page to take the inputs, and display outputs
- style page and make usable without graphs
- add in error handling for loan terms that never pay off
- deploy to live
- ~~star to github~~
- add to portfolio page
- upgrade the page to use graphs with D3.js
- build web scraper to display interest rate options from main banks
- post to LinkedIn
- add 




