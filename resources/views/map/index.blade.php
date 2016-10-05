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
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-2 control-label">Lat:</label>
                    <div class="col-sm-10">
                        <input type="number" name="lat" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">Lon:</label>
                    <div class="col-sm-10">
                        <input type="number" name="lon" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-2 control-label">Text:</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" name="text"></textarea>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-2 control-label">Color:</label>
                    <div class="col-sm-10 radio">
                        <label><input type="radio" name="color" value="green" checked>Green</label>
                        <label><input type="radio" name="color" value="red">Red</label>
                    </div>
                </div>

                <button id="saveMarker" class="btn btn-default">Save</button>
                <hr>

                <ul id="listCustomMarkers" class="list-group"></ul>
            </div>

            <div class="form-group col-sm-9">
                <div id="map" style="width: 100%; height: 768px;"></div>
            </div>
        </div>

        <script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
        <script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>
        <script src="/js/map.js"></script>
        <script src="{{ elixir('js/app.js') }}"></script>
    </body>
</html>