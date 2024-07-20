export function calcEffort(family:string, poolEffort:number, coinName:string) {
    let PoolEffort = 0
    if (family == "alephium") {
        PoolEffort = Number(poolEffort) * Math.pow(2, 30) * 100;
        // Bitcoin (family)
    } else if (family == "bitcoin") {
        // Vertcoin (coin)
        if (coinName == "Vertcoin") {
        PoolEffort = (Number(poolEffort) / 256) * 100;
        // VishAI (coin)
        } else if (coinName == "Vishai") {
        PoolEffort = (Number(poolEffort) / 65536) * 100;
        // Reaction (coin)
        } else if (coinName == "Reaction") {
        PoolEffort = (Number(poolEffort) / 65536) * 100;
        } else {
        PoolEffort = Number(poolEffort) * 100;
        }
        // Kaspa (family)
    } else if (family == "kaspa") {
        PoolEffort = Number(poolEffort) * Math.pow(2, 31) * 100;
    } else {
        PoolEffort = Number(poolEffort) * 100;
    }
    return PoolEffort
}