document.getElementById('netSum').addEventListener('input', markResultsAsChanged);
document.getElementById('taxSum').addEventListener('input', markResultsAsChanged);
document.getElementById('totalSum').addEventListener('input', markResultsAsChanged);

var TAX_RATE = 12;

function markResultsAsChanged() {
    document.getElementById('taxAmount').classList.add('changed');
    document.getElementById('netAmount').classList.add('changed');
    document.getElementById('totalAmount').classList.add('changed');
}

function calculateTax() {
  const netSum = parseFloat(document.getElementById('netSum').value);
  const taxSum = parseFloat(document.getElementById('taxSum').value);
  const totalSum = parseFloat(document.getElementById('totalSum').value);

  let inputs = (isNaN(netSum) ? 0 : 1) + (isNaN(taxSum) ? 0 : 1) + (isNaN(totalSum) ? 0 : 1);
  console.log("inputs = ", inputs, netSum, taxSum, totalSum);
  if (inputs > 1) {
        document.getElementById('taxAmount').value = '';
        document.getElementById('netAmount').value = '';
        document.getElementById('totalAmount').value = 'Please fill only one number.';
        return;
  } else if (inputs < 1) {
        document.getElementById('taxAmount').value = '';
        document.getElementById('netAmount').value = '';
        document.getElementById('totalAmount').value = 'Please fill one number.';
        return;
  }

  let netAmount = netSum;
  let taxAmount = taxSum;
  let totalAmount = totalSum;

  if (!isNaN(netAmount)) {
    // need to calculate it from either tax or total
    taxAmount = netAmount * TAX_RATE / 100;
    totalAmount = netAmount * (TAX_RATE + 100)/100;
  } else if (!isNaN(totalAmount)) {
    netAmount = totalAmount * 100 / (TAX_RATE + 100);
    taxAmount = totalAmount * TAX_RATE / (TAX_RATE + 100);
  } else if (!isNaN(taxAmount)) {
    netAmount = taxAmount * 100 / TAX_RATE;
    totalAmount = taxAmount * (TAX_RATE + 100) / TAX_RATE;
  }

  document.getElementById('taxAmount').value = `$${taxAmount.toFixed(2)}`;
  document.getElementById('netAmount').value = `$${netAmount.toFixed(2)}`;
  document.getElementById('totalAmount').value = `$${totalAmount.toFixed(2)}`;

  document.getElementById('taxAmount').classList.remove('changed');
  document.getElementById('netAmount').classList.remove('changed');
  document.getElementById('totalAmount').classList.remove('changed');
}

function clearFields() {
    document.getElementById('taxAmount').value = '';
    document.getElementById('netAmount').value = '';
    document.getElementById('totalAmount').value = '';
    document.getElementById('netSum').value = '';
    document.getElementById('taxSum').value = '';
    document.getElementById('totalSum').value = '';

    document.getElementById('taxAmount').classList.remove('changed');
    document.getElementById('netAmount').classList.remove('changed');
    document.getElementById('totalAmount').classList.remove('changed');
}
