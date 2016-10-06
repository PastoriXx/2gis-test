<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Marker;

class MarkerController extends Controller
{
	/**
     * Display the all resource.
     */
    public function index()
    {
    	return Marker::all();
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $marker = Marker::create($request->all());
        return $marker->id;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return void
     */
    public function update(Request $request)
    {
        if($request->id) {
            $marker = Marker::findOrFail($request->id);
            $marker->update($request->all());

            return $marker->id;
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     *
     * @return void
     */
    public function destroy($id)
    {
        Marker::destroy($id);
    }
}
