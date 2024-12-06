var red = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});



function sender_maps(click = 1, pick = 0) {
    // sender MAP
    document.getElementById('map_sender').innerHTML = "<div id='map' style=' height: 500px;z-index: 1'></div>";
    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map('map');


    map.setView([30.4186991, -9.5562328], 13);
    var markeer;

    if (pick == 1) {
        if ("geolocation" in navigator) { //check geolocation available
            //try to get user current location using getCurrentPosition() method
            navigator.geolocation.getCurrentPosition(function(position) {
                var slatlng = L.latLng(position.coords.latitude, position.coords.longitude);

                var gcs = L.esri.Geocoding.geocodeService();

                gcs.reverse().latlng(slatlng).language("fr").run((err, res) => {
                    if (err) return;
                    markeer = new L.marker(slatlng).addTo(map).bindPopup(res.address.Match_addr).openPopup();
                    Livewire.emit('saveSenderResponse', position.coords.latitude, position.coords.longitude, res.address.Match_addr);

                });

                // markeer = L.marker(slatlng).addTo(map).bindPopup("<b>Your Location</b>").openPopup();
                map.setView([position.coords.latitude, position.coords.longitude], 13);
            });
        }
    }

    var layer = L.tileLayer.wms("https://geoserver.sys.infodat.com/geoserver/wms", {
        layers: `${workspace}:${layer_name}`,
        format: "image/png",
        transparent: true,
        attribution: "SADIK SAJID",
    });

    layer.addTo(map);;
    var gcs = L.esri.Geocoding.geocodeService();

    if (click == 1) {
        map.on('click', (e) => {
            if (markeer) {
                map.removeLayer(markeer);
            }
            gcs.reverse().latlng(e.latlng).language("fr").run((err, res) => {
                if (err) return;
                markeer = new L.marker(res.latlng).addTo(map).bindPopup(res.address.Match_addr).openPopup();
                // document.getElementById("s_latitude").value = res.latlng.lat;
                // document.getElementById("s_longitude").value = res.latlng.lng;
                Livewire.emit('saveSenderResponse', res.latlng.lat, res.latlng.lng, res.address.Match_addr);
                // if (home == 1) {

                //     if (r.style.display === "none") {
                //         sessionStorage.setItem("slo", res.latlng.lng);
                //         sessionStorage.setItem("sla", res.latlng.lat);
                //     } else {
                //         receiver_maps(res.latlng.lng, res.latlng.lat);
                //     }
                // }
            });
        });
    }



}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function guest_maps(click = 1, pick = 0) {
    // sender MAP

    document.getElementById('map_guest').innerHTML = "<div id='map_g' style=' height: 500px;z-index: 1'></div>";


    var container = L.DomUtil.get('map_g');
    if (container != null) {
        container._leaflet_id = null;
    }


    var map = L.map('map_g');


    map.setView([30.4186991, -9.5562328], 13);

    var markeer;
    var picked = 0;

    if (pick == 1) {
        if ("geolocation" in navigator) { //check geolocation available
            //try to get user current location using getCurrentPosition() method

            navigator.geolocation.getCurrentPosition(function(position) {
                var slatlng = L.latLng(position.coords.latitude, position.coords.longitude);
                var gcs = L.esri.Geocoding.geocodeService();

                gcs.reverse().latlng(slatlng).language("fr").run((err, res) => {
                    if (err) return;
                    if (markeer) {
                        map.removeLayer(markeer);
                    }
                    markeer = L.marker(slatlng).addTo(map).bindPopup(res.address.Match_addr).openPopup();
                    Livewire.emit('saveSenderResponse', position.coords.latitude, position.coords.longitude, res.address.Match_addr);

                });

                // markeer = L.marker(slatlng).addTo(map).bindPopup("<b>Your Location</b>").openPopup();

            });
        }
    }


    if (click == 1) {
        map.on('click', (e) => {
            if (markeer) {
                map.removeLayer(markeer);
            }
            gcs.reverse().latlng(e.latlng).language("fr").run((err, res) => {
                if (err) return;
                markeer = new L.marker(res.latlng).addTo(map).bindPopup(res.address.Match_addr).openPopup();
                // document.getElementById("s_latitude").value = res.latlng.lat;
                // document.getElementById("s_longitude").value = res.latlng.lng;
                Livewire.emit('saveSenderResponse', res.latlng.lat, res.latlng.lng);

            });
        });
    }
    var layer = L.tileLayer.wms("https://geoserver.sys.infodat.com/geoserver/wms", {
        layers: `${workspace}:${layer_name}`,
        format: "image/png",
        transparent: true,
        attribution: "SADIK SAJID",
    });

    layer.addTo(map);;
    var gcs = L.esri.Geocoding.geocodeService();

}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function receiver_maps(slo = null, sla = null, rlo = null, rla = null, click = 1, pick = 0, is_express = 0) {
    // RECIEVER MAP
    document.getElementById('mapreceiverdiv').innerHTML = "<div id='mapreceiver' style=' height: 500px;z-index: 1'></div>";

    var container = L.DomUtil.get('mapreceiver');
    if (container != null) {
        container._leaflet_id = null;
    }

    var mapreceiver = L.map('mapreceiver');

    ///////////////////////////////////////////////////////////////////
    if (sla != null) {
        mapreceiver.setView([sla, slo], 1)
    } else {
        mapreceiver.setView([30.4186991, -9.5562328], 13)
    }

    ///////////////////////////////////////////////////////////////////

    var workspace = "osm";
    var layer_name = "osm";
    var layer = L.tileLayer.wms(
        "https://geoserver.sys.infodat.com/geoserver/wms", {
            layers: `${workspace}:${layer_name}`,
            format: "image/png",
            transparent: true,
            attribution: "SADIK SAJID",
        }
    );
    layer.addTo(mapreceiver);



    if (sla != null && slo != null) {
        var slatlng = L.latLng(sla, slo);
        var rlatlng = null;
        L.marker(slatlng).addTo(mapreceiver).bindPopup("<b>Sender Location</b>").openPopup();
    }

    /////////////////////////////////////////////////////////////////
    var gcs = L.esri.Geocoding.geocodeService();


    var marker2;


    if (rla != null && rlo != null) {
        var rlatlng = L.latLng(rla, rlo);
        marker2 = L.marker(rlatlng, { icon: red }).addTo(mapreceiver).bindPopup("<b>Receiver Location</b><br>").openPopup();

    }

    var control = L.Routing.control(L.extend(window.lrmConfig, {

        createMarker: function(i, wp, nWps) {
            return
        },

        waypoints: [
            slatlng,
            rlatlng
        ],
        geocoder: L.Control.Geocoder.nominatim(),
        routeWhileDragging: true,
        reverseWaypoints: true,
        showAlternatives: true,
        altLineOptions: {
            styles: [
                { color: 'black', opacity: 0.15, weight: 9 },
                { color: 'white', opacity: 0.8, weight: 6 },
                { color: 'blue', opacity: 0.5, weight: 2 }
            ]
        }

    })).addTo(mapreceiver);

    control._container.style.display = "None";

    if (rla != null && rlo != null && sla != null && slo != null) {
        control.on('routesfound', function(e) {
            var routes = e.routes;
            var2 = routes[0].summary;

            if (var2['totalDistance'] <= 25000 && is_express == 1) {
                $("#mapreceiver").css("border", "none");
                marker2.bindPopup("<b>Receiver Location</b><br>").openPopup()
                Livewire.emit('pricing', var2);
            } else {
                Livewire.emit('pricing', -1);
                $("#mapreceiver").css("border", "4px solid red");
                marker2.bindPopup("<b style='color:red'> too far !</b><br>").openPopup();
            }

        });
    }

    // if (pick == 1) {


    //     if ("geolocation" in navigator) { //check geolocation available
    //         //try to get user current location using getCurrentPosition() method
    //         navigator.geolocation.getCurrentPosition(function(position) {
    //             var slatlng = L.latLng(position.coords.latitude, position.coords.longitude);
    //             var gcs = L.esri.Geocoding.geocodeService();

    //             gcs.reverse().latlng(slatlng).language("fr").run((err, res) => {
    //                 if (err) return;
    //                 if (markeer) {
    //                     map.removeLayer(markeer);
    //                 }
    //                 markeer = L.marker(slatlng).addTo(map).bindPopup(res.address.Match_addr).openPopup();
    //                 Livewire.emit('saveSenderResponse', position.coords.latitude, position.coords.longitude, res.address.Match_addr);

    //             });

    //         });
    //     }
    // }

    if (pick == 1) {


        if ("geolocation" in navigator) { //check geolocation available
            //try to get user current location using getCurrentPosition() method
            navigator.geolocation.getCurrentPosition(function(position) {
                var rlatlng = L.latLng(position.coords.latitude, position.coords.longitude);
                var gcs = L.esri.Geocoding.geocodeService();

                gcs.reverse().latlng(slatlng).language("fr").run((err, res) => {
                    if (err) return;
                    if (marker2) {
                        mapreceiver.removeLayer(marker2);
                    }
                    marker2 = L.marker(rlatlng).addTo(mapreceiver).bindPopup(res.address.Match_addr).openPopup();
                    Livewire.emit('saveNeweMap', position.coords.latitude, position.coords.longitude, res.address.Match_addr);

                });

            });
        }
    }


    function getLocal(e) {
        var rla = e.latlng.lat;
        var rlo = e.latlng.lng;
        // Livewire.emit('getlocal', [rla,rlo]);

        var rlatlng = L.latLng(rla, rlo);

        if (marker2) {
            mapreceiver.removeLayer(marker2);
        }

        marker2 = L.marker(rlatlng, { icon: red }).addTo(mapreceiver)

        control.spliceWaypoints(1, 1, rlatlng);

        var var2;
        control.on('routesfound', function(e) {
            var routes = e.routes;
            var2 = routes[0].summary;
            if (var2['totalDistance'] <= 25000) {
                $("#mapreceiver").css("border", "none");
                marker2.bindPopup("<b>Receiver Location</b><br>").openPopup()
                Livewire.emit('pricing', var2);
            } else {
                Livewire.emit('pricing', -1);
                $("#mapreceiver").css("border", "4px solid red");
                marker2.bindPopup("<b style='color:red'> too far !</b><br>").openPopup();
            }

        });


        // document.getElementById("r_latitude").value = rla;
        // document.getElementById("r_longitude").value = rlo;


        gcs.reverse().latlng(slatlng).language("fr").run((err, res) => {
            if (err) return;
            if (marker2) {
                mapreceiver.removeLayer(marker2);
            }
            marker2 = L.marker(rlatlng, { icon: red }).addTo(mapreceiver).bindPopup(res.address.Match_addr).openPopup();
            Livewire.emit('saveNeweMap', rla, rlo, res.address.Match_addr);


        });

    }

    if (click == 1) {
        mapreceiver.on('click', getLocal);
    }


}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function update_maps(slo = null, sla = null, click = 1, pick = 0) {
    // sender MAP
    document.getElementById('update_map').innerHTML = "<div id='map' style=' height: 500px;z-index: 1'></div>";

    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map('map');

    ///////////////////////////////////////////////////////////////////
    if (sla != null) {
        map.setView([sla, slo], 15)
    } else {
        map.setView([30.4186991, -9.5562328], 13)
    }

    ///////////////////////////////////////////////////////////////////

    var layer = L.tileLayer.wms("https://geoserver.sys.infodat.com/geoserver/wms", {
        layers: `${workspace}:${layer_name}`,
        format: "image/png",
        transparent: true,
        attribution: "SADIK SAJID",
    });

    layer.addTo(map);;

    var marker;

    if (sla != null && slo != null) {
        var slatlng = L.latLng(sla, slo);
        marker = L.marker(slatlng).addTo(map).bindPopup("<b>Your Location</b>").openPopup();
    }

    /////////////////////////////////////////////////////////////////
    if (click == 1) {
        map.on('click', getLocal);
    }

    if (pick == 1) {


        if ("geolocation" in navigator) { //check geolocation available
            //try to get user current location using getCurrentPosition() method
            navigator.geolocation.getCurrentPosition(function(position) {
                var nlatlng = L.latLng(position.coords.latitude, position.coords.longitude);
                var gcs = L.esri.Geocoding.geocodeService();

                gcs.reverse().latlng(nlatlng).language("fr").run((err, res) => {
                    if (err) return;
                    if (marker) {
                        map.removeLayer(marker);
                    }
                    marker = L.marker(nlatlng, { icon: red }).addTo(map).bindPopup(res.address.Match_addr).openPopup();

                    Livewire.emit('saveUpdateMap', position.coords.latitude, position.coords.longitude, res.address.Match_addr);
                });
                // markeer = L.marker(slatlng).addTo(map).bindPopup("<b>Your Location</b>").openPopup();

            });
        }
    }


    function getLocal(e) {
        var nla = e.latlng.lat;
        var nlo = e.latlng.lng;
        // Livewire.emit('getlocal', [rla,rlo]);

        var nlatlng = L.latLng(nla, nlo);

        var gcs = L.esri.Geocoding.geocodeService();

        gcs.reverse().latlng(nlatlng).language("fr").run((err, res) => {
            if (err) return;
            if (marker) {
                map.removeLayer(marker);
            }
            marker = L.marker(nlatlng, { icon: red }).addTo(map).bindPopup("<b>New Location</b>")
            Livewire.emit('saveUpdateMap', nla, nlo, res.address.Match_addr);

        });




    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function update_maps_rout(slo = null, sla = null, rlo = null, rla = null, click = 1, is_express = 1, max_distance = 25000) {
    // sender MAP
    document.getElementById('update_map').innerHTML = "<div id='map' style=' height: 500px;z-index: 1'></div>";

    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map('map');

    ///////////////////////////////////////////////////////////////////
    if (sla != null) {
        map.setView([sla, slo], 13)
    } else {
        map.setView([30.4186991, -9.5562328], 13)
    }

    ///////////////////////////////////////////////////////////////////

    var layer = L.tileLayer.wms("https://geoserver.sys.infodat.com/geoserver/wms", {
        layers: `${workspace}:${layer_name}`,
        format: "image/png",
        transparent: true,
        attribution: "SADIK SAJID",
    });

    layer.addTo(map);;

    var marker2;


    if (sla != null && slo != null) {
        var slatlng = L.latLng(sla, slo);
        var rlatlng = L.latLng(rla, rlo);

        marker2 = L.marker(rlatlng, { icon: red }).addTo(map).bindPopup("<b>Receiver Location</b><br>").openPopup();
        L.marker(slatlng).addTo(map).bindPopup("<b>Your Location</b>").openPopup();
    }

    /////////////////////////////////////////////////////////////////
    if (click == 1) {
        map.on('click', getLocal);
    }


    var control = L.Routing.control(L.extend(window.lrmConfig, {

        createMarker: function(i, wp, nWps) {
            return
        },

        waypoints: [
            slatlng,
            rlatlng
        ],
        geocoder: L.Control.Geocoder.nominatim(),
        routeWhileDragging: true,
        reverseWaypoints: true,
        showAlternatives: true,
        altLineOptions: {
            styles: [
                { color: 'black', opacity: 0.15, weight: 9 },
                { color: 'white', opacity: 0.8, weight: 6 },
                { color: 'blue', opacity: 0.5, weight: 2 }
            ]
        }

    })).addTo(map);

    control._container.style.display = "None";

    if (rla != null && rlo != null && sla != null && slo != null && is_express == true) {
        control.on('routesfound', function(e) {
            var routes = e.routes;
            var2 = routes[0].summary;

            if (var2['totalDistance'] <= max_distance) {
                $("#update_map").css("border", "none");
                marker2.bindPopup("<b>Receiver Location</b><br>").openPopup()
                Livewire.emit('pricing', var2);
            } else {
                Livewire.emit('pricing', -1);
                $("#update_map").css("border", "4px solid red");
                marker2.bindPopup("<b style='color:red'> too far !</b><br>").openPopup();
            }

        });
    }

    function getLocal(e) {
        var rla = e.latlng.lat;
        var rlo = e.latlng.lng;

        var rlatlng = L.latLng(rla, rlo);

        if (marker2) {
            map.removeLayer(marker2);
        }

        marker2 = L.marker(rlatlng, { icon: red }).addTo(map)

        control.spliceWaypoints(1, 1, rlatlng);

        var var2;

        control.on('routesfound', function(e) {
            var routes = e.routes;
            var2 = routes[0].summary;
            if (var2['totalDistance'] <= 25000 || is_express == false) {
                $("#update_map").css("border", "none");
                marker2.bindPopup("<b>Receiver Location</b><br>").openPopup()
                Livewire.emit('pricing', var2);
            } else {
                Livewire.emit('pricing', -1);
                $("#update_map").css("border", "4px solid red");
                marker2.bindPopup("<b style='color:red'> too far !</b><br>").openPopup();
            }

        });



        Livewire.emit('saveUpdateMap', rla, rlo);



    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getKm(slo, sla, rlo, rla) {
    // sender MAP
    document.getElementById('mapkm').innerHTML = "<div id='map' ></div>";

    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map('map');
    var rlatlng = L.latLng(rla, rlo);
    var slatlng = L.latLng(sla, slo);

    var layer = L.tileLayer.wms("https://geoserver.sys.infodat.com/geoserver/wms", {
        layers: `${workspace}:${layer_name}`,
        format: "image/png",
        transparent: true,
        attribution: "SADIK SAJID",
    });

    layer.addTo(map);;

    var control = L.Routing.control(L.extend(window.lrmConfig, {

        createMarker: function(i, wp, nWps) {
            return
        },

        waypoints: [
            slatlng,
            rlatlng
        ],
        geocoder: L.Control.Geocoder.nominatim(),
        routeWhileDragging: true,
        reverseWaypoints: true,
        showAlternatives: true,
        altLineOptions: {
            styles: [
                { color: 'black', opacity: 0.15, weight: 9 },
                { color: 'white', opacity: 0.8, weight: 6 },
                { color: 'blue', opacity: 0.5, weight: 2 }
            ]
        }

    })).addTo(map);

    control.on('routesfound', function(e) {
        var routes = e.routes;
        var2 = routes[0].summary;

        if (var2['totalDistance'] <= 25000) {
            Livewire.emit('pricing', var2);
        } else {
            Livewire.emit('pricing', -1);
        }

    });

}