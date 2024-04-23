# Heat transfer

This application simulates heat transfer from a solar collector to a storage tank. This solar water heater is an <b>Open loop Active circulation</b> system meaning it heats the water which is circulated from tank to the collector using a pump.

## Dataset

The dataset used in the application is collected for Salt Lake City from [National Solar Radiation Database](https://nsrdb.nrel.gov/).

Data structure and description -

```
{
  "year": 2022,
  "month": 6,
  "day": 1,
  "hour": 0,
  "minute": 0,
  "dhi": 0,
  "dni": 0,
  "ghi": 0,
  "temperature": 8
}
```

`ghi` : Modeled solar radiation on a horizontal surface received from the sky<br>
`dhi` : Modeled solar radiation on a horizontal surface received from the sky excluding the solar disk<br>
`dni` : Modeled solar radiation obtained from the direction of the sun

The data points are at a constant time step value of 10 minutes. It is assumed that the all the values are <b>averaged over last 10 minutes</b>.

## Simulation

The application comes with existing simulations which are saved in `app/data/simulations.json`. You are also allowed to create simulations of your own but they <b>won't be saved</b>. If you wish to save your simulations, I would suggest adding the simulation parameters to the `simulations.json`.

Simulation parameters and description -

```
{
    "id": 1,
    "toLoad": false,
    "Ac": 4,
    "FU": 3,
    "FTA": 0.7,
    "Pl": 4,
    "Pr": 0.04,
    "Tmains": 20,
    "m": 0.1,
    "Vt": 0.1,
    "Cw": 4182,
    "rho": 995,
    "ts": 600
}
```

`id` : Simulation id (Number) <br>
`toLoad` - Set to `true` if the water is being supplied to households and used, toLoad can be changed while the simulation is running (Boolean) <br>
`Tmains` - Temperature of cold water entering the tank through the main supply (Celcius) <br>
`Tair` - Air temperature (Celcius) <br>
`Ac` - Area of collector (m^2) <br>
`FU` - Product of collector heat removal factor and overall collector heat loss coefficient (W/m^2 C) <br>
`FTA` - Product of collector heat removal factor, transmittance and absorbance of collector (Constant) <br>
`m` - Mass flow rate of water (kg/s m^2) <br>
`Cw` - Specific heat capacity of water (J/kg C) <br>
`rho` - Density of water (kg/m^3) <br>
`Vt` - Volume of tank (m^3) <br>
`ts` - Time step (seconds) <br>
`Pl` - Length of pipe inside the collector (m) <br>
`Pr` - Radius of pipe (m) <br>

Since the existing dataset has data points 10 minutes, therefore, the default value of `ts` should be `600 seconds`.

> After you have finalized all the simulation parameters, you can `Run`, `Pause` and `Reset` the simulation.<br>
> You can also toggle the value of `toload` during the run which essentially means if the water is being used or not.

Naturally, when `toload` is false the temperature of water inside the tank will be more than otherwise.

## Getting Started

First, clone the repository and then run the following commands:

```bash
cd heat-transfer
npm install

# Run the development server
npm run dev
# or
# Run the build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
