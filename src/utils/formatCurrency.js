function formatCurrency(value, currency = "GBP") {
  const formatter = Intl.NumberFormat("en-GB", { style: "currency", currency });
  return formatter.format(value);
}

module.exports = formatCurrency;
