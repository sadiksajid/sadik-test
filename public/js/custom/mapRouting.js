function mapRouting(data) {


    var map_height = data.map_height ?? '100%';
    var click = data.click ?? true;
    var click_to_drag = data.click_to_drag ?? false;
    var all_locations = data.all_locations ?? null;
    var all_routs = data.all_routs ?? null;
    var edit_locals = data.edit_locals ?? null;

    var map = mapSetView(map_height, click_to_drag)

    var result, control, markers_n;
    var locations = [],
        markers = [];
    var stations = [];
    var stations_index = [];
    var stations_sort = [];
    var stations_ids = [];
    var all_stations = L.layerGroup([]);

    if (click == true) {
        map.on('click', getLocal);
    }

    if (all_locations != null) {
        var x = 0;
        all_locations.forEach(function(local) {
            if (local['latitude'] != '') {

                data['map'] = map;
                data['la'] = local['latitude'];
                data['lo'] = local['longitude'];
                data['icon'] = st_Bus;
                data['type'] = 'Station';
                data['name'] = (local['name'] != '') ? local['name'] : local['address'];
                data['name'] = data['name'] + '<br> <br> <button class="btn btn-sm btn-info station_btn" local-index="' + x + '" local-id="' + local['id'] + '"> Select</button>';
                result = addMarkerToMap(data);
                all_stations.addLayer(result[1]);

                stations[x] = { marker: result[1], latlng: result[0] }
                stations_index[local['id']] = x;
                stations_ids[local['id']] = result[0];
                x++;
            }




        });
    }

    if (all_routs != null) {
        var locals;
        data['map'] = map;

        all_routs.forEach(function(rout) {
            locals = []

            rout['route'].forEach(function(point) {
                locals.push(stations_ids[point])
            });

            data['color'] = rout['color'];
            data['locations'] = locals;
            control = setRoutMap(data);
        });


    }

    map.on('zoomend', function() {
        var data = Array()

        data['map'] = map;
        data['x'] = 40;
        data['y'] = 35;
        data['px'] = 12;
        data['py'] = 41;
        data['layers'] = all_stations;

        zoom(data)


    });

    function getLocal(e) {


        var data = [];
        markers_n = Number(markers.length);
        stations_sort.push(markers_n);

        data['e'] = e;
        data['map'] = map;
        data['name'] = 'N' + (markers_n + 1);
        data['type'] = 'Station';
        data['local_index'] = markers_n;
        data['draggable'] = true;
        data['is_new'] = true;

        result = getLocalClick(data)
        locations[markers_n] = { location: result['latlng'], index: markers_n };

        markers[markers_n] = result['marker'];
        markers[markers_n].index = markers_n;
        markers[markers_n].clicked = 0;
        markers[markers_n].type = 'new';

        var data = [];
        data['map'] = map;
        data['locations'] = locations.map(function(item) { return item['location'] })
        data['sort'] = stations_sort;

        markers[markers_n].on('click', function(e) {
            var marker = e.target;

            if (marker['clicked'] == 1) {
                marker['clicked'] = 0;
                if (marker['type'] == 'new') {
                    marker.setIcon(red);
                } else if (marker['type'] == 'station') {
                    marker.setIcon(st_Bus2);
                }
                livewire.emit('selectMarker', -1);
            } else {
                markers.forEach(function(mark) {
                    if (mark['type'] == 'new') {
                        mark.setIcon(red);
                    } else if (mark['type'] == 'station') {
                        mark.setIcon(st_Bus2);
                    }
                    mark['clicked'] = 0;
                });
                marker['clicked'] = 1;

                livewire.emit('selectMarker', marker['index']);
                if (marker['type'] == 'new') {
                    marker.setIcon(blue).openPopup();;
                } else {
                    marker.setIcon(blue).openPopup();;
                }
            }

        });


        markers[markers_n].on("dragend", function(e) {
            var marker = e.target;
            var position = marker.getLatLng();

            locations[marker['index']]['location'] = new L.LatLng(position.lat, position.lng);

            data['locations'] = locations.map(function(item) { return item['location'] })
            data['sort'] = stations_sort;

            if (control != null) {
                map.removeControl(control);
                control = null;
            }

            control = setRoutMap(data);

            data['drag_lo'] = position.lng;
            data['drag_la'] = position.lat;
            data['drag_LatLng'] = new L.LatLng(position.lat, position.lng);

            data['local_index'] = marker['index'];
            data['draggable'] = true;
            data['is_new'] = false;

            result = getLocalClick(data)

        });


        if (control != null) {
            map.removeControl(control);
            control = null;
        }

        control = setRoutMap(data);


    }

    var data = [];
    data['map'] = map;
    control = setViewMap(data)

    if (edit_locals != null) {
        edit_locals.forEach(local => {
            if (local['latitude'] != '') {
                var id = local['id']
                var index = stations_index[id]

                markers_n = markers.length;
                stations_sort.push(markers_n);


                locations[markers_n] = { location: stations[index]['latlng'], index: markers_n };

                var s_name = (all_locations[index]['name'] != '') ? all_locations[index]['name'] : all_locations[index]['address'];
                var text = '<b> Station <br>' + s_name + '<br> <br> <button class="btn btn-sm btn-danger delete_local" local-id="' + id + '" local-index="' + index + '"  data-index="' + markers_n + '" data-id="' + markers_n + '"> Remove</button>';
                stations[index]['marker'].setIcon(st_Bus2).bindPopup(text).openPopup();

                markers[markers_n] = stations[index]['marker']
                markers[markers_n].index = markers_n;
                markers[markers_n].clicked = 0;
                markers[markers_n].type = 'station';

                $(".delete_local").filter(`[local-id="${id}"]`).attr('local-index', index);
            }

        });

        if (control != null) {
            map.removeControl(control);
            control = null;
        }

        data = [];
        data['map'] = map;
        data['locations'] = locations.map(function(item) { return item['location'] })
        data['sort'] = stations_sort;

        control = setRoutMap(data);
    }


    /////////////////////////////////////////////////////////////////////////////////

    $('#map-wrapper').on('click', '.station_btn', function(e) {

        if (click == true) {

            var id = $(this).attr("local-id")
            var index = $(this).attr("local-index")
            markers_n = markers.length;
            stations_sort.push(markers_n);

            livewire.emit('selectStation', { id: id, index: markers_n, local_index: index });

            locations[markers_n] = { location: stations[index]['latlng'], index: markers_n };

            var s_name = (all_locations[index]['name'] != '') ? all_locations[index]['name'] : all_locations[index]['address'];
            var text = '<b> Station <br>' + s_name + '<br> <br> <button class="btn btn-sm btn-danger delete_local" local-id="' + id + '" local-index="' + index + '"  data-index="' + markers_n + '" data-id="' + markers_n + '"> Remove</button>';
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
            data['locations'] = locations.map(function(item) { return item['location'] })
            data['sort'] = stations_sort;

            control = setRoutMap(data);
        }




    });

    $('body').unbind().on('click', '.select_local', function() {
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
            markers.forEach(function(mark) {

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


    $('body, #map-wrapper').on('click', '.delete_local', function() {
        var nbr = $(this).attr("data-id")
        var index = $(this).attr("data-index")

        if (!confirm("Do you want to delete This Location ?")) {
            return false;
        }

        livewire.emit('removeLocal', index);

        if (markers[index]['type'] == 'new') {
            map.removeLayer(markers[index]);
        } else {
            var local_id = $(this).attr("local-id")
            var local_index = $(this).attr("local-index")
            var s_name = (all_locations[local_index]['name'] != '') ? all_locations[local_index]['name'] : all_locations[local_index]['address'];
            var text = '<b> Station <br>' + s_name + '<br> <br> <button class="btn btn-sm btn-info station_btn" local-index="' + local_index + '" local-id="' + local_id + '"> Select</button>';

            stations[local_index]['marker'].setIcon(st_Bus).bindPopup(text).openPopup();
        }

        delete stations_sort[stations_sort.indexOf(parseInt(index))];
        delete locations[index];

        if (control != null) {
            map.removeControl(control);
            control = null;
        }

        stations_sort = stations_sort.filter(Object);
        data['locations'] = locations.map(function(item) { return item['location'] })
        data['sort'] = stations_sort;

        control = setRoutMap(data);

    });



    jQuery(function($) {
        var panelList = $('#draggablePanelList');

        panelList.unbind().sortable({
            handle: '.card-header',
            update: function() {


                stations_sort = stations_sort.filter(Object);
                $('.card', panelList).each(function(index, elem) {


                    stations_sort[index] = parseInt(elem.getAttribute("data-index"))
                });


                if (control != null) {
                    map.removeControl(control);
                    control = null;
                }
                data['locations'] = locations.map(function(item) { return item['location'] })
                data['sort'] = stations_sort;

                livewire.emit('sortStations', stations_sort);
                control = setRoutMap(data)

            }
        });
    });


}


document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 's') {
        // Prevent the Save dialog to open
        e.preventDefault();
        // Place your code here
        livewire.emit('Submit');

    }
});