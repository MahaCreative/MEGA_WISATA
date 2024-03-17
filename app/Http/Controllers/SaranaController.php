<?php

namespace App\Http\Controllers;

use App\Models\Sarana;
use Illuminate\Http\Request;

class SaranaController extends Controller
{
    public function index(Request $request)
    {
        $sarana = Sarana::latest()->get();
        return inertia('Sarana/Index', compact('sarana'));
    }

    public function create(Request $request)
    {
        // dd($request->all());
        $attr = $request->validate([
            "nama_sarana" => "required|string|min:10",
            "status_sewa" => "required",
            "foto_sarana" => "required|image|mimes:jpg,jpeg,svg,png",
        ]);
        if ($request->status_sewa == "sewa") {
            $request->validate(["harga_sewa" => "required"]);
        }
        $attr['foto_sarana'] = $request->file('foto_sarana')->storeAs('Image/Sarana', $request->file('foto_sarana')->getClientOriginalName());
        $attr['status_sewa'] = $request->status_sewa;
        $attr['harga_sewa'] = $request->harga_sewa;
        $sarana = Sarana::create($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambahkan 1 data sarana baru dengan nama ' . $sarana->nama_sarana]);
    }
    public function update(Request $request)
    {
        $attr = $request->validate([
            "nama_sarana" => "required|string|min:10",
            "status_sewa" => "required",

        ]);
        $sarana = Sarana::findOrFail($request->id);
        $title = $sarana->title;
        if ($request->status_sewa == "sewa") {
            $request->validate(["harga_sewa" => "required"]);
        }
        if ($request->hasFile('foto_sarana')) {

            $request->validate(["foto_sarana" => "nullable|image|mimes:jpg,jpeg,svg,png",]);
            $attr['foto_sarana'] = $request->file('foto_sarana')->storeAs('Image/Sarana', $request->file('foto_sarana')->getClientOriginalName());
        } else {
            $attr['foto_sarana'] = $sarana->foto_sarana;
        }

        $attr['status_sewa'] = $request->status_sewa;
        $attr['harga_sewa'] = $request->harga_sewa;

        $sarana->update($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil merubah 1 data sarana dengan nama ' . $title]);
    }
    public function delete(Request $request)
    {
        $sarana = Sarana::findOrFail($request->id);
        $title = $sarana->title;
        $sarana->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus 1 data sarana dengan nama ' . $title]);
    }
}
