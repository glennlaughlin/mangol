import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromLonLat } from 'ol/proj.js';
import View from 'ol/View';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AppService } from '../../app.service';
import { MangolConfig } from './../../../../projects/mangol/src/lib/interfaces/config.interface';
import { MangolService } from './../../../../projects/mangol/src/lib/mangol.service';
import { code } from './code';

@Component({
  selector: 'app-demo-sidebar',
  templateUrl: './demo-sidebar.component.html',
  styleUrls: ['./demo-sidebar.component.scss']
})
export class DemoSidebarComponent implements OnInit, OnDestroy {
  mangolConfig: MangolConfig;
  sidebarOpenedSubscription: Subscription;

  code = code;

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

  /**
   * Initialize the mapComponent's centerOn location coordinates and projection
   * TODO: This needs to be initialized based on the userProfile default map location which should be the centroid
   * of the LeaseBoundary featureCollection for all subscribed leases
   * REVIEW: EPSG:900913 This is the Google project system. Does it support all base layers? Bing maps? Or EPSG:3857 for Microsoft.

   */
  ngOnInit() {
    this.mangolConfig = {
      map: {
        target: 'mangol-demo-sidebar',
        view: new View({
          projection: 'EPSG:900913',
          center: fromLonLat( [-60.575336, 46.260472], 'EPSG:900913' ), // Center on St Anns Bay
          zoom: 12
        })
      },
      sidebar: {
        collapsible: true,
        opened: true,
        title: 'Sidebar example',
        mode: 'side'
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
