import { Injectable } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import View from 'ol/View';

import { MangolLayer } from '../../classes/Layer';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor() {}

  getDefaultMap(): {
    target: string;
    layers: MangolLayer[];
    view: View;
  } {
    return {
      target: 'my-map',
      layers: [
        new MangolLayer({
          name: 'OpenStreetMap Layer',
          layer: new TileLayer({
            source: new OSM()
          })
        })
      ],
      /**
       * Set the coordinates and project for the Default mapView
       * TODO: Default to the centroid of the lease boundary featureCollection
       *   Can we inject a mapService to listen for the coordinates based on the user lease selection?
       * REVIEW: Why is this projection different from the demo-sidebar onInit
       */
      view: new View(
        {
          // Center on St Anns Bay
          projection: 'EPSG:3857',
          center: fromLonLat([46.260472, -60.575336], 'EPSG:3857'),
          zoom: 4,
          enableRotation: true
        }
      )
    };
  }
}
