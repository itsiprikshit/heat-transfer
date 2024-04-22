const usefulHeatFromCollector = (Irr, Tair, Tprev, Ac, FU, FTA) => {
    /**
     * let Q_solar_useful = Fr * tau * alpha * Ac * Irr
     * FTA is Fr * tau * alpha
     *
     * Q_min_loss is the minimum heat loss at the collector to the surroundings
     * let Q_min_loss_useful = Fr * Ul * Ac * (Tprev - Tair);
     * FU is Fr * Ul
     *
     * Q_useful is the heat that is useful to use at the collector
     */

    let Q_solar_useful = FTA * Ac * Irr;

    let Q_min_loss_useful = FU * Ac * (Tprev - Tair);

    let Q_useful = Q_solar_useful - Q_min_loss_useful;

    return Q_useful;
};

const outputTemperatureFromCollector = (Q, Ac, Tprev, m, Cw, Pl, Pr) => {
    /**
     * Q is the total heat we get from the collector accross its entire area
     * q is the heat flux on the pipe per m^2
     * Will q = Q/Ac ?
     *
     * This means,
     * let Q_from_collector = ((Q/Ac) * (Ap))/(m * Cw) here Ap = 2 * pi * r * l i.e. area of pipe
     */

    let Q_from_collector = ((Q / Ac) * (2 * 3.14 * Pr * Pl)) / (m * Cw);
    let Thot = Q_from_collector + Tprev;

    return Thot;
};

const udpateDTankTemperature = (toLoad, Thot, Tprev, Tw, rho, Vt, delta_t, m) => {
    /**
     * Using energy balance equation
     * U =  Q + W + (hin - hout)
     * Assuming there is no heat loss, no extra heat is supplied to the tank and there is no work
     *
     * Q = 0
     * W = 0
     *
     * The only way heat enters and leaves is through the enthalpy of water entering and leaving the tank
     */

    let Tcurr = 0;

    if (toLoad) {
        Tcurr = (delta_t * m * Thot + Tprev * rho * Vt + delta_t * m * Tw) / (rho * Vt + 2 * delta_t * m);
    } else {
        Tcurr = (delta_t * m * Thot + Tprev * rho * Vt) / (rho * Vt + delta_t * m);
    }

    return Tcurr;
};

const heatTransfer = ({ toLoad, Irr, Twater, Tair, Tprev, Ac, FU, FTA, m, Cw, rho, Vt, dt, Pl, Pr }) => {
    let Tcurr;

    for (let i = 0; i < dt; i++) {
        let Q = usefulHeatFromCollector(Irr, Tair, Tprev, Ac, FU, FTA);
        let Thot = outputTemperatureFromCollector(Q, Ac, Tprev, m, Cw, Pl, Pr);

        Tcurr = udpateDTankTemperature(toLoad, Thot, Tprev, Twater, rho, Vt, 1, m);

        Tprev = Tcurr;
    }

    return Tcurr;
};

export default heatTransfer;
