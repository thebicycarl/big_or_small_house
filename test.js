let deposit = document.getElementById('deposit')
let calcButton = document.getElementById('runBtn')
let outputText = document.getElementById('eTime')
let testValue = 0;

calcButton.addEventListener('click', testRun)

function testRun() {
    let depositv = deposit.value
    testValue = depositv * 2
    console.log(deposit.value)
    console.log(depositv)


    outputText.innerHTML=`${depositv}`
    run2()
}

function run2() {
    console.log(testValue)
}
