<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('map.index');
});

Route::post('marker/store', 'MarkerController@store');
Route::post('marker/update', 'MarkerController@update');
Route::get('marker/', 'MarkerController@index');