/*
export function formatHashrate(value:number, decimal:number, unit:string) {
    if (value === 0) {
        return "0 " + unit;
    } else {
        const si = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
        { value: 1e21, symbol: "Z" },
        { value: 1e24, symbol: "Y" }
        ];
        for (let i = si.length - 1; i > 0; i--) {
        if (value >= si[i].value) {
            break;
        }
        }
        return ((value / si[i].value).toFixed(decimal).replace(/.0+$|(.[0-9]*[1-9])0+$/, "$1") + " " + si[i].symbol + unit);
        }
    }
        */