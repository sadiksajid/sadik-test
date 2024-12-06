const { defaultsDeep } = require("lodash");

var is_sender = false;
///////////////// for order to courier
function maprouting(sla, slo, rla, rlo, rname, sname, cla = null, clo = null) {

    document.getElementById("map-wrapper").innerHTML =
        "<div id='map' style=' height: 400px!important;z-index: 1'></div>";

    var container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });

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
    layer.addTo(map);

    var osm = layer,
        mqi = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        );

    var baseMaps = {
        OpenStreetMap: osm,
        Salatite: mqi,
    };

    var overlays = {
        //add any overlays here
    };

    L.control.layers(baseMaps, overlays, { position: "bottomleft" }).addTo(map);

    var slatlng = L.latLng(sla, slo);
    var rlatlng = L.latLng(rla, rlo);

    L.marker(rlatlng, { icon: red })
        .addTo(map)
        .bindPopup("<b>Receiver</b><br>" + rname)
        .openPopup();
    L.marker(slatlng)
        .addTo(map)
        .bindPopup("<b>Sender</b><br>" + sname)
        .openPopup();

    if (cla != null) {
        var clatlng = L.latLng(cla, clo);
        L.marker(clatlng, { icon: moto })
            .addTo(map)
            .bindPopup("<b>Courier</b><br>")
            .openPopup();
    }

    var control = L.Routing.control(
        L.extend(window.lrmConfig, {
            createMarker: function(i, wp, nWps) {
                return;
            },

            waypoints: [slatlng, rlatlng],
            geocoder: L.Control.Geocoder.nominatim(),
            routeWhileDragging: true,
            reverseWaypoints: true,
            showAlternatives: true,
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

    L.Routing.errorControl(control).addTo(map);

}


///////////////// for add order / price calucle

function maprouting_admin_order(
    sla = null,
    slo = null,
    rla = null,
    rlo = null,
    rname = null,
    sname = null
) {
    document.getElementById("map-wrapper").innerHTML =
        "<div id='map' style=' height: 400px!important;z-index: 1'></div>";

    var container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }

    /////////////////////////////////////////////////////////////////////
    var map = L.map("map", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });

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
    layer.addTo(map);

    layer.addTo(map);

    if (sla != null && slo != null) {
        var slatlng = L.latLng(sla, slo);
        var rlatlng = null;
        L.marker(slatlng)
            .addTo(map)
            .bindPopup("<b>Sender</b><br>" + sname)
            .openPopup();
    }

    map.on("click", getLocal);

    /////////////////////////////////////////////////////////////////////

    var gcs = L.esri.Geocoding.geocodeService();

    var marker2;
    var ind = 0;

    var control = L.Routing.control(
        L.extend(window.lrmConfig, {
            createMarker: function(i, wp, nWps) {
                return;
            },

            waypoints: [slatlng, rlatlng],
            geocoder: L.Control.Geocoder.nominatim(),
            routeWhileDragging: true,
            reverseWaypoints: true,
            showAlternatives: true,
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

    function getLocal(e) {
        var rla = e.latlng.lat;
        var rlo = e.latlng.lng;
        Livewire.emit("getlocal", [rla, rlo]);

        var rlatlng = L.latLng(rla, rlo);

        if (marker2) {
            map.removeLayer(marker2);
            ind = 1;
        }
        marker2 = L.marker(rlatlng, { icon: red })
            .addTo(map)
            .bindPopup("<b>Receiver</b><br>")
            .openPopup();

        control.spliceWaypoints(1, 1, rlatlng);

        var var1;
        var var2;
        control.on("routesfound", function(e) {
            var routes = e.routes;
            var2 = routes[0].summary;
            gcs.reverse()
                .latlng(rlatlng)
                .language("fr")
                .run((err, res) => {
                    if (err) return;
                    var1 = res.address;
                    Livewire.emit("getlocalmap", [var1, var2]);
                });
        });
    }

    if (rla != null && rlo != null && sla != null && slo != null) {
        Livewire.emit("getlocal", [rla, rlo]);

        var rlatlng = L.latLng(rla, rlo);

        if (marker2) {
            map.removeLayer(marker2);
            ind = 1;
        }
        marker2 = L.marker(rlatlng, { icon: red })
            .addTo(map)
            .bindPopup("<b>Receiver</b><br>")
            .openPopup();

        control.spliceWaypoints(1, 1, rlatlng);

        var var1;
        var var2;
        control.on("routesfound", function(e) {
            var routes = e.routes;
            var2 = routes[0].summary;
            gcs.reverse()
                .latlng(rlatlng)
                .language("fr")
                .run((err, res) => {
                    if (err) return;
                    var1 = res.address;
                    Livewire.emit("getlocalmap", [var1, var2]);
                });
        });
    } else {
        if (sla != null) {
            map.setView([sla, slo], 13);
        } else if (rla != null) {
            map.setView([rla, rlo], 13);
        } else {
            map.setView([30.4186991, -9.5562328], 13);
        }
    }
}

function maprouting_get_address(name = "Sender Location") {
    document.getElementById("map-wrapper").innerHTML =
        "<div id='map' style=' height: 400px!important;z-index: 1'></div>";

    var container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });

    map.setView([30.4186991, -9.5562328], 13);

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
    layer.addTo(map);

    var osm = layer,
        mqi = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        );

    var baseMaps = {
        OpenStreetMap: osm,
        Salatite: mqi,
    };

    var overlays = {
        //add any overlays here
    };

    L.control.layers(baseMaps, overlays, { position: "bottomleft" }).addTo(map);

    map.on("click", getLocal);

    var marker2;

    function getLocal(e) {
        var sla = e.latlng.lat;
        var slo = e.latlng.lng;
        Livewire.emit("getlocalion", [sla, slo]);

        var latlng = L.latLng(sla, slo);

        if (marker2) {
            map.removeLayer(marker2);
            ind = 1;
        }
        marker2 = L.marker(latlng)
            .addTo(map)
            .bindPopup("<b>" + name + "</b><br>")
            .openPopup();
    }
}

function change_var(x) {
    if (x == 0) {
        is_sender = false;
        $("#sender_btn").css("background-color", "#B11433");
        $("#receiver_btn").css("background-color", "#17a2b8");
    } else {
        is_sender = true;
        $("#receiver_btn").css("background-color", "#B11433");
        $("#sender_btn").css("background-color", "#17a2b8");
    }
}

function change_var2(x) {
    $("#receiver_btn").toggleClass("selected");
    $("#sender_btn").toggleClass("selected_b");
    if (x == 0) {
        is_sender = false;
    } else {
        is_sender = true;
    }
}

function maprouting_get_address_calcul(
    name = "Sender Location",
    height = 400,
    locals = null,
    view_lo = null,
    view_la = null
) {
    document.getElementById("map-wrapper2").innerHTML =
        "<div id='map2' style=' height:" +
        height +
        "px!important;z-index: 1'></div>";
    var container = L.DomUtil.get("map2");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map2", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });

    var workspace = "osm";
    var layer_name = "osm";
    if (view_lo != null) {
        map.setView([view_la, view_lo], 13);
    } else {
        map.setView([30.4186991, -9.5562328], 13);
    }

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
    layer.addTo(map);

    var osm = layer,
        mqi = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        );

    var baseMaps = {
        OpenStreetMap: osm,
        Salatite: mqi,
    };

    var overlays = {
        //add any overlays here
    };

    L.control.layers(baseMaps, overlays, { position: "bottomleft" }).addTo(map);

    map.on("click", getLocal);

    var marker3;
    var marker2;

    var sla;
    var slo;
    var rla;
    var rlo;

    var slatlng;
    var rlatlng;

    var control;

    if (locals != null) {
        var polygon = L.polygon(locals, { color: "red" });
        polygon.addTo(map).showMeasurements();

        map.setView([locals[0][0], locals[0][1]], 13);
    }

    function getLocal(e) {
        if (is_sender == undefined || is_sender == false) {
            sla = e.latlng.lat;
            slo = e.latlng.lng;
            Livewire.emit("getlocalion", [sla, slo, "sender"]);

            slatlng = L.latLng(sla, slo);

            if (marker2) {
                map.removeLayer(marker2);
                ind = 1;
            }
            marker2 = L.marker(slatlng)
                .addTo(map)
                .bindPopup("<b>sender</b><br>")
                .openPopup();
            // $("#sender_btn").css("background-color", "#00ae23");
            // $("#sender_btn").text("Sender Location Picked");
            getMap();
        } else {
            rla = e.latlng.lat;
            rlo = e.latlng.lng;
            Livewire.emit("getlocalion", [rla, rlo, "receiver"]);

            rlatlng = L.latLng(rla, rlo);

            if (marker3) {
                map.removeLayer(marker3);
                ind = 1;
            }
            marker3 = L.marker(rlatlng, { icon: red })
                .addTo(map)
                .bindPopup("<b>receiver</b><br>")
                .openPopup();
            // $("#receiver_btn").css("background-color", "#00ae23");
            // $("#receiver_btn").text("Receiver Location Picked");

            getMap();
        }
    }

    function getMap(e) {
        if (rla != undefined && sla != undefined) {
            if (control != undefined) {
                map.removeControl(control);
            }

            control = L.Routing.control(
                L.extend(window.lrmConfig, {
                    createMarker: function(i, wp, nWps) {
                        return;
                    },

                    waypoints: [slatlng, rlatlng],
                    geocoder: L.Control.Geocoder.nominatim(),
                    routeWhileDragging: true,
                    reverseWaypoints: true,
                    showAlternatives: true,
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

            L.Routing.errorControl(control).addTo(map);

            var var2;
            control.on("routesfound", function(e) {
                var routes = e.routes;
                var2 = routes[0].summary;
                if (var2["totalDistance"] <= 25000) {
                    $("#map-wrapper2").css("border", "none");
                    marker3
                        .bindPopup("<b>Receiver Location</b><br>")
                        .openPopup();
                    Livewire.emit("getlocalmap", var2);
                } else {
                    $("#map-wrapper2").css("border", "4px solid red");
                    marker3
                        .bindPopup("<b style='color:red'> too far !</b><br>")
                        .openPopup();
                    Livewire.emit("getlocalmap", var2);
                }
            });
        }
    }
    return map;
}

function maprouting_get_address2(name = "Sender Location") {
    document.getElementById("map-wrapper2").innerHTML =
        "<div id='map2' style=' height: 400px!important;z-index: 1'></div>";

    var container = L.DomUtil.get("map2");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map2", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });

    map.setView([30.4186991, -9.5562328], 13);

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
    layer.addTo(map);

    map.on("click", getLocal);

    var marker2;

    function getLocal(e) {
        var sla = e.latlng.lat;
        var slo = e.latlng.lng;
        Livewire.emit("getaddresslocalion", [sla, slo]);

        var latlng = L.latLng(sla, slo);

        if (marker2) {
            map.removeLayer(marker2);
            ind = 1;
        }

        marker2 = L.marker(latlng)
            .addTo(map)
            .bindPopup("<b>" + name + "</b><br>")
            .openPopup();
    }
}

function maprouting_update_address(lo, la, name = "Sender Location") {
    document.getElementById("map-wrapper").innerHTML =
        "<div id='map' style=' height: 400px!important;z-index: 1'></div>";

    var container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });

    map.setView([la, lo], 13);

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
    layer.addTo(map);

    var osm = layer,
        mqi = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        );

    var baseMaps = {
        OpenStreetMap: osm,
        Salatite: mqi,
    };

    var overlays = {
        //add any overlays here
    };

    L.control.layers(baseMaps, overlays, { position: "bottomleft" }).addTo(map);

    map.on("click", getLocal);

    var marker2;
    marker2 = L.marker(L.latLng(la, lo))
        .addTo(map)
        .bindPopup("<b>" + name + "</b><br>")
        .openPopup();

    function getLocal(e) {
        var sla = e.latlng.lat;
        var slo = e.latlng.lng;
        Livewire.emit("getlocalion", [sla, slo]);

        var latlng = L.latLng(sla, slo);

        if (marker2) {
            map.removeLayer(marker2);
            ind = 1;
        }
        marker2 = L.marker(latlng)
            .addTo(map)
            .bindPopup("<b>" + "New " + name + "</b><br>")
            .openPopup();
    }
}

function maprouting_update_address2(lo, la, name = "Address Location") {
    document.getElementById("map-wrapper2").innerHTML =
        "<div id='map2' style=' height: 400px!important;z-index: 1'></div>";

    var container = L.DomUtil.get("map2");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map2", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });

    map.setView([la, lo], 13);

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
    layer.addTo(map);

    map.on("click", getLocal);

    var marker2;
    marker2 = L.marker(L.latLng(la, lo))
        .addTo(map)
        .bindPopup("<b>" + name + "</b><br>")
        .openPopup();

    function getLocal(e) {
        var sla = e.latlng.lat;
        var slo = e.latlng.lng;
        Livewire.emit("getaddresslocalion", [sla, slo]);

        var latlng = L.latLng(sla, slo);

        if (marker2) {
            map.removeLayer(marker2);
            ind = 1;
        }
        marker2 = L.marker(latlng)
            .addTo(map)
            .bindPopup("<b>" + "New " + name + "</b><br>")
            .openPopup();
    }
}

function get_distanse(sla, slo, array) {
    document.getElementById("map-hide").innerHTML =
        "<div id='maphide' style=' height: 0px' hidden ></div>";

    var container = L.DomUtil.get("maphide");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("maphide", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });

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
    layer.addTo(map);

    var osm = layer,
        mqi = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        );

    var baseMaps = {
        OpenStreetMap: osm,
        Salatite: mqi,
    };

    var overlays = {
        //add any overlays here
    };

    L.control.layers(baseMaps, overlays, { position: "bottomleft" }).addTo(map);

    var slatlng;
    var rlatlng = L.latLng(sla, slo);

    array.forEach((element) => {
        slatlng = L.latLng(element["latitude"], element["longitude"]);

        var control = L.Routing.control(
            L.extend(window.lrmConfig, {
                waypoints: [slatlng, rlatlng],
                geocoder: L.Control.Geocoder.nominatim(),

                routeWhileDragging: true,
            })
        ).addTo(map);

        control.on("routesfound", function(e) {
            var routes = e.routes;
            var2 = routes[0].summary;

            Livewire.emit("GetDistancelist", [
                var2.totalDistance,
                element["id"],
            ]);
        });
    });

    // Livewire.emit('GetDistancelist',locals);
}

/////////////////// the order standard functions
function maprouting_stantard(
    sla,
    slo,
    rla,
    rlo,
    dla = 0,
    dlo = 0,
    r_dla = 0,
    r_dlo = 0,
    rname,
    sname,
    cla = null,
    clo = null
) {
    document.getElementById("map-wrapper").innerHTML =
        "<div id='map' style=' height: 400px!important;z-index: 1'></div>";

    var container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });

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
    layer.addTo(map);

    var osm = layer,
        mqi = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        );

    var baseMaps = {
        OpenStreetMap: osm,
        Salatite: mqi,
    };

    var overlays = {
        //add any overlays here
    };

    L.control.layers(baseMaps, overlays, { position: "bottomleft" }).addTo(map);

    var slatlng = L.latLng(sla, slo);
    var rlatlng = L.latLng(rla, rlo);
    var dlatlng;

    if (dla != 0) {
        dlatlng = L.latLng(dla, dlo);
        L.marker(dlatlng, { icon: depot })
            .addTo(map)
            .bindPopup("<b>Depot</b><br>")
            .openPopup();
    } else {
        dlatlng = slatlng;
    }

    var r_dlatlng;

    L.marker(rlatlng, { icon: red })
        .addTo(map)
        .bindPopup("<b>Receiver</b><br>" + rname)
        .openPopup();
    L.marker(slatlng)
        .addTo(map)
        .bindPopup("<b>Sender</b><br>" + sname)
        .openPopup();

    if (r_dla != 0) {
        r_dlatlng = L.latLng(r_dla, r_dlo);
        L.marker(r_dlatlng, { icon: depot })
            .addTo(map)
            .bindPopup("<b>Depot</b><br>")
            .openPopup();
    } else {
        r_dlatlng = dlatlng;
    }

    if (cla != null) {
        var clatlng = L.latLng(cla, clo);
        L.marker(clatlng, { icon: moto })
            .addTo(map)
            .bindPopup("<b>Courier</b><br>")
            .openPopup();
    }

    var control = L.Routing.control(
        L.extend(window.lrmConfig, {
            createMarker: function(i, wp, nWps) {
                return;
            },

            waypoints: [slatlng, dlatlng, r_dlatlng, rlatlng],
            geocoder: L.Control.Geocoder.nominatim(),
            routeWhileDragging: true,
            reverseWaypoints: true,
            showAlternatives: true,
            lineOptions: {
                styles: [
                    { color: "black", opacity: 0.15, weight: 9 },
                    { color: "white", opacity: 0.8, weight: 6 },
                    { color: "blue", opacity: 0.5, weight: 2 },
                ],
            },
        })
    ).addTo(map);

    control._container.style.display = "None";

    L.Routing.errorControl(control).addTo(map);
}

function addr_search(addr) {
    var xmlhttp = new XMLHttpRequest();
    var url =
        "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
        addr;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
//////////////////////////////////////

function isMarkerInsidePolygon(marker, poly) {
    var inside = false;
    var x = marker.getLatLng().lat,
        y = marker.getLatLng().lng;
    var polyPoints = poly.geometry.coordinates[0];
    for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
        var xi = polyPoints[i][1],
            yi = polyPoints[i][0];
        var xj = polyPoints[j][1],
            yj = polyPoints[j][0];

        var intersect =
            yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }

    return inside;
}

function AllMaps(locals, depots, city = 0, polygon) {
    document.getElementById("map-wrapper").innerHTML =
        "<div id='map' style=' height: 680px!important;z-index: 1'></div>";

    var container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });

    if (city != 0) {
        map.setView([city["la"], city["lo"]], 13);
    } else {
        map.setView([30.4186991, -9.5562328], 13);
    }

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
    layer.addTo(map);

    var osm = layer,
        mqi = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        );

    var baseMaps = {
        OpenStreetMap: osm,
        Salatite: mqi,
    };

    var overlays = {
        //add any overlays here
    };

    L.control.layers(baseMaps, overlays, { position: "bottomleft" }).addTo(map);

    depots.forEach((element) => {
        var slatlng = L.latLng(element["latitude"], element["longitude"]);
        L.marker(slatlng, { icon: depot })
            .addTo(map)
            .bindPopup("<b>Depot</b><br>" + element["name"]);
    });

    var marker = [];
    ////////////// polygons end
    locals.forEach((element) => {
        var slatlng = L.latLng(element["latitude"], element["longitude"]);
        marker[element["o_id"]] = L.marker(slatlng)
            .addTo(map)
            .on("click", function() {
                if (element["x"] == 0) {
                    marker[element["o_id"]].setIcon(red);
                    element["x"] = 1;
                } else {
                    marker[element["o_id"]].setIcon(blue);
                    element["x"] = 0;
                }

                Livewire.emit("selectorder", [
                    element["o_id"],
                    element["o_sa"],
                ]);
            })
            .bindPopup("<b>Sender</b><br>" + element["name"]);

        if (element["x"] == 0) {
            marker[element["o_id"]].setIcon(blue);
        } else if (element["x"] == 1) {
            marker[element["o_id"]].setIcon(red);
        } else {
            marker[element["o_id"]].setIcon(green).openPopup();
        }
    });

    polygons = JSON.parse(polygon);
    polygons["features"].forEach((poly) => {
        var poly_map = L.geoJSON(poly);
        poly_map.setStyle({ fillColor: "#B4E0F2" });
        var points_in_poly = [];

        poly_map.addTo(map).on("click", function(e) {
            if (poly["selected"] == 0) {
                points_in_poly = [];
                poly_map.setStyle({ fillColor: "#f7941d" });
                poly["selected"] = 1;

                locals.forEach((element) => {
                    if (isMarkerInsidePolygon(marker[element["o_id"]], poly)) {
                        points_in_poly.push([
                            element["o_id"],
                            element["o_sa"],
                            poly["p_id"],
                        ]);

                        element["poly"] = poly["p_id"];
                        element["x"] = 1;

                        marker[element["o_id"]].setIcon(red);
                        element["x"] = 1;
                    }
                });

                Livewire.emit("selectorder_poly", points_in_poly);
            } else {
                points_in_poly = [];
                poly_map.setStyle({ fillColor: "#B4E0F2" });
                var n_local = locals.filter((x) => {
                    return x.poly == poly["p_id"];
                });

                n_local.forEach((element) => {
                    element["poly"] = -2;
                    element["x"] = 0;

                    points_in_poly.push([
                        element["o_id"],
                        element["o_sa"],
                        poly["p_id"],
                    ]);

                    marker[element["o_id"]].setIcon(blue);
                    element["x"] = 0;
                });
                Livewire.emit("unselectorder_poly", points_in_poly);
                poly["selected"] = 0;
            }
        });
    });
}

function courierOrder(orders, couriers, depots, polygon) {
    document.getElementById("map-wrapper").innerHTML =
        "<div id='map' style=' height: 680px!important;z-index: 1'></div>";

    var container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });
    map.setView([30.4186991, -9.5562328], 13);

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
    layer.addTo(map);

    var osm = layer,
        mqi = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        );

    var baseMaps = {
        OpenStreetMap: osm,
        Salatite: mqi,
    };

    var overlays = {
        //add any overlays here
    };

    L.control.layers(baseMaps, overlays, { position: "bottomleft" }).addTo(map);
    var marker2 = [];
    couriers.forEach((element, index) => {
        var slatlng = L.latLng(element["latitude"], element["longitude"]);
        marker2[index] = L.marker(slatlng, { icon: moto })
            .addTo(map)
            .on("click", function() {
                colorIcon(marker2, couriers);
                if (element["x"] == 0) {
                    marker2[index].setIcon(moto2);
                    element["x"] = 1;
                } else {
                    marker2[index].setIcon(moto);
                    element["x"] = 0;
                }
                Livewire.emit("selectCourier", element["c_id"]);
            })
            .bindPopup("<b>Courier</b><br>" + element["name"]);

        if (element["x"] == 0) {
            marker2[index].setIcon(moto);
        } else if (element["x"] == 1) {
            marker2[index].setIcon(moto2);
        } else {
            marker2[index].setIcon(green).openPopup();
        }
    });

    depots.forEach((element) => {
        var slatlng = L.latLng(element["latitude"], element["longitude"]);
        var marker2 = L.marker(slatlng, { icon: depot })
            .addTo(map)
            .bindPopup("<b>Depot</b><br>" + element["name"]);
    });

    orders.forEach((element) => {
        var slatlng = L.latLng(element["latitude"], element["longitude"]);
        var marker2 = L.marker(slatlng)
            .addTo(map)
            .bindPopup("<b>Sender</b><br>" + element["name"]);

        if (element["x"] == 1) {
            marker2.setIcon(green).openPopup();
        } else {
            marker2.setIcon(red);
        }
    });

    polygons = JSON.parse(polygon);
    polygons["features"].forEach((poly) => {
        var poly_map = L.geoJSON(poly);
        poly_map.setStyle({ fillColor: "#f7941d" });
        poly_map.addTo(map);
    });
}

function courierBundle(bundle, couriers, depots) {
    document.getElementById("map-wrapper").innerHTML =
        "<div id='map' style=' height: 680px!important;z-index: 1'></div>";

    var container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });
    map.setView([30.4186991, -9.5562328], 13);

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
    layer.addTo(map);

    var osm = layer,
        mqi = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        );

    var baseMaps = {
        OpenStreetMap: osm,
        Salatite: mqi,
    };

    var overlays = {
        //add any overlays here
    };

    L.control.layers(baseMaps, overlays, { position: "bottomleft" }).addTo(map);
    var marker2 = [];

    var slatlng = L.latLng(bundle["latitude"], bundle["longitude"]);
    var ma = L.marker(slatlng)
        .addTo(map)
        .bindPopup("<b>Sender</b><br>" + bundle["name"]);

    couriers.forEach((element, index) => {
        var slatlng = L.latLng(element["latitude"], element["longitude"]);
        marker2[index] = L.marker(slatlng, { icon: moto })
            .addTo(map)
            .on("click", function() {
                colorIcon(marker2, couriers);
                if (element["x"] == 0) {
                    marker2[index].setIcon(moto2);
                    element["x"] = 1;
                } else {
                    marker2[index].setIcon(moto);
                    element["x"] = 0;
                }
                Livewire.emit("selectCourier", element["c_id"]);
            })
            .bindPopup("<b>Courier</b><br>" + element["name"]);

        if (element["x"] == 0) {
            marker2[index].setIcon(moto);
        } else if (element["x"] == 1) {
            marker2[index].setIcon(moto2);
        } else {
            marker2[index].setIcon(green).openPopup();
        }
    });
}

function depotJob(bundle, couriers, depots) {
    document.getElementById("map-wrapper").innerHTML =
        "<div id='map' style=' height: 680px!important;z-index: 1'></div>";

    var container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });
    map.setView([30.4186991, -9.5562328], 13);

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
    layer.addTo(map);

    var osm = layer,
        mqi = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        );

    var baseMaps = {
        OpenStreetMap: osm,
        Salatite: mqi,
    };

    var overlays = {
        //add any overlays here
    };

    L.control.layers(baseMaps, overlays, { position: "bottomleft" }).addTo(map);
    var marker2 = [];

    depots.forEach((element, index) => {
        var slatlng = L.latLng(element["latitude"], element["longitude"]);
        marker2[index] = L.marker(slatlng, { icon: moto })
            .addTo(map)
            .on("click", function() {
                colorIcon(marker2, depots);
                if (element["x"] == 0) {
                    marker2[index].setIcon(moto2);
                    element["x"] = 1;
                } else {
                    marker2[index].setIcon(moto);
                    element["x"] = 0;
                }
                Livewire.emit("selectdepot", element["c_id"]);
            })
            .bindPopup("<b>Depot</b><br>" + element["name"]);

        if (element["x"] == 0) {
            marker2[index].setIcon(moto);
        } else if (element["x"] == 1) {
            marker2[index].setIcon(moto2);
        } else {
            marker2[index].setIcon(green).openPopup();
        }
    });

    couriers.forEach((element) => {
        var slatlng = L.latLng(element["latitude"], element["longitude"]);
        var marker2 = L.marker(slatlng, { icon: depot })
            .addTo(map)
            .bindPopup("<b>Depot</b><br>" + element["name"]);
    });

    var slatlng = L.latLng(bundle["latitude"], bundle["longitude"]);
    var marker2 = L.marker(slatlng)
        .addTo(map)
        .bindPopup("<b>Sender</b><br>" + bundle["name"]);

    if (bundle["x"] == 1) {
        marker2.setIcon(green).openPopup();
    } else {
        marker2.setIcon(red);
    }
}

function AllMapsBundles(locals, depots, agencies) {
    document.getElementById("map-wrapper").innerHTML =
        "<div id='map' style=' height: 680px!important;z-index: 1'></div>";

    var container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("map", {
        zoom: 11,
        minZoom: 5,
        maxZoom: 18,
        rotate: false,
        touchRotate: false,
    });

    map.setView([30.4186991, -9.5562328], 13);

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
    layer.addTo(map);

    var osm = layer,
        mqi = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        );

    var baseMaps = {
        OpenStreetMap: osm,
        Salatite: mqi,
    };

    var overlays = {
        //add any overlays here
    };

    L.control.layers(baseMaps, overlays, { position: "bottomleft" }).addTo(map);

    locals.forEach((element) => {
        var slatlng = L.latLng(element["latitude"], element["longitude"]);
        var marker = L.marker(slatlng)
            .addTo(map)
            .bindPopup("<b>Sender</b><br>" + element["name"]);
        if (element["x"] == 0) {
            marker.setIcon(blue);
        } else if (element["x"] == 1) {
            marker.setIcon(red);
        } else {
            marker.setIcon(green).openPopup();
        }
    });

    depots.forEach((element) => {
        var slatlng = L.latLng(element["latitude"], element["longitude"]);
        var marker2 = L.marker(slatlng).addTo(map);

        if (element["x"] == 0) {
            marker2.setIcon(depot).bindPopup("<b>Depot</b><br>");
        } else {
            marker2.setIcon(depot2).bindPopup("<b>Depot</b><br>");
        }
    });

    agencies.forEach((element) => {
        var slatlng = L.latLng(element["latitude"], element["longitude"]);
        var marker3 = L.marker(slatlng).addTo(map);

        if (element["x"] == 0) {
            if (element["type"] == "delivery_company") {
                marker3
                    .setIcon(st_Truck)
                    .bindPopup("<b>Delivery Company</b><br>" + element["name"]);
            } else {
                marker3
                    .setIcon(st_Bus)
                    .bindPopup("<b>Bus Agency</b><br>" + element["name"]);
            }
        } else {
            if (element["type"] == "delivery_company") {
                marker3
                    .setIcon(st_Truck2)
                    .bindPopup("<b>Delivery Company</b><br>" + element["name"]);
            } else {
                marker3
                    .setIcon(st_Bus2)
                    .bindPopup("<b>Bus Agency</b><br>" + element["name"]);
            }
        }
    });
}

function colorIcon(marker2, couriers) {
    marker2.forEach((element2) => {
        element2.setIcon(moto);
    });
    couriers.forEach((element) => {
        element["x"] = 0;
    });
}

////////////////////