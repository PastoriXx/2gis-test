DG.then(function() {
    var map = DG.map('map', {
        center: [54.98, 73.37],
        zoom: 12
    });

    //Add popup
    // DG.marker([54.98, 73.37]).addTo(map).bindPopup('Я попап!');


    var myIcons = [];
    var colors = ['']
    myIcons[0] = DG.divIcon({
        html: '<div style="background-color: #c8a2c8; width: 8px; height: 8px;"></div>',
        iconSize: [8, 8]
    });
    myIcons[1] = DG.divIcon({
        html: '<div style="background-color: #0048FF; width: 8px; height: 8px;"></div>',
        iconSize: [8, 8]
    });
    myIcons[2] = DG.divIcon({
        html: '<div style="background-color: #00E5FF; width: 8px; height: 8px;"></div>',
        iconSize: [8, 8]
    });
    myIcons[3] = DG.divIcon({
        html: '<div style="background-color: green; width: 8px; height: 8px;"></div>',
        iconSize: [8, 8]
    });
    myIcons[4] = DG.divIcon({
        html: '<div style="background-color: red; width: 8px; height: 8px;"></div>',
        iconSize: [8, 8]
    });
    myIcons[5] = DG.divIcon({
        iconSize: [8, 8]
    });

    $.ajax({
      url: 'http://catalog.api.2gis.ru/search?what=%D1%80%D0%B0%D0%B7%D0%BB%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%B8%D0%B2%D0%BE&where=%D0%9E%D0%BC%D1%81%D0%BA&version=1.3&format=short&key=ruczoy1743',
      success: function(data) {
        $.each(data.result, function(index, value ) {
            console.log(index);
            // console.log(value);
            var indexIcon = 5;
            if (index < 3) {
                indexIcon = index;
            }
            DG.marker([value.lat, value.lon], {icon: myIcons[indexIcon]}).addTo(map).bindPopup(value.name);
        });

        $('.results').html(data);
      }
    });


    map.on('click', function(e) {
        console.log(e.latlng);
        $('input[name="lat"]').val(e.latlng.lat);
        $('input[name="lon"]').val(e.latlng.lng);
    });

    $('#saveMarker').on('click', function(e) {
        var listCustomMarkers = $('#listCustomMarkers');
        var row = '';
        var color = ($('input[name="color"]:checked').val() == 'red') ? 'danger' : 'success';
        row += '<li class="list-group-item list-group-item-' + color + '">';
        row += $('input[name="lat"]').val() + ' ' + $('input[name="lon"]').val();
        row += '</li>';

        listCustomMarkers.append(row);
    });
});