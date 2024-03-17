<?php

namespace App\Http\Controllers;

use App\Models\Galery;
use App\Models\Informasi;
use App\Models\Sarana;
use App\Models\Slider;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $slider = Slider::latest()->get()->take(5);

        $queryInformasi = Informasi::query();
        if ($request->i) {
            $queryInformasi->where('judul', 'like', '%' . $request->i . '%');
        }
        $informasi = $queryInformasi->latest()->get()->take(10);
        $queryGalery = Galery::query();
        if ($request->g) {
            $queryGalery->where('judul', 'like', '%' . $request->i . '%');
        }
        $galery = $queryGalery->latest()->get()->take(10);
        $sarana = Sarana::latest()->get();
        return inertia('Home/Index', compact('galery', 'informasi', 'slider', 'sarana'));
    }
}
