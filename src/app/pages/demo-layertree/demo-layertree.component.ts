import { Component, OnDestroy, OnInit } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import TileJSON from 'ol/source/TileJSON';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { MangolLayer } from '../../../../projects/mangol/src/lib/classes/Layer';
import { AppService } from '../../app.service';
import { MangolLayerGroup } from './../../../../projects/mangol/src/lib/classes/LayerGroup';
import { MangolConfig } from './../../../../projects/mangol/src/lib/interfaces/config.interface';
import { MangolService } from './../../../../projects/mangol/src/lib/mangol.service';
import { code } from './code';

@Component({
  selector: 'app-demo-layertree',
  templateUrl: './demo-layertree.component.html',
  styleUrls: ['./demo-layertree.component.scss']
})
export class DemoLayertreeComponent implements OnInit, OnDestroy {
  mangolConfig: MangolConfig;
  sidebarOpenedSubscription: Subscription;

  /**
   * REVIEW: What is this 'code' and how is it used? I believe it's for displaying the code associated with this component
   * and can be removed.
   */
  code = 'test me';

  /**
   * TODO: Inject a service to query the current centroid for the map location.  This would be based on
   * the user's preference, the centroid of the lease boundary, and/or possibly a 'zoom to feature' request.
   * @param appService
   * @param mangolService
   */
  constructor(
    private appService: AppService,
    private mangolService: MangolService
  ) {
    this.sidebarOpenedSubscription = this.appService.sidebarOpenedSubject.subscribe(
      opened => {
        if (opened !== null) {
          this.mangolService.mapState$
            .pipe(
              map(m => m.map),
              filter(m => m !== null)
            )
            .subscribe(m => {
              setTimeout(() => {
                m.updateSize();
              }, 500);
            });
        }
      }
    );
  }

  // TODO: Look at the 1.0 Pelagis client for the olmap configuration
  // TODO: The configuration should be done at the application level configuration - app.service.ts or app.store.ts.
  // This componenent will then configure the inital map view based on the app.ol.config service or store
  ngOnInit() {
    this.mangolConfig = {
      map: {
        target: 'mangol-demo-layertree',
        // TODO: The initial view is based on the connected user's area of interest or feature of interest (e.g. lease ).
        // The feature of interest could also be more granular in terms of the lease,line,sock or cage or a georeferenced event
        view: new View({
          projection: 'EPSG:900913',
          center: fromLonLat(
            [19.3956393810065, 47.168464955013],
            'EPSG:900913'
          ),
          zoom: 4
        }),
        layers: [
          new MangolLayer({
            name: 'OpenStreetMap Layer',
            details: 'Here are the OSM layer details',
            layer: new TileLayer({
              source: new OSM(),
              visible: true
            })
          }),
          // TODO: Create a layer group to reflect the feature types in the Pelagis OGC::Feature domain
          new MangolLayerGroup({
            name: 'Overlays',
            children: [
              new MangolLayer({
                name: 'Roads',
                layer: new TileLayer({
                  source: new TileWMS({
                    url:  // TODO: Update the url to point to the Pelagis geoserver wms service
                      'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                    crossOrigin: 'anonymous',
                    params: {
                      LAYERS: ['naturalearth:roads'],
                      format: 'image/png',
                      SRS: 'EPSG:900913'
                    }
                  }),
                  opacity: 0.5,
                  visible: false
                })
              }),
              new MangolLayerGroup({
                name: 'Coutries & Cities',
                children: [
                  new MangolLayer({
                    name: 'Country borders',
                    details:
                      'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    layer: new TileLayer({
                      source: new TileWMS({
                        url:
                          'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                        crossOrigin: 'anonymous',
                        params: {
                          LAYERS: ['naturalearth:countries'],
                          format: 'image/png',
                          SRS: 'EPSG:900913'
                        }
                      }),
                      opacity: 0.5,
                      visible: false
                    })
                  }),
                  new MangolLayer({
                    name: 'Populated places',
                    layer: new TileLayer({
                      source: new TileWMS({
                        url:
                          'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                        crossOrigin: 'anonymous',
                        params: {
                          LAYERS: ['naturalearth:populated_places'],
                          format: 'image/png',
                          SRS: 'EPSG:900913'
                        }
                      }),
                      visible: true
                    })
                  })
                ]
              })
            ]
          })
        ]
      },
      sidebar: {
        collapsible: true,
        opened: true,
        title: 'Layertree example',
        mode: 'side',
        toolbar: {
          layertree: {
            active: true,
            disabled: false,
            title: 'Layers',
            details: {
              opacity: {
                sliderStep: 1,
                showLabels: true
              }
            }
          }
        }
      }
    };
  }

  ngOnDestroy() {
    if (this.sidebarOpenedSubscription) {
      this.sidebarOpenedSubscription.unsubscribe();
    }
    this.mangolService.resetMangolState();
  }
}
