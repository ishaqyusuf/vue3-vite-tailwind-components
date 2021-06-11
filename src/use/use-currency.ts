const rawCurrencies = [
  "United States Dollar (USD) - $",
  "Euro (EUR) - €",
  "British Pound (GBP) - £",
  "Australian Dollar (AUD) - A$",
  "Canadian Dollar (CAD) - C$",
  "Israeli Shekel (ILS) - ₪",
  "Brazilian Real (BRL) - R$",
  "Hong Kong Dollar (HKD) - HK$",
  "Swedish Krona (SEK) - kr",
  "New Zealand Dollar (NZD) - NZ$",
  "Singapore Dollar (SGD) - S$",
  "Swiss Franc (CHF) - CHF",
  "South African Rand (ZAR) - R",
  "Chinese Renminbi Yuan (CNY) - ¥",
  "Indian Rupee (INR) - ₹",
  "Malaysian Ringgit (MYR) - RM",
  "Mexican Peso (MXN) - $",
  "Nigerian Naira (NGN) - ₦",
  "Pakistani Rupee (PKR) - ₨",
  "Philippine Peso (PHP) - ₱",
  "New Taiwan Dollar (TWD) - $",
  "Thai Baht (THB) - ฿",
  "Turkish New Lira (TRY) - ₺",
  "United Arab Emirates Dirham (AED) - د.إ",
];
export function currencies() {
  return rawCurrencies.map((c, i) => {
    return {
      title: c,
      unit: c.split("-")[1].trim(),
      unit_str: c.split("(")[1].split(")")[0],
      id: i,
    };
  });
}
export default currencies;
