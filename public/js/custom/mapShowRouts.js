
function mapShowRouts(data) {


    var map_height = data.map_height ?? '100%';
    var click = data.click ?? true;
    var click_to_drag = data.click_to_drag ?? false;
    var all_locations = data.all_locations ?? null;
    var all_routs = data.all_routs ?? null;

    var map = mapSetView(map_height, click_to_drag)

    var result, control, markers_n;
    var locations = [], markers = [];
    var stations = [];
    var stations_sort = [];
    var stations_ids = [];

    var all_stations = L.layerGroup([]);



    if (all_locations != null) {
        var x = 0;
        all_locations.forEach(function (local) {
            data['map'] = map;
            data['la'] = local['latitude'];
            data['lo'] = local['longitude'];
            data['icon'] = st_Bus;
            data['type'] = 'Station';
            data['name'] = (local['name'] != '') ? local['name'] : local['address'];
            data['name'] = data['name'] + '<br> <br> ';
            result = addMarkerToMap(data);
            all_stations.addLayer(result[1]);
            stations[x] = { marker: result[1], latlng: result[0] }
            stations_ids[local['id']] = result[0];
            x++;

        });
    }


    map.on('zoomend', function () {
        var data = Array()

        data['map'] = map;
        data['x'] = 40;
        data['y'] = 35;
        data['px'] = 12;
        data['py'] = 41;
        data['layers'] = all_stations;

        zoom(data)


    });

    if (all_routs != null) {
        var locals;
        data['map'] = map;

        all_routs.forEach(function (rout) {
            locals = []

            rout['route'].forEach(function (point) {
                locals.push(stations_ids[point])
            });

            data['color'] = rout['color'];
            data['locations'] = locals;
            control = setRoutMap(data);
        });


    }


    var data = [];
    data['map'] = map;
    control = setViewMap(data)

    /////////////////////////////////////////////////////////////////////////////////


    $('#map-wrapper').on('click', '.station_btn', function (e) {

        var id = $(this).attr("local-id")
        var index = $(this).attr("local-index")
        markers_n = markers.length;
        stations_sort.push(markers_n);

        livewire.emit('selectStation', { id: id, index: markers_n, local_index: index });

        locations[markers_n] = { location: stations[index]['latlng'], index: markers_n };

        var s_name = (all_locations[index]['name'] != '') ? all_locations[index]['name'] : all_locations[index]['address'];
        var text = '<b> Station <br>' + s_name + '<br> <br>';
        stations[index]['marker'].setIcon(st_Bus2).bindPopup(text).openPopup();

        markers[markers_n] = stations[index]['marker']
        markers[markers_n].index = markers_n;
        markers[markers_n].clicked = 0;
        markers[markers_n].type = 'station';

        if (control != null) {
            map.removeControl(control);
            control = null;
        }

        data = [];
        data['map'] = map;
        data['locations'] = locations.map(function (item) { return item['location'] })
        data['sort'] = stations_sort;

        control = setRoutMap(data);

    });

    $('body').unbind().on('click', '.select_local', function () {
        var index = $(this).attr("data-index")

        if (markers[index]['clicked'] == 1) {
            markers[index]['clicked'] = 0;

            if (markers[index]['type'] == 'new') {
                markers[index].setIcon(red);
            } else if (markers[index]['type'] == 'station') {
                markers[index].setIcon(st_Bus2);
            }

            livewire.emit('selectMarker', -1);

        } else {
            markers.forEach(function (mark) {

                if (mark['type'] == 'new') {
                    mark.setIcon(red);
                } else if (mark['type'] == 'station') {
                    mark.setIcon(st_Bus2);
                }

                mark['clicked'] = 0;

            });
            markers[index]['clicked'] = 1;

            livewire.emit('selectMarker', index);
            markers[index].setIcon(blue);

            if (markers[index]['type'] == 'new') {
                markers[index].setIcon(blue).openPopup();;
            } else {
                markers[index].setIcon(blue).openPopup();;
            }

        }

    });



}


