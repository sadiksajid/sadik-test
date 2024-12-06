window.addEventListener("maps:maps_change_loacal_calcul_price", event => {
    var fix_lo = event.detail.fix_lo;
    var fix_la = event.detail.fix_la;
    var change_lo = event.detail.change_lo;
    var change_la = event.detail.change_la;
    var fix_name = event.detail.fix_name;
    var change_name = event.detail.change_name;
    var change_type = event.detail.change_type;
    var fix_type = event.detail.fix_type;
    var is_express = event.detail.is_express;
    var max_km = event.detail.max_km;
    var map_height = event.detail.map_height;
    var pick = event.detail.pick;
    var click = event.detail.click;
    var click_to_drag = event.detail.click_to_drag;
    var draggable = event.detail.draggable;
    var zoom = event.detail.zoom;
    // debugger
    var data = {
        fix_lo: fix_lo ?? null,
        fix_la: fix_la ?? null,
        change_lo: change_lo ?? null,
        change_la: change_la ?? null,
        fix_name: fix_name ?? null,
        change_name: change_name ?? null,
        fix_type: fix_type ?? null,
        change_type: change_type ?? null,
        is_express: is_express ?? null,
        max_km: max_km ?? 25000,
        map_height: map_height ?? "500px",
        pick: pick ?? false,
        click: click ?? true,
        click_to_drag: click_to_drag ?? false,
        draggable: draggable ?? false,
        zoom: zoom ?? false,
    };
    maps_change_loacal_calcul_price(data);
});

window.addEventListener("maps:maps_routing_manage", (event) => {
    var map_height = event.detail.map_height;
    var click = event.detail.click;
    var click_to_drag = event.detail.click_to_drag;
    var all_locations = event.detail.all_locations;
    var all_routs = event.detail.all_routs;
    var edit_locals = event.detail.edit_locals;

    var data = {
        map_height: map_height ?? "100%",
        click: click ?? true,
        click_to_drag: click_to_drag ?? false,
        all_locations: all_locations ?? null,
        all_routs: all_routs ?? null,
        edit_locals: edit_locals ?? null,
    };

    mapRouting(data);
});

window.addEventListener("maps:maps_show_routs", (event) => {
    var map_height = event.detail.map_height;
    var click = event.detail.click;
    var click_to_drag = event.detail.click_to_drag;
    var all_locations = event.detail.all_locations;
    var all_routs = event.detail.all_routs;

    var data = {
        map_height: map_height ?? "100%",
        click: click ?? true,
        click_to_drag: click_to_drag ?? false,
        all_locations: all_locations ?? null,
        all_routs: all_routs ?? null,
    };

    mapShowRouts(data);
});

window.addEventListener("maps:GotoView", (event) => {

    var longitude = event.detail.longitude;
    var latitude = event.detail.latitude;

    var data = {
        longitude: longitude ?? null,
        latitude: latitude ?? null,
    };

    GotoView(data);
});