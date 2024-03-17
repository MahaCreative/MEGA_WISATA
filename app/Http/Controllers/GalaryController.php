<?php

namespace App\Http\Controllers;

use App\Models\Galery;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GalaryController extends Controller
{
    public function index(Request $request)
    {
        $bulanIni = Carbon::now()->startOfMonth();
        $galeryTerbanyak = Galery::whereBetween('created_at', [$bulanIni, now()])->orderBy('dilihat', 'desc')->limit(10)->get();
        $queery = Galery::query();
        if ($request->cari) {
            $queery->where('judul', 'like', '%' . $request->cari . '%');
        }
        $galery = $queery->with('kategori')->latest()->paginate(10);
        return inertia('Galery/Index', compact('galery', 'galeryTerbanyak'));
    }
    public function show(Request $request, $slug)
    {
        $galery = Galery::where('slug', '=', $slug)->first();
        $galery->dilihat = $galery->dilihat + 1;
        $galery->save();
        return inertia('Galery/Show', compact('galery'));
    }
    public function create(Request $request)
    {

        $attr = $request->validate([
            'kategori_id' => 'required',
            'judul' => 'required|string|min:25',
            'thumbnail' => 'required|mimes:png,jpg,jpeg,svg',
            "text" => "required|string|min:25",
        ]);
        $attr['slug'] = \Str::slug($request->judul);
        $attr['kategori_id'] = $request->kategori_id;
        $attr['thumbnail'] = $request->file('thumbnail')->storeAs('Image/galery' . $request->file('thumbnail')->getClientOriginalName());
        $galery = Galery::create($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambah 1 galery baru dengan judul ' . $galery->judul]);
    }
    public function update(Request $request)
    {

        $attr = $request->validate([
            'kategori_id' => 'required',
            'judul' => 'required|string|min:25',
            'thumbnail' => 'nullable',
            "text" => "required|string|min:25",
        ]);
        if ($request->hasFile('thumbnail')) {
            $request->validate([
                'thumbnail' => 'mimes:png,jpg,jpeg,svg',
            ]);
        }
        $galery = Galery::find($request->id);
        $title = $galery->judul;
        $attr['slug'] = \Str::slug($request->judul);
        $attr['kategori_id'] = $request->kategori_id ? $request->kategori_id : $galery->kategori_id;
        $attr['thumbnail'] = $request->file('thumbnail') ? $request->file('thumbnail')->storeAs('Image/galery' . $request->file('thumbnail')->getClientOriginalName()) : $galery->thumbnail;
        $galery = $galery->update($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui galery dengan judul ' . $title]);
    }
    public function delete(Request $request)
    {
        $galery = Galery::find($request->id);
        $title = $galery->judul;
        $galery->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus galery dengan judul ' . $title]);
    }
}
