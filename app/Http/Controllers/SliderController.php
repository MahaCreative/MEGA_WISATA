<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    public function store(Request $request)
    {

        $attr = $request->validate([
            'image' => ['required', 'image', 'mimes:png,jpg,jpeg,svg'],
            'imageBackground' => ['required', 'image', 'mimes:png,jpg,jpeg,svg'],
            "title" => ['required', 'string', 'min:16', 'unique:sliders,title'],
            "tagline" => ['required', 'string', 'min:30'],
            "position" => ['required',],
            "direction_text" => ['required'],
        ]);
        $foto = $request->file('image')->store('Slider/Image');
        $fotoBackground = $request->file('imageBackground')->store('Slider/Background');
        $attr['image'] = $foto;
        $attr['imageBackground'] = $fotoBackground;
        $slider = Slider::create($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambah Slider baru ' . $slider->title]);
    }

    public function update(Request $request)
    {

        $attr = $request->validate([

            "title" => ['required', 'string', 'min:16', 'unique:sliders,title'],
            "tagline" => ['required', 'string', 'min:30'],
            "position" => ['required',],
            "direction_text" => ['required'],
        ]);
        if ($request->hasFile('image') && $request->hasFile('imageBackground')) {
            $request->validate([
                'image' => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg'],
                'imageBackground' => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg'],
            ]);
        }
        $slider = Slider::findOrFail($request->id);
        $foto = $request->file('image') ? $request->file('image')->store('Slider/Image') : $slider->image;
        $fotoBackground = $request->file('imageBackground') ? $request->file('imageBackground')->store('Slider/Background') : $slider->imageBackground;
        $attr['image'] = $foto;
        $attr['imageBackground'] = $fotoBackground;
        $slider->update($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil mengedit Slider ' . $slider->title]);
    }
    public function delete(Request $request)
    {
        // dd($request->all());
        $slider = Slider::findOrFail($request->id);
        $title = $slider->title;
        $image = $slider->image;
        $imageBackground = $slider->imageBackground;
        Storage::delete($image);
        Storage::delete($imageBackground);
        $slider->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus slider ' . $title]);
    }
}
