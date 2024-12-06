function AllMapsDrop(locals, depots, city = 0, polygon) {
    document.getElementById('map-wrapper').innerHTML = "<div id='map' style=' height: 680px!important;z-index: 1'></div>";


    var container = L.DomUtil.get('map');
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
        map.setView([city['la'], city['lo']], 13)

    } else {
        map.setView([30.4186991, -9.5562328], 13)

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
        mqi = L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}");

    var baseMaps = {
        "OpenStreetMap": osm,
        "Salatite": mqi
    };

    var overlays = { //add any overlays

    };

    L.control.layers(baseMaps, overlays, { position: 'bottomleft' }).addTo(map);

    depots.forEach(element => {
        var slatlng = L.latLng(element['latitude'], element['longitude']);
        L.marker(slatlng, {
            icon: CostumIcon.icon({
                icon: 'maps_home_work', // Name of Material icon
                iconColor: 'white', // Material icon color (could be rgba, hex, html name...)
                markerColor: element['color'], // Marker fill color
                outlineColor: 'black', // Marker outline color
                outlineWidth: 1, // Marker outline width
                iconSize: [41, 52] // Width and height of the icon
            })
        }).addTo(map).bindPopup("<b>Depot</b><br>" + element['name'], { offset: [0, -30] });

    });


    var marker = [];
    var marker_color = [];
    ////////////// polygons end
    /////////////////// here
    locals.forEach(element => {
        marker_color[element['o_id']] = CostumIcon.icon({
            icon: 'inventory', // Name of Material icon
            iconColor: 'white', // Material icon color (could be rgba, hex, html name...)
            markerColor: element['color'], // Marker fill color
            iconSize: [41, 52] // Width and height of the icon
        });

        var slatlng = L.latLng(element['latitude'], element['longitude']);
        marker[element['o_id']] = L.marker(slatlng).addTo(map).on('click', function() {
            // console.log(element);

            if (element['x'] == 0) {
                marker[element['o_id']].setIcon(SelectedOrder);
                element['x'] = 1;
            } else {
                marker[element['o_id']].setIcon(marker_color[element['o_id']]);
                element['x'] = 0;
            }

            Livewire.emit('selectorder', [element["o_id"], element["o_sa"]]);
        }).bindPopup("<b>Receiver</b><br>" + element['name'], { offset: [0, -30] });


        if (element['x'] == 0) {
            marker[element['o_id']].setIcon(marker_color[element['o_id']]);
        } else if (element['x'] == 1) {
            marker[element['o_id']].setIcon(SelectedOrder);
        } else {
            marker[element['o_id']].setIcon(ShowOrder).openPopup();
        }

    });



    polygons = JSON.parse(polygon);
    polygons['features'].forEach(poly => {
        var poly_map = L.geoJSON(poly);
        poly_map.setStyle({ fillColor: '#B4E0F2' });
        var points_in_poly = [];

        poly_map.addTo(map).on('click', function(e) {
            if (poly['selected'] == 0) {
                points_in_poly = [];
                poly_map.setStyle({ fillColor: '#f7941d' });
                poly['selected'] = 1;

                locals.forEach(element => {

                    if (isMarkerInsidePolygon(marker[element['o_id']], poly)) {

                        points_in_poly.push([element["o_id"], element["o_sa"], poly['p_id']]);

                        element['poly'] = poly['p_id'];
                        element['x'] = 1;

                        marker[element['o_id']].setIcon(SelectedOrder);
                        element['x'] = 1;

                    };

                });

                Livewire.emit('selectorder_poly', points_in_poly);

            } else {
                points_in_poly = []
                poly_map.setStyle({ fillColor: '#B4E0F2' });
                var n_local = locals.filter((x) => { return x.poly == poly['p_id']; });

                n_local.forEach(element => {

                    element['poly'] = -2;
                    element['x'] = 0;

                    points_in_poly.push([element["o_id"], element["o_sa"], poly['p_id']]);

                    marker[element['o_id']].setIcon(marker_color[element['o_id']]);
                    element['x'] = 0;

                });
                Livewire.emit('unselectorder_poly', points_in_poly);
                poly['selected'] = 0;

            }


        });
    });


}



function courierOrder(orders, couriers, depots, polygon) {

    document.getElementById('map-wrapper').innerHTML = "<div id='map' style=' height: 680px!important;z-index: 1'></div>";

    var container = L.DomUtil.get('map');
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
    map.setView([30.4186991, -9.5562328], 13)

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
        mqi = L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}");

    var baseMaps = {
        "OpenStreetMap": osm,
        "Salatite": mqi
    };

    var overlays = { //add any overlays here

    };

    L.control.layers(baseMaps, overlays, { position: 'bottomleft' }).addTo(map);
    var marker2 = [];
    couriers.forEach((element, index) => {
        var slatlng = L.latLng(element['latitude'], element['longitude']);
        marker2[index] = L.marker(slatlng, { icon: moto }).addTo(map).on('click', function() {


            colorIcon(marker2, couriers)
            if (element['x'] == 0) {
                marker2[index].setIcon(moto2);
                element['x'] = 1;
            } else {
                marker2[index].setIcon(moto);
                element['x'] = 0;
            }
            Livewire.emit('selectCourier', element["c_id"]);
        }).bindPopup("<b>Courier</b><br>" + element['name'], { offset: [0, -30] });

        if (element['x'] == 0) {
            marker2[index].setIcon(moto);
        } else if (element['x'] == 1) {
            marker2[index].setIcon(moto2);
        } else {
            marker2[index].setIcon(ShowOrder).openPopup();
        }
    });


    var marker_color = [];

    orders.forEach(element => {
        var slatlng = L.latLng(element['latitude'], element['longitude']);
        var marker2 = L.marker(slatlng).addTo(map).bindPopup("<b>Receiver</b><br>" + element['name'], { offset: [0, -30] });


        if (element['x'] == 1) {
            marker2.setIcon(ShowOrder).openPopup();
        } else {
            marker2.setIcon(SelectedOrder);
        }

    });

    depots.forEach(element => {
        var slatlng = L.latLng(element['latitude'], element['longitude']);
        var marker2 = L.marker(slatlng, {
            icon: CostumIcon.icon({
                icon: 'maps_home_work', // Name of Material icon
                iconColor: 'white', // Material icon color (could be rgba, hex, html name...)
                markerColor: element['color'], // Marker fill color
                outlineColor: 'black', // Marker outline color
                outlineWidth: 1, // Marker outline width
                iconSize: [41, 52] // Width and height of the icon
            })
        }).addTo(map).bindPopup("<b>Depot</b><br>", { offset: [0, -30] });

    });





    polygons = JSON.parse(polygon);
    polygons['features'].forEach(poly => {
        var poly_map = L.geoJSON(poly);
        poly_map.setStyle({ fillColor: '#f7941d' });
        poly_map.addTo(map)
    });




}