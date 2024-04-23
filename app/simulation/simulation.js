/**
 * Calculate useful heat from collector
 *
 * @param {Number} Irr - Solar irradiance (W/m^2)
 * @param {Number} Tair - Air temperature (Celcius)
 * @param {Number} Tin - Temperature of collector (Celcius)
 * @param {Number} Ac - Area of collector (m^2)
 * @param {Number} FU - Product of collector heat removal factor and Overall collector heat loss coefficient (W/m^2 C)
 * @param {Number} FTA - Product of collector heat removal factor, transmittance and absorbance of collector (Constant)
 * @returns {Number} Useful heat from the collector (W)
 */
const usefulHeatFromCollector = (Irr, Tair, Tin, Ac, FU, FTA) => {
    /**
     * Q_solar_useful is the useful heat collected from the sun
     *
     * Q_min_loss is the minimum heat loss at the collector to the surroundings
     *
     * Q_useful is the heat that is useful to use at the collector
     */

    let Q_solar_useful = FTA * Ac * Irr;

    let Q_min_loss = FU * Ac * (Tin - Tair);

    let Q_useful = Q_solar_useful - Q_min_loss;

    return Q_useful;
};

/**
 * Calculate output temperature of water passed through the collector
 *
 * @param {Number} Q - Useful heat from collector (W)
 * @param {Number} Ac - Area of collector (m^2)
 * @param {Number} Tin - Temperature of water entering the collector pipes (Celcius)
 * @param {Number} m - Mass flow rate of water (kg/s m^2)
 * @param {Number} Cw - Specific heat capacity of water (J/kg C)
 * @param {Number} Pl - Length of pipe inside the collector (m)
 * @param {Number} Pr - Radius of pipe (m)
 * @returns {Number} Tout - Temperature of water leaving the collector pipes (Celcius)
 */
const outputTemperatureFromCollector = (Q, Ac, Tin, m, Cw, Pl, Pr) => {
    /**
     * Q is the total heat we get from the collector accross its entire area
     */

    let Q_from_collector = ((Q / Ac) * (2 * 3.14 * Pr * Pl)) / (m * Cw);
    let Tout = Q_from_collector + Tin;

    return Tout;
};

/**
 * Calculate the new tank temperature
 *
 * @param {Boolean} toLoad - Set to true if the water is being supplied to households
 * @param {Number} Thot - Temperature of hot water entering the storage tank from collector (Celcius)
 * @param {Number} Tprev - Previous temperature of the tank (Celcius)
 * @param {Number} Tmains - Temperature of cold water entering the tank through the main supply (Celcius)
 * @param {Number} rho - Density of water (kg/m^3)
 * @param {Number} Vt - Volume of tank (m^3)
 * @param {Number} delta_t - Time step (s)
 * @param {Number} m - Mass flow rate of water (kg/s m^2)
 * @returns {Number} - Final temperature of tank/water in tank (Celcius)
 */

const newTankTemperature = (toLoad, Thot, Tprev, Tmains, rho, Vt, delta_t, m) => {
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

    let Tfinal = 0;

    if (toLoad) {
        /**
         * If the water is being supplied and used at households
         */
        Tfinal = (delta_t * m * Thot + Tprev * rho * Vt + delta_t * m * Tmains) / (rho * Vt + 2 * delta_t * m);
    } else {
        /**
         * The water is not being used and is only circulating through the collector
         */
        Tfinal = (delta_t * m * Thot + Tprev * rho * Vt) / (rho * Vt + delta_t * m);
    }

    return Tfinal;
};

/**
 * Simulate heat transfer
 *
 * @param {Object} props
 * @param {Boolean} props.toLoad - Set to true if the water is being supplied to households
 * @param {Number} props.Irr - Solar irradiance (W/m^2)
 * @param {Number} props.Tmains - Temperature of cold water entering the tank through the main supply (Celcius)
 * @param {Number} props.Tair - Air temperature (Celcius)
 * @param {Number} props.Ac - Area of collector (m^2)
 * @param {Number} props.FU - Product of collector heat removal factor and Overall collector heat loss coefficient (W/m^2 C)
 * @param {Number} props.FTA - Product of collector heat removal factor, transmittance and absorbance of collector (Constant)
 * @param {Number} props.m - Mass flow rate of water (kg/s m^2)
 * @param {Number} props.Cw - Specific heat capacity of water (J/kg C)
 * @param {Number} props.rho - Density of water (kg/m^3)
 * @param {Number} props.Vt - Volume of tank (m^3)
 * @param {Number} props.ts - Time step (seconds)
 * @param {Number} props.Pl - Length of pipe inside the collector (m)
 * @param {Number} props.Pr - Radius of pipe (m)
 * @returns {Number} Final temperature of tank/water in tank after ts seconds (Celcius)
 */
const heatTransfer = ({ toLoad, Irr, Tmains, Tair, Tprev, Ac, FU, FTA, m, Cw, rho, Vt, ts, Pl, Pr }) => {
    let Tfinal = Tprev;

    for (let i = 0; i < ts; i++) {
        let Q = usefulHeatFromCollector(Irr, Tair, Tprev, Ac, FU, FTA);
        let Thot = outputTemperatureFromCollector(Q, Ac, Tprev, m, Cw, Pl, Pr);

        Tfinal = newTankTemperature(toLoad, Thot, Tprev, Tmains, rho, Vt, 1, m);
        Tprev = Tfinal;
    }

    return Tfinal;
};

export { heatTransfer, newTankTemperature, usefulHeatFromCollector, outputTemperatureFromCollector };
