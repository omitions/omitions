const currency = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});
const number = Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 });

export default function toIDR(v: number, symbol = true) {
  let modV: string | number = v;

  if (!isNaN(v)) {
    const stringArr = v.toString().split(".");
    if (stringArr.length > 1) {
      modV = symbol
        ? currency.format(v)
        : `${number.format(+stringArr[0])},${stringArr[1]}`;
    } else {
      modV = symbol ? `IDR ${number.format(+stringArr[0])}` : number.format(v);
    }
  }

  return modV;
}
