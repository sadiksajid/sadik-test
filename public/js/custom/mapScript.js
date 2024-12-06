//////////////////////////////////////////////////////////// function to add map to html div
function fullScreenMap(map_height) {
    if ($("#map-wrapper").css("position") == "fixed") {
        $("#map-wrapper").css({
            position: "relative",
            height: map_height,
            "z-index": "1",
        });
        $("#map").css({ height: map_height });
    } else {
        $("#map-wrapper").css({
            position: "fixed",
            height: "100%",
            width: "100%",
            "z-index": "10000",
            top: "0",
            left: "0",
        });
        $("#map").css({ height: "100%" });
    }
}

function mapSetView(map_height, click_to_drag) {
    var div = document.getElementById("map-wrapper");
    div.innerHTML =
        "<div id='map' style=' height: " +
        map_height +
        " !important;z-index: 1'></div>";

    if (click_to_drag == true && document.getElementById("swith_map") == null) {
        div.parentElement.insertAdjacentHTML(
            "beforeBegin",
            "<div  style='position: absolute;z-index: 3;width: 100%;'><label class='switch' style='float: inline-end;margin: 10px;'><input id='swith_map' onchange='ClickToDrag(this.checked)' type='checkbox' ><span class='slider round'></span></label></div>"
        );
        ClickToDrag(false);
    }
    var container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        touchRotate: true,
        // dragging: !L.Browser.mobile,
        rotateControl: {
            closeOnZeroBearing: false,
        },
    });

    map.touchRotate.enable();

    // L.Rotate.debug(map);
    //////////////////////////////////////////////////////////
    // var workspace = "osm";
    // var layer_name = "osm";
    // var layer = L.tileLayer.wms(
    //     "https://geoserver.sys.infodat.com/geoserver/wms", {
    //         layers: `${workspace}:${layer_name}`,
    //         format: "image/png",
    //         transparent: true,
    //         attribution: "SADIK SAJID",
    //     }
    // );
    // var layer = L.tileLayer(
    //     "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    // );

    // layer.addTo(map);

    var workspace = "osm";
    var layer_name = "osm";
    var layer = L.tileLayer.wms(
        "https://geoserver.sys.infodat.com/geoserver/wms", {
            layers: `${workspace}:${layer_name}`,
            format: "image/png",
            transparent: true,
            attribution: "",
        }
    );
    layer.addTo(map);



    // var layer_name2 = "osm_test";
    // var layer2 = L.tileLayer.wms(
    //     "https://geoserver.sys.infodat.com/geoserver/wms",
    //     {
    //         layers: `${workspace}:${layer_name2}`,
    //         format: "image/png",
    //         transparent: true,
    //         attribution: "SADIK SAJID",
    //         zIndex: 1000,
    //         pane: 'overlayPane'
    //     }
    // );

    var osm = layer,
        mqi = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        );
    // var groupLayer = L.layerGroup([]);
    // groupLayer.addLayer(layer2.bringToFront());
    // groupLayer.addLayer(mqi.bringToBack());
    // groupLayer.addTo(map);

    var baseMaps = {
        OpenStreetMap: osm,
        // test: groupLayer,
        Salatite: mqi,
    };

    var overlays = {
        //add any overlays here
    };
    L.control.layers(baseMaps, overlays, { position: "bottomleft" }).addTo(map);

    const searchControl = L.esri.Geocoding.geosearch({
        position: "topright",
        placeholder: "Enter an address or place e.g. 1 York St",
        useMapBounds: false,
    }).addTo(map);
    const results = L.layerGroup().addTo(map);

    searchControl.on("results", function(data) {
        results.clearLayers();
        for (let i = data.results.length - 1; i >= 0; i--) {
            var info = Array();
            info["from_la"] = data.results[i].latlng.lat;
            info["from_lo"] = data.results[i].latlng.lng;
            info["map"] = map;
            setViewMap(info);
            // results.addLayer(L.marker(data.results[i].latlng));
        }
    });

    L.easyButton("fa-arrows-alt", function(btn, map) {
        fullScreenMap(map_height);
        map.invalidateSize(true);
    }).addTo(map);

    L.easyButton("fa-ban", function(btn, map) {
        if (map.dragging._enabled === false) {
            map.dragging.enable();
        } else {
            map.dragging.disable();
        }
    }).addTo(map);


    setTimeout(() => {
        map.invalidateSize(true);
    }, 200);



    return map;
}

//////////////////////////////////////////////////////////// fuction to add marker to map

function addMarkerToMap(data) {
    var map = data["map"];
    var la = data["la"];
    var lo = data["lo"];
    var icon = data["icon"] ?? 0;
    var name = data["name"] ?? "No Name";
    var type = data["type"] ?? "";
    var draggable = data["draggable"] ?? false;
    var zoom = data["zoom"] ?? false;

    var latLng = L.latLng(la, lo);

    // map.setView(new L.latLng(la, lo), 30);

    marker = L.marker(latLng, {
        draggable: draggable,
    }).addTo(map);

    if (icon != 0) {
        marker.setIcon(icon);
    }
    if (name == null) {
        name = "Location";
    }
    marker.bindPopup("<b>" + type + "</b><br>" + name).openPopup();
    map.invalidateSize();

    if (zoom == true) {
        setTimeout(function() {
            map.flyTo(latLng, 18)
        }, 1000);
    }


    return [latLng, marker];
}

///////////////////////////////////////////////////////////////// function to set rout map

function setRoutMap(data) {
    var map = data["map"];
    var from_latlng = data["from_latlng"];
    var to_latlng = data["to_latlng"];
    var locations = data["locations"] ?? null;
    var sort = data["sort"] ?? null;
    var color = data["color"] ?? "red";
    var points;

    if (locations != null) {
        points = locations;
        if (sort != null) {
            points = sort.map(function(item) {
                return points[item];
            });
        }
    } else {
        points = [from_latlng, to_latlng];
    }
    var control = L.Routing.control(
        L.extend(window.lrmConfig, {
            createMarker: function(i, wp, nWps) {
                return;
            },

            waypoints: points,
            geocoder: L.Control.Geocoder.nominatim(),

            lineOptions: {
                styles: [{ color: color, opacity: 0.8, weight: 3 }],
            },
            altLineOptions: {
                styles: [
                    { color: "black", opacity: 0.15, weight: 9 },
                    { color: "white", opacity: 0.8, weight: 6 },
                    { color: "blue", opacity: 0.5, weight: 2 },
                ],
            },
        })
    ).addTo(map);

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

    // var response ;
    // $.ajax({
    //     type: 'GET',
    //     dataType: 'json',
    //     async: false,
    //     url: "/api/checkLocalMap/" + lo + "/" + la,
    //     success: function (resultData) {
    //         response =  resultData
    //     }
    // });

    // return response
    return 1;
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// function on click on the map

function zoom(data) {
    map = data["map"];
    x = data["x"];
    y = data["y"];
    px = data["px"];
    py = data["py"];
    layers = data["layers"];

    var currentZoom = map.getZoom();

    //Update X and Y based on zoom level

    var n;
    switch (true) {
        case currentZoom <= 11:
            n = 0.2;
            break;
        case currentZoom > 11 && currentZoom <= 12:
            n = 0.3;
            break;
        case currentZoom > 12 && currentZoom <= 13:
            n = 0.4;
            break;

        case currentZoom > 13 && currentZoom <= 14:
            n = 0.5;
            break;
        case currentZoom > 14 && currentZoom <= 15:
            n = 0.6;
            break;

        case currentZoom > 15 && currentZoom <= 16:
            n = 0.7;
            break;

        case currentZoom > 16 && currentZoom <= 17:
            n = 0.8;
            break;

        default:
            n = 1;
    }

    var x1;
    var y1;
    var px1;
    var py1;

    map.removeLayer(layers);

    layers.eachLayer(function(layer) {
        x1 = x * n;
        y1 = y * n;

        px1 = px * n;
        py1 = py * n;
        var marker = layer.options.icon.options;
        marker.iconSize = [x1, y1];
        marker.iconAnchor = [px1, py1];
    });

    map.addLayer(layers);
}

function getLocalClick(data) {
    var e = data["e"];
    var map = data["map"];
    var control = data["control"];
    var marker = data["marker"] ?? null;
    var name = data["name"] ?? "name";
    var type = data["type"] ?? "sender";
    var max_km = data["max_km"] ?? null;
    var is_express = data["is_express"] ?? 0;
    var fix_latlng = data["fix_latlng"] ?? null;
    var local_index = data["local_index"] ?? 0;
    var drag_lo = data["drag_lo"] ?? null;
    var drag_la = data["drag_la"] ?? null;
    var drag_LatLng = data["drag_LatLng"] ?? null;
    var draggable = data["draggable"] ?? false;
    var is_new = data["is_new"] ?? true;
    var delete_rout = data["delete_rout"] ?? false;

    var gcs = L.esri.Geocoding.geocodeService();
    var address;
    var summary;
    var latlng;
    var local = {};
    var in_maps;

    if (drag_lo == null) {
        var la = e.latlng.lat;
        var lo = e.latlng.lng;
    } else {
        var la = drag_la;
        var lo = drag_lo;
    }

    local.longitude = lo;
    local.latitude = la;
    local.type = type;
    local.local_index = local_index;
    local.is_new = is_new;

    in_maps = checkLocation(lo, la);
    if (in_maps != 0) {
        if (marker && drag_lo == null) {
            map.removeLayer(marker);
        }

        var data = [];
        data["map"] = map;
        data["la"] = la;
        data["lo"] = lo;
        data["icon"] = red;
        data["name"] = name;
        data["type"] = type;
        data["local_index"] = local_index;
        data["draggable"] = draggable;

        if (drag_lo == null) {
            result = addMarkerToMap(data);
            latlng = result[0];
            marker = result[1];
        } else {
            latlng = drag_LatLng;
        }

        $("#map-wrapper").css("border", "none");

        if (control == undefined && fix_latlng != null) {
            var data = [];
            data["map"] = map;
            data["from_latlng"] = fix_latlng;
            data["to_latlng"] = latlng;
            control = setRoutMap(data);
        }
        if (control != undefined) {
            if (drag_LatLng != null || delete_rout == true) {
                control.spliceWaypoints(1, 1, latlng);
            }

            control.on("routesfound", function(e) {
                var routes = e.routes;
                summary = routes[0].summary;

                if (is_express == 1) {
                    if (summary["totalDistance"] <= max_km) {
                        $("#map-wrapper").css("border", "none");
                    } else {
                        $("#map-wrapper").css("border", "4px solid red");
                        marker
                            .bindPopup(
                                "<b style='color:red'> too far !</b><br>"
                            )
                            .openPopup();
                    }
                }

                gcs.reverse()
                    .latlng(latlng)
                    .language("fr")
                    .run((err, res) => {
                        if (err) return;
                        address = res.address;
                        local.address = address;

                        data = {
                            location: {
                                latitude: local.latitude,
                                longitude: local.longitude,
                            },
                            address: address,
                            summary: summary,
                            type: type,
                        };
                        Livewire.emit("getRoutInfo", data);
                        Livewire.emit("getlocal", local);
                    });
            });
        } else {
            gcs.reverse()
                .latlng(latlng)
                .language("fr")
                .run((err, res) => {
                    if (err) return;
                    local.address = res.address;

                    Livewire.emit("getlocal", local);
                });
        }
    } else {
        $("#map-wrapper").css("border", "4px solid red");
        marker
            .bindPopup("<b style='color:red'> Local Not in morocco !</b><br>")
            .openPopup();
    }

    return { latlng: latlng, marker: marker, control: control };
}
/////////////////////////////////////////////////////////////////////set view map
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////
function setViewMap(data) {
    var map = data["map"];
    var from_la = data["from_la"] ?? null;
    var from_lo = data["from_lo"] ?? null;
    var to_la = data["to_la"] ?? null;
    var to_lo = data["to_lo"] ?? null;

    if (from_la != null) {
        map.setView([from_la, from_lo], 13);
    } else if (to_la != null) {
        map.setView([to_la, to_lo], 13);
    } else {
        map.setView([30.4186991, -9.5562328], 13);
    }
}

function pickGPS(type, fon) {
    var local = {};

    if ("geolocation" in navigator) {
        //check geolocation available
        //try to get user current location using getCurrentPosition() method

        navigator.geolocation.getCurrentPosition(function(position) {
            var gcs = L.esri.Geocoding.geocodeService();
            var latlng = L.latLng(
                position.coords.latitude,
                position.coords.longitude
            );
            local.longitude = position.coords.longitude;
            local.latitude = position.coords.latitude;

            gcs.reverse()
                .latlng(latlng)
                .language("fr")
                .run((err, res) => {
                    if (err) return;

                    local.type = type;
                    local.address = res.address;
                    Livewire.emit("getlocal", local);
                });
            fon(local);
        });
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function maps_change_loacal_calcul_price(data) {
    var fix_la = data.fix_la ?? null;
    var fix_lo = data.fix_lo ?? null;
    var fix_name = data.fix_name ?? "No Name";
    var change_la = data.change_la ?? null;
    var change_lo = data.change_lo ?? null;
    var change_name = data.change_name ?? "No Name";
    var change_type = data.change_type ?? "";
    var change_icon = data.change_icon ?? red;

    var fix_type = data.fix_type ?? "";
    var fix_icon = data.fix_icon ?? 0;
    var is_express = data.is_express ?? 0;
    var max_km = data.max_km ?? 25000;
    var map_height = data.map_height ?? "100%";
    var pick = data.pick ?? false;
    var click = data.click ?? true;
    var click_to_drag = data.click_to_drag ?? false;
    var draggable = data.draggable ?? false;
    var zoom = data.zoom ?? false;

    var map = mapSetView(map_height, click_to_drag);
    // data["map"] = map;
    if (click == true) {
        map.on("click", getLocal);
    }
    var result, marker, marker_change, fix_latlng, change_latlng, control;
    // ///////////////////////// pick from gps on map
    // // if (pick == true) {
    // //     val = pickGPS(change_type, function val(result) {
    // //         change_la = result.latitude
    // //         change_lo = result.longitude
    // //     });
    // //     while (change_la == undefined) {
    // //         await sleep(10);
    // //     }
    // // }
    // ///////////////////////
    // ////////////////////////////////// pick on the maps
    if (fix_la != null && fix_lo != null) {
        var data = [];
        data["map"] = map;
        data["la"] = fix_la;
        data["lo"] = fix_lo;
        data["icon"] = fix_icon;
        data["name"] = fix_name;
        data["type"] = fix_type;
        data["zoom"] = zoom;

        result = addMarkerToMap(data);
        fix_latlng = result[0];
        marker = result[1];
    } else {
        fix_latlng = null;
    }

    if (change_la != null && change_lo != null) {
        var data = [];
        data["map"] = map;
        data["la"] = change_la;
        data["lo"] = change_lo;
        data["icon"] = change_icon;
        data["name"] = change_name;
        data["type"] = change_type;
        data["draggable"] = draggable;
        data["zoom"] = zoom;

        result = addMarkerToMap(data);



        change_latlng = result[0];
        marker_change = result[1];
        marker_change.on("dragend", function(e) {
            drag(e);
        });
    } else {
        change_latlng = null;
    }
    ////////////////////////////////// end  pick on the maps

    ////////////////////////////////// start  pick on the maps

    if (fix_latlng != null && change_latlng != null) {
        data["map"] = map;
        data["from_latlng"] = fix_latlng;
        data["to_latlng"] = change_latlng;

        control = setRoutMap(data);
        if (is_express == 1) {
            control.on("routesfound", function(e) {
                var routes = e.routes;
                summary = routes[0].summary;

                Livewire.emit("routingInfo", summary);
            });
        }
    }

    function getLocal(e) {
        var data = [];
        data["e"] = e;
        data["map"] = map;
        data["control"] = control;
        data["fix_latlng"] = fix_latlng;
        data["marker"] = marker_change;
        data["name"] = change_name;
        data["type"] = change_type;
        data["is_express"] = is_express;
        data["max_km"] = max_km;
        data["delete_rout"] = true;
        data["draggable"] = draggable;

        result = getLocalClick(data);
        change_latlng = result["latlng"];
        marker_change = result["marker"];
        control = result["control"];
        marker_change.on("dragend", function(e) {
            drag(e);
        });
    }

    function drag(e) {
        var marker = e.target;
        var position = marker.getLatLng();

        data["drag_lo"] = position.lng;
        data["drag_la"] = position.lat;
        data["drag_LatLng"] = new L.LatLng(position.lat, position.lng);
        data["e"] = e;
        data["map"] = map;
        data["control"] = control;
        data["fix_latlng"] = fix_latlng;
        data["marker"] = marker_change;
        data["name"] = change_name;
        data["type"] = change_type;
        data["is_express"] = is_express;
        data["max_km"] = max_km;
        data["delete_rout"] = true;

        result = getLocalClick(data);
        change_latlng = result["latlng"];
        control = result["control"];
    }

    var data = [];
    data["map"] = map;
    data["from_la"] = fix_la;
    data["from_lo"] = fix_lo;
    data["to_la"] = change_la;
    data["to_lo"] = change_lo;

    setViewMap(data);
}

function ClickToDrag(is_remove) {
    if (is_remove == true) {
        document.getElementById("map_drag").remove();
    } else {
        var div = document.getElementById("map-wrapper");
        div.parentElement.insertAdjacentHTML(
            "beforeBegin",
            "<div  id='map_drag' class='row align-items-center m-0' style='width: 100%;height: 100%;background-color:rgba(0, 0, 255, 0.3);position: absolute;z-index: 2'><div class='col-6 mx-auto' style='text-align: center'><h1 style='font-size: 60px;color: white;'>Switch to Drag <i class='fa fa-mouse-pointer' data-toggle='tooltip' title='' data-original-title='fa fa-mouse-pointer'></i></h1></div></div>"
        );
    }
}

function GotoView(location) {
    data = [];
    data["map"] = map;
    data["from_la"] = location["latitude"];
    data["from_lo"] = location["longitude"];
    setViewMap(data);
}