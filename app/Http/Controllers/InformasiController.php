<?php

namespace App\Http\Controllers;

use App\Models\Informasi;
use Carbon\Carbon;
use Illuminate\Http\Request;

class InformasiController extends Controller
{
    public function index(Request $request)
    {
        $bulanIni = Carbon::now()->startOfMonth();
        $queery = Informasi::query();
        if ($request->cari) {
            $queery->where('judul', 'like', '%' . $request->cari . '%');
        }
        $informasiTerbanyak = Informasi::whereBetween('created_at', [$bulanIni, now()])->orderBy('dilihat', 'desc')->limit(10)->get();

        $informasi = $queery->with('kategori')->latest()->paginate(10);
        return inertia('Informasi/Index', compact('informasi', 'informasiTerbanyak'));
    }
    public function show(Request $request, $slug)
    {
        $informasi = Informasi::where('slug', '=', $slug)->first();
        $informasi->dilihat = $informasi->dilihat + 1;
        $informasi->save();
        return inertia('Informasi/Show', compact('informasi'));
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
        $attr['thumbnail'] = $request->file('thumbnail')->storeAs('Image/Informasi' . $request->file('thumbnail')->getClientOriginalName());
        $informasi = Informasi::create($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambah 1 informasi baru dengan judul ' . $informasi->judul]);
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
        $informasi = Informasi::find($request->id);
        $title = $informasi->judul;
        $attr['slug'] = \Str::slug($request->judul);
        $attr['kategori_id'] = $request->kategori_id ? $request->kategori_id : $informasi->kategori_id;
        $attr['thumbnail'] = $request->file('thumbnail') ? $request->file('thumbnail')->storeAs('Image/Informasi' . $request->file('thumbnail')->getClientOriginalName()) : $informasi->thumbnail;
        $informasi = $informasi->update($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui informasi dengan judul ' . $title]);
    }
    public function delete(Request $request)
    {
        $informasi = Informasi::find($request->id);
        $title = $informasi->judul;
        $informasi->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus informasi dengan judul ' . $title]);
    }
}
