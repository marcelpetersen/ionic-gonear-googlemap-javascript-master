import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';

import { Network } from '@ionic-native/network';

import { Subscription} from 'rxjs/Subscription';

declare var google; 


@IonicPage()
@Component({
  selector: 'page-gmap',
  templateUrl: 'gmap.html',
})
export class GmapPage {

  miles: any;

  connected: Subscription;
  disconnected: Subscription;

  options : GeolocationOptions;
  currentPos : Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  places : Array<any> ;
  placestype: string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation : Geolocation, private toast: ToastController, private network: Network, public loading: LoadingController) {
    this.miles = 1000;
    
  }

  ionViewDidLoad() {
    
    this.connected = this.network.onConnect().subscribe(data => {
      this.checkNetworkConnection(data.type);
    }, error => console.error(error));
 
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      this.checkNetworkConnection(data.type);
    }, error => console.error(error));
  }

  ionViewWillLeave(){
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }

  // Function to pop toast with connection update
  checkNetworkConnection(connectionState: string){
      this.toast.create({
      message: `You are now ${connectionState}`,
      duration: 3000
      //closeButtonText: 'Close',
      //showCloseButton: true
    }).present();
  }
  // End: Function to pop toast with connection update



  // Function to get the current position of the user
  getMyPosition(gplace, pincolor){

    let gpincolor = pincolor;

    let loader = this.loading.create({
        content: `Searching <i>${gplace.replace(/_/g," ")}s</i> based on your location`,
    });

    loader.present().then(() => {
      
  	this.placestype = gplace;

    this.options = {
        enableHighAccuracy : false // Set: false to optimize device battery life
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {  

        this.currentPos = pos;     

        this.genMyMap(pos.coords.latitude,pos.coords.longitude, gpincolor);
        loader.dismiss(); 

    },(err : PositionError)=>{
        console.log("error : " + err.message);
        loader.dismiss(); 
    ;
    })


    }); //end loader 

  }
  // End: Function to get the current position of the user

  // Function for custom marker pin style

  pinStyle(color) {
      return {
          path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#fff',
          strokeWeight: 2,
          scale: 1,
     };
  }

  // End: Function for custom marker pin style

  // Adding current user postion marker on map
  addMyMarker(){

    

    let marker = new google.maps.Marker({
    	map: this.map,
    	animation: google.maps.Animation.DROP,
    	position: this.map.getCenter(),
      icon: this.pinStyle("#f8bd00")
    });

    let content = "<p>You</p>";          
    	let infoWindow = new google.maps.InfoWindow({
    	content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    	infoWindow.open(this.map, marker);
    });

   } 
  // End: Adding current position marker on map


  // Generate google map and plot places as markers on it
  genMyMap(lat,long,gpincolor){
    


    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
    	center: latLng,
    	zoom: 15,
    	mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.getPlaces(latLng).then((results : Array<any>)=>{
        this.places = results;
        for(let i = 0 ;i < results.length ; i++)
        {
            this.createPlacesMarker(results[i],gpincolor);
        }
    },(status)=>console.log(status));

    this.addMyMarker();

  }

  // End: Generate google map and plot places as markers on it

  // Get all places as json from places service api 

  getPlaces(latLng)
  {
	    var service = new google.maps.places.PlacesService(this.map);
	    let request = {
	        location : latLng,
	        radius : this.miles, //meters 
	        types: [this.placestype]
	    };

	    return new Promise((success,err)=>{
	        service.nearbySearch(request,function(results,status){
	            if(status === google.maps.places.PlacesServiceStatus.OK)
	            {
	                success(results); 
	            }else
	            {
	                err(status);
	            }

	        }); 
	    });

  }

  // End: Get all places as json from places service api

  // Create marker for all places 
  
  createPlacesMarker(place, gpincolor)
  {
  
    let marker = new google.maps.Marker({
    	map: this.map,
    	animation: google.maps.Animation.DROP,
    	position: place.geometry.location,
      icon: this.pinStyle("#"+gpincolor)
    }); 

  }   
  
  // End: Create marker for all places

}
