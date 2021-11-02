# Community Compass

Community data mapping and reporting tool using Svelte, Leaflet, Frappe Charts, and TailwindCSS. Demo [here](https://mcmap.org/compass).

![https://i.imgur.com/cWdhWD2.png](https://i.imgur.com/cWdhWD2.png)


## Installation

Modify the base path in `svelte.config.js` to suit your needs. It's set by default to go into a `compass` subfolder. To make it the root, make the `/compass` string empty.


```bash
# development server
npm run dev

# production build
npm run build
```

## Data

Data configuration is found at `src/lib/data/config.json`. Each metric has an id number tied to the `metric` key. This number is used to get the data in JSON format from `static/data/metric/m<id>.json` and a metadata file found at `static/data/meta/m<id>.html`.

The data related to the geography by id. Each geography id has an array of all of the values for each year present in the config file for the variable, i.e. `"3": [12, 32, 52], ...`.

The geography is stored as GeoJSON and is found at `static/data/<geography>.json`. I have `npa.geojson.json` as the default. If a metric has different geography, you can set it on the metric with an optional `geography` property, i.e. `"geography": "my-geography.json"`.

You can put anything in the metadata files.

## TODO (maybe)

* Help video
* PWA update available message
* Allow different geographies for different metrics
* Show summary values on the map as their own geographies
* Remember card config
