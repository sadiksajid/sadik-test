// const { forEach } = require("lodash")

function calculatorForPolygon(polygons) {
    var arr = {};
    var point = {};
    var x = 0;
    var y = 0;

    polygons.forEach(function (polygon) {
        y = 0;
        // arr.push({'id':polygon['id']})
        arr[x] = {};
        arr[x]['id'] = polygon['id'];
        polygon['pts'].forEach(function (points) {
            point[y] = proj4('EPSG:3857').inverse([points[0], points[1]]);
            y++;
        });

        arr[x]['points'] = point;
        point = Array();
        x++;
    });
    Livewire.emit('updatePolygonsLocation', arr);
    return 1 ;

}


function calculatorForPlaces(Pionts) {
    var arr = {};
    var point = {};
    var x = 0;
    Pionts.forEach(function (piont0) {
        var pt = piont0['pts'][0];
        arr[x] = {};
        arr[x]['id'] = piont0['id'];
        point = proj4('EPSG:3857').inverse([pt[0], pt[1]]);
        arr[x]['points'] = point;
        point = Array();
        x++;
    });

    const perChunk = 100 // items per chunk    

    // const result = Array.prototype.chunk = function ( n ) {
    //     if ( !this.length ) {
    //         return [];
    //     }
    //     return [ this.slice( 0, n ) ].concat( this.slice(n).chunk(n) );
    // };

    var result = spliceIntoChunks(arr, 100) 

    result.forEach(function (array) {
        Livewire.emit('updatePlacesLocation',array);

    });

    return 1 ;

}
// osm_places

function spliceIntoChunks(arr, chunkSize) {
    var values = Object.values(arr);
    var final = [];
    var counter = 0;
    var portion = {};

    for (var key in arr) {
        if (counter !== 0 && counter % chunkSize === 0) {
            final.push(portion);
            portion = {};
        }
        portion[key] = values[counter];

        counter++
    }
    final.push(portion);

    return final ;
}