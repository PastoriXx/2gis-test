<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>2gis test</title>
        <link rel="stylesheet" href="{{ elixir('css/app.css') }}">
    </head>
    <body>
        <div class="container form-horizontal">
            <h1>2gis Markers</h1>
            <hr>
            <div class="col-sm-3">
                <h3>On/Off Markers</h3>
                <div class="form-group">
                    <button class="btn btn-primary js-group" name="first">First</button>
                    <button class="btn btn-primary js-group" name="second">Second</button>
                    <button class="btn btn-primary js-group" name="third">Third</button>
                    <button class="btn btn-primary js-group" name="other">Other</button>
                    <button class="btn btn-primary js-group" name="custom">Custom</button>
                </div>                
                <hr>
                <h3>Add New Marker</h3>
                <form>                
                    <div class="alert alert-danger js-alert" hidden>All fields must be filled!</div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Lat *:</label>
                        <div class="col-sm-9">
                            <input type="number" name="lat" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Lon *:</label>
                        <div class="col-sm-9">
                            <input type="number" name="lon" class="form-control">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-3 control-label">Text *:</label>
                        <div class="col-sm-9">
                            <textarea class="form-control" name="text"></textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-3 control-label">Color:</label>
                        <div class="col-sm-9 radio">
                            <label><input type="radio" name="color" value="green" checked>Green</label>
                            <label><input type="radio" name="color" value="red">Red</label>
                        </div>
                    </div>

                    <button id="saveMarker" class="btn btn-primary">Save</button>
                </form>
                <hr>

                <ul class="list-group js-list-green"></ul>
                <ul class="list-group js-list-red"></ul>
            </div>

            <div class="form-group col-sm-9">
                <div id="map" data-key="{{ env('API_2GIS_KEY') }}" style="width: 100%; height: 900px;"></div>
            </div>
        </div>

        <script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
        <script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>
        <script src="/js/map.js"></script>
        <script src="{{ elixir('js/app.js') }}"></script>
    </body>
</html>