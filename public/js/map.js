DG.then(function() {
    var map = DG.map('map', {
        center: [54.98, 73.37],
        zoom: 12
    });

    var groups = {
        0: DG.featureGroup(),   
        1: DG.featureGroup(),   
        2: DG.featureGroup(),   
        3: DG.featureGroup(),   
        4: DG.featureGroup(), 
    };
    var colorIcons = generateIcons();
    var apiKey = $('#map').data('key');
    findMarkers(apiKey,'Омск', 'Разливное пиво');
    loadMarkers();

    /**
     * Generate color icons
     * @return object icons
     */
    function generateIcons() {
        var colors = {
            0: '#c8a2c8', 
            1: '#0048FF', 
            2: '#00E5FF', 
            3: '#FFFFFF', 
            green: 'green', 
            red: 'red'
        };
        var icons = [];

        $.each(colors, function(index, value) {
            icons[index] = DG.divIcon({
                html: '<div style="background-color: ' + value + '; width: 8px; height: 8px;"></div>',
                iconSize: [8, 8]
            });
        }); 
       
        return icons;
    }

    /**
     * Find markers
     * @param string key (2gis api key)
     * @param string location (Example: Omsk)
     * @param string query (Example: Beer)
     * @return void
     */
    function findMarkers(key, location, query) {
        $.ajax({
            url: 'http://catalog.api.2gis.ru/search?what=' + query + '&where=' + location + '&version=1.3&format=short&key=' + key,
            success: function(data) {
                $.each(data.result, function(index, value) {
                    var indexIcon = 3;

                    if (index < 3) {
                        indexIcon = index;
                    }
                    DG.marker([value.lat, value.lon], {icon: colorIcons[indexIcon]}).addTo(groups[indexIcon]).bindPopup(value.name);
                });

                showMarkers(groups[0]);
                showMarkers(groups[1]);
                showMarkers(groups[2]);
                showMarkers(groups[3]);
            }
        });
    }

    /**
     * Show marger group
     * @param  DG.featureGroup() markerGroup
     * @return void
     */
    function showMarkers(markerGroup) {
        markers = markerGroup;
        markers.addTo(map);
    };

    /**
     * Hide marker group
     * @param  DG.featureGroup() markerGroup
     * @return void
     */
    function hideMarkers(markerGroup) {
        markers = markerGroup;
        markers.removeFrom(map);
    };

    /**
     * Clear inputs
     * @return void
     */
    function clearForm() {
        $('input[name="id"]').val('');
        $('input[name="lat"]').val('');
        $('input[name="lon"]').val('');
        $('textarea[name="text"]').val('');
    };

    /**
     * Load marker from database
     * @return void
     */
    function loadMarkers() {
        $.ajax({
            method: 'GET',
            url: 'marker',
            success: function(data) {
                $.each(data, function(index, value) {
                    var itemColor = (value.color == 'red') ? 'danger' : 'success';
                    addMarkerToList(itemColor, value.color, value.id, value.lat, value.lon, value.name);
                });
                updateEventEditButton();
            }, error: function() {}
        });
    }

    /**
     * Add new row to marker list
     * @param string itemColor
     * @param string color
     * @param int id      
     * @param int lat     
     * @param int lon     
     * @param string name 
     * @return void
     */
    function addMarkerToList(itemColor, color, id, lat, lon, name) {
        var listCustomMarkers = $('.js-list-' + color);
        var row = '';
        row += '<li class="list-group-item list-group-item-' + itemColor + '" data-lat="' + lat +'" data-lon="' + lon + '" data-id="' + id + '">';
        row += '<span>' + name + '</span>';
        row += '<button class="pull-right js-edit-marker">Edit</button>'
        row += '</li>';    
        listCustomMarkers.append(row);
        updateEventEditButton();
        // Add marker to map
        DG.marker([lat, lon], {icon: colorIcons[color]}).addTo(groups[4]).bindPopup(name);
        showMarkers(groups[4]);
    } 

    // Added current location to inputs
    map.on('click', function(e) {
        $('input[name="lat"]').val(e.latlng.lat);
        $('input[name="lon"]').val(e.latlng.lng);
    });

    /**
     * Added new marker to map and update markers lists
     */
    $('#saveMarker').on('click', function(e) {
        e.preventDefault();
        var lat = $('input[name="lat"]').val();
        var lon = $('input[name="lon"]').val();
        var name = $('textarea[name="text"]').val();
        var id = $('input[name="id"]').val();
        var url = 'marker/store'; 
        var color = $('input[name="color"]:checked').val();

        if (lat != '' && lon != '' && name != '') {
            $('.js-alert').hide();

            var dataMarker = {lat: lat, lon: lon, color: color, name: name};

            if (id != '' && id != undefined) {
                url = 'marker/update';
                dataMarker.id = id;
            }

            $.ajax({
                method: 'POST',
                url: url,
                data: dataMarker,
                success: function(id) {
                    $('.list-group-item[data-id=' + id + ']').remove();

                    // Add new row to marker list
                    var itemColor = ($('input[name="color"]:checked').val() == 'red') ? 'danger' : 'success';
                    addMarkerToList(itemColor, color, id, lat, lon, name);
                    clearForm();
                }, error: function() {
                    $('.js-alert').text('When you save an error occurred!');
                    $('.js-alert').show();
                }
            });
        } else {
            $('.js-alert').text('All fields must be filled!');
            $('.js-alert').show();
        }
    });

    /**
     * On/Off marker group
     */
    $('.js-group').on('click', function(e) {
        var button = $(this);
        var group;
        switch(button.attr('name')) {
            case 'first': 
                group = groups[0];
                break;
            case 'second': 
                group = groups[1];
                break;
            case 'third': 
                group = groups[2];
                break;
            case 'other': 
                group = groups[3];
                break;
            case 'custom': 
                group = groups[4];
                break;
        }
        if(button.hasClass('btn-default')) {
            button.removeClass('btn-default');
            button.addClass('btn-primary');
            showMarkers(group);
        } else {
            button.removeClass('btn-primary');
            button.addClass('btn-default');
            hideMarkers(group);
        }
    });

    /**
     * Update event
     * @return void
     */
    function updateEventEditButton() {
        $('.js-edit-marker').on('click', function(e) {
            var marker = $(this).parent();
            var id = marker.data('id');
            $('form').append('<input name="id" value="' + id + '" hidden>');
            $('input[name="lat"]').val(marker.data('lat'));
            $('input[name="lon"]').val(marker.data('lon'));
            $('textarea[name="text"]').val(marker.find('span').text());
        });        
    }   
});