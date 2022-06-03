
import { NavController, Platform } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { userService } from './../../shared/services/user.service';
import { DataService } from './../../shared/services/data.service';
import { inquiryService } from './../../shared/services/enquiry.service';
import { jobService } from './../../shared/services/jobs.service';
import { autoLocationService } from 'src/app/shared/services/autoLocation.service';
declare var google: any;;
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;
  height;
  loaded: boolean;
  id: any;
  driverId: any;
  userLat: any;
  userLng: any;

  driverName: any;
  driverMobile: any;
  driverCover: any;
  driverFCM: any;

  driverLat: any;
  driverLng: any;
  interval: any;
  constructor(
    private plt: Platform,
    private navCtrl: NavController,
    private jobService: jobService,
    private inquiryService: inquiryService,
    private route: ActivatedRoute
  ) {
    this.height = plt.height();
    this.loaded = false;
    this.getParamsId();
  }

  ngOnInit() {
  }
  goToBack() {
    this.navCtrl.back();
  }


  inquiryId
  //get params id
  getParamsId() {
    this.route.params.subscribe((params: Params) => {
      if (params) {
        this.inquiryId = params.id;
        if (!this.inquiryId) {
          // this.data.goBack();
          return;
        } else {
          this.getInquiryDetail();

        }
      }
    });
  }

  inquiry
  //get inquiry detail
  getInquiryDetail(marker?, map?) {
    this.inquiryService.getEnquiryById(this.inquiryId).subscribe(res => {
      this.inquiry = res.data;

      this.userLat = this.inquiry.address[0].lat;
      this.userLng = this.inquiry.address[0].long;
      this.getInquiryJobs(marker, map)
    })
  }


  jobData
  //get inquiryJobs
  getInquiryJobs(marker?, map?) {
    this.jobService.getEnquiryJobWithUserDetail(this.inquiryId).subscribe(res => {
      this.jobData = res.data[0];
      this.getDriverInfo(marker, map);
    })
  }


  getDriverInfo(marker?, map?) {

        const info = this.jobData.technician;
        this.driverName = info.firstName + ' ' + info.lastName;
        this.driverMobile = info.contact;
        this.driverCover = info.imageUrl;
        this.driverLat = info.data[0].lat;
        this.driverLng = info.data[0].long;
       if (marker && map) {
          const latlng = new google.maps.LatLng(parseFloat(this.driverLat), parseFloat(this.driverLng));
          map.setCenter(latlng);
          marker.setPosition(latlng);
        } else {
          this.loadMap(parseFloat(this.userLat), parseFloat(this.userLng), parseFloat(this.driverLat), parseFloat(this.driverLng));
        }
      }
  


  getDriverCover() {
    return this.driverCover && this.driverCover != null && this.driverCover !== '' ? this.driverCover : '';
  }
  driverCall() {
    window.open('tel:' + this.driverMobile, '_system');
  }

  loadMap(latOri, lngOri, latDest, lngDest) {

    const directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay = new google.maps.DirectionsRenderer();
    const bounds = new google.maps.LatLngBounds;

    const origin1 = { lat: parseFloat(latOri), lng: parseFloat(lngOri) };
    const destinationA = { lat: latDest, lng: lngDest };

    const maps = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: latOri, lng: lngOri },
      disableDefaultUI: true,
      zoom: 100
    });

    const custPos = new google.maps.LatLng(latOri, lngOri);
    const restPos = new google.maps.LatLng(latDest, lngDest);

    const logo = {
      url: 'assets/marker.png',
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    const dlvrylogo = {
      url: 'assets/icon/technician.svg',
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };
    const marker = new google.maps.Marker({
      map: maps,
      position: custPos,
      animation: google.maps.Animation.DROP,
      icon: logo,
    });
    const markerCust = new google.maps.Marker({
      map: maps,
      position: restPos,
      animation: google.maps.Animation.DROP,
      icon: dlvrylogo,
    });
    marker.setMap(maps);
    markerCust.setMap(maps);

    directionsDisplay.setMap(maps);
    directionsDisplay.setOptions({ suppressMarkers: true });
    directionsDisplay.setOptions({
      polylineOptions: {
        strokeWeight: 4,
        strokeOpacity: 1,
        strokeColor: '#ff384c'
      },
      suppressMarkers: true
    });
    const geocoder = new google.maps.Geocoder;

    const service = new google.maps.DistanceMatrixService;

    service.getDistanceMatrix({
      origins: [origin1],
      destinations: [destinationA],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, function (response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        const originList = response.originAddresses;
        const destinationList = response.destinationAddresses;
        const showGeocodedAddressOnMap = function (asDestination) {
          return function (results, status) {
            if (status === 'OK') {
              maps.fitBounds(bounds.extend(results[0].geometry.location));
            } else {
              alert(this.util.translate('Geocode was not successful due to: ') + status);
            }
          };
        };

        directionsService.route({
          origin: origin1,
          destination: destinationA,
          travelMode: 'DRIVING'
        }, function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert(this.util.translate('Directions request failed due to ') + status);
          }
        });


        for (let i = 0; i < originList.length; i++) {
          const results = response.rows[i].elements;
          geocoder.geocode({ 'address': originList[i] },
            showGeocodedAddressOnMap(false));
          for (let j = 0; j < results.length; j++) {
            geocoder.geocode({ 'address': destinationList[j] },
              showGeocodedAddressOnMap(true));
          }
        }
      }
    });
    this.interval = setInterval(() => {
      this.getInquiryDetail(marker, maps);
    }, 6000);
  }

  ionViewDidLeave() {
    clearInterval(this.interval);
  }

}
