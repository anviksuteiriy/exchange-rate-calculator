const currencyOne = document.getElementById('currency-1');
const currencyTwo = document.getElementById('currency-2');
const amountOne = document.getElementById('amount-1');
const amountTwo = document.getElementById('amount-2');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


//fetch exchange rate and update the DOM
function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
      amountTwo.value = (rate * amountOne.value).toFixed(2);
    });
}

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);
swap.addEventListener('click', () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
})

calculate();