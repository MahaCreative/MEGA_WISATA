<?php

namespace App\Http\Controllers;

use App\Models\Informasi;
use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{

    public function show(Request $request, $slug)
    {
        $kategori = Kategori::where('slug', $slug)->first();
        $informasi = Informasi::where('kategori_id', $kategori->id)->get();
        return $informasi;
    }

    public function create(Request $request)
    {

        $attr = $request->validate(['kategori' => 'required|string|min:4|unique:kategoris,kategori']);
        $attr['slug'] = \Str::slug($request->kategori);
        $kategori = Kategori::create($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambahkan 1 kategori ' . $kategori->kategori]);
    }

    public function update(Request $request)
    {
        $kategori = Kategori::find($request->id);
        $title = $kategori->kategori;
        $attr = $request->validate(['kategori' => 'required|string|min:4|unique:kategoris,kategori']);
        $attr['slug'] = \Str::slug($request->kategori);
        $kategori->update($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui 1 kategori ' . $title]);
    }
    public function delete(Request $request)
    {
        $kategori = Kategori::find($request->id);
        $title = $kategori->kategori;
        $kategori->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus 1 kategori ' . $title]);
    }
}
