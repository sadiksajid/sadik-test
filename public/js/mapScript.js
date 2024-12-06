//////////////////////////////////////////////////////////// function to add map to html div
function mapSetView(map_height) {

    document.getElementById('map-wrapper').innerHTML = "<div id='map' style=' height: " + map_height + "px!important;z-index: 1'></div>";

    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map('map');
    L.tileLayer('https://map.infodat.com/tile/{z}/{x}/{y}.png').addTo(map);

    var osm = L.tileLayer("https://map.infodat.com/tile/{z}/{x}/{y}.png"),
        mqi = L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}");

    var baseMaps = {

        "OpenStreetMap": osm,
        "Salatite": mqi
    };

    var overlays = { //add any overlays here

    };
    L.control.layers(baseMaps, overlays, { position: 'bottomleft' }).addTo(map);

    $('#map_modal').modal('show');
    $('#map_modal').on('shown.bs.modal', function (e) {
        map.invalidateSize(true)
    })

    return map;
}

//////////////////////////////////////////////////////////// fuction to add marker to map 

function addMarkerToMap(map, la, lo, icon = 0, name = 'No Name', type = '') {
    var latLng = L.latLng(la, lo);
    marker = L.marker(latLng).addTo(map);

    if (icon != 0) {
        marker.setIcon(icon);
    }
    if (name == null) {
        name = 'Location';
    }
    marker.bindPopup("<b>" + type + "</b><br>" + name).openPopup()

    return [latLng, marker];
}

///////////////////////////////////////////////////////////////// function to set rout map

function setRoutMap(map, from_latlng, to_latlng) {

    var control = L.Routing.control(L.extend(window.lrmConfig, {

        createMarker: function (i, wp, nWps) {

            return

        },

        waypoints: [
            from_latlng,
            to_latlng
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
    return control;
}


///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// check location in country

function checkLocation(lo, la) {

    // $.ajaxSetup({

    //     headers: {

    //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

    //     }

    // });

    // var response;
    // $.ajax({
    //     type: 'GET',
    //     dataType: 'json',
    //     async: false,
    //     url: "/api/checkLocalMap/" + lo + "/" + la,
    //     success: function (resultData) {
    //         response = resultData
    //     }
    // });d

    return 1

}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// function on click on the map 

function getLocalClick(e, map, control, fix_latlng = null, marker, name, type, is_express, max_km) {

    var la = e.latlng.lat;
    var lo = e.latlng.lng;
    var gcs = L.esri.Geocoding.geocodeService();
    var address;
    var summary;
    var latlng;
    var local = {};
    var in_maps;
    local.longitude = lo;
    local.latitude = la;
    local.type = type;

    if (marker) {
        map.removeLayer(marker);
        ind = 1;
    }
    result = addMarkerToMap(map, la, lo, red, name, type);
    latlng = result[0];
    marker = result[1];
    in_maps = checkLocation(lo, la);

    if (in_maps != 0) {
        $("#map-wrapper").css("border", "none");

        if (control == undefined && fix_latlng != null) {
            control = setRoutMap(map, fix_latlng, latlng);
        }

        if (control != undefined) {

            control.spliceWaypoints(1, 1, latlng);


            control.on('routesfound', function (e) {
                var routes = e.routes;
                summary = routes[0].summary;
                console.log(is_express);

                if (is_express == 1) {
                    if (summary['totalDistance'] <= max_km) {
                        $("#map-wrapper").css("border", "none");
                    } else {
                        $("#map-wrapper").css("border", "4px solid red");
                        marker.bindPopup("<b style='color:red'> too far !</b><br>").openPopup();
                    }
                }

                gcs.reverse().latlng(latlng).language("fr").run((err, res) => {
                    if (err) return;
                    address = res.address;
                    local.address = address;

                    data = {
                        location: {
                            latitude: local.latitude,
                            longitude: local.longitude
                        },
                        address: address,
                        summary: summary,
                        type: type
                    };

                    Livewire.emit('getRoutInfo', data);
                    Livewire.emit('getlocal', local);


                });
            });


        } else {
            gcs.reverse().latlng(latlng).language("fr").run((err, res) => {
                if (err) return;
                local.address = res.address;
                Livewire.emit('getlocal', local);
            });
        }



    } else {
        $("#map-wrapper").css("border", "4px solid red");
        marker.bindPopup("<b style='color:red'> Local Not in morocco !</b><br>").openPopup();
    }

    return [latlng, marker, control];


}
/////////////////////////////////////////////////////////////////////set view map 
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setViewMap(map, from_la, from_lo, to_la, to_lo) {

    if (from_la != null) {
        map.setView([from_la, from_lo], 13)
    } else if (to_la != null) {
        map.setView([to_la, to_lo], 13)
    } else {
        map.setView([30.4186991, -9.5562328], 13)
    }
}


function pickGPS(type, fon) {
    var local = {};

    if ("geolocation" in navigator) { //check geolocation available
        //try to get user current location using getCurrentPosition() method

        navigator.geolocation.getCurrentPosition(function (position) {

            var gcs = L.esri.Geocoding.geocodeService();
            var latlng = L.latLng(position.coords.latitude, position.coords.longitude);
            // result = addMarkerToMap(map, change_la, position.coords.longitude, red, change_name, change_type);
            local.longitude = position.coords.longitude;
            local.latitude = position.coords.latitude;


            gcs.reverse().latlng(latlng).language("fr").run((err, res) => {
                if (err) return;

                local.type = type;
                local.address = res.address;
                Livewire.emit('getlocal', local);

            });
            fon(local)
        });

    }

}



function maps_change_loacal_calcul_price(data) {

    var fix_la = data.fix_la ?? null
    var fix_lo = data.fix_lo ?? null;
    var fix_name = data.fix_name ?? 'No Name';
    var change_la = data.change_la ?? null;
    var change_lo = data.change_lo ?? null;
    var change_name = data.change_name ?? 'No Name';
    var change_type = data.change_type ?? '';
    var fix_type = data.fix_type ?? '';
    var is_express = data.is_express ?? 0;
    var max_km = data.max_km ?? 25000;
    var map_height = data.map_height ?? 400;
    var pick = data.pick ?? false;
    var click = data.click ?? true;

    var map = mapSetView(map_height)

    if (click == true) {
        map.on('click', getLocal);
    }

    var result, marker, marker_change, fix_latlng, change_latlng, control;

    ///////////////////////// pick from gps on map 
    // if (pick == true) {
    //     val = pickGPS(change_type, function val(result) {
    //         change_la = result.latitude
    //         change_lo = result.longitude
    //     });
    //     while (change_la == undefined) {
    //         await sleep(10);
    //     }
    // }
    ///////////////////////
    ////////////////////////////////// pick on the maps 
    if (fix_la != null && fix_lo != null) {
        result = addMarkerToMap(map, fix_la, fix_lo, 0, fix_name, fix_type);
        fix_latlng = result[0];
        marker = result[1];
    } else {
        fix_latlng = null;
    }

    if (change_la != null && change_lo != null) {
        result = addMarkerToMap(map, change_la, change_lo, red, change_name, change_type);
        change_latlng = result[0];
        marker_change = result[1];
    } else {
        change_latlng = null;
    }
    ////////////////////////////////// end  pick on the maps 

    ////////////////////////////////// start  pick on the maps 

    if (fix_latlng != null && change_latlng != null) {
        control = setRoutMap(map, fix_latlng, change_latlng);
    }

    function getLocal(e) {
        result = getLocalClick(e, map, control, fix_latlng, marker_change, change_name, change_type, is_express, max_km)
        change_latlng = result[0];
        marker_change = result[1];
        control = result[2];

    }

    setViewMap(map, fix_la, fix_lo, change_la, change_lo)

}

