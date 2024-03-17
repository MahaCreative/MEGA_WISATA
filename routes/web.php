<?php

use App\Http\Controllers\GalaryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InformasiController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SaranaController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\UlasanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('masuk', [LoginController::class, 'index'])->name('login');
Route::post('masuk', [LoginController::class, 'store'])->name('login');
Route::get('logout', [LoginController::class, 'logout'])->name('logout');
Route::get('setting-profile', [ProfileController::class, 'index'])->name('setting-profile');
Route::post('setting-profile', [ProfileController::class, 'store'])->name('setting-profile');

Route::get('', [HomeController::class, 'index'])->name('home');
Route::post('create-slider', [SliderController::class, 'store'])->name('slider-create');
Route::post('update-slider', [SliderController::class, 'update'])->name('slider-update');
Route::delete('delete-slider', [SliderController::class, 'delete'])->name('slider-delete');

Route::get('informasi', [InformasiController::class, 'index'])->name('informasi');
Route::get('informasi/{slug}', [InformasiController::class, 'show'])->name('show.informasi');
Route::post('informasi-create', [InformasiController::class, 'create'])->name('informasi-create');
Route::post('informasi-update', [InformasiController::class, 'update'])->name('informasi-update');
Route::delete('informasi-delete', [InformasiController::class, 'delete'])->name('informasi-delete');

Route::get('sarana', [SaranaController::class, 'index'])->name('sarana');
Route::post('sarana-create', [SaranaController::class, 'create'])->name('sarana-create');
Route::post('sarana-update', [SaranaController::class, 'update'])->name('sarana-update');
Route::delete('sarana-delete', [SaranaController::class, 'delete'])->name('sarana-delete');

Route::get('galery', [GalaryController::class, 'index'])->name('galery');
Route::get('galery/{slug}', [GalaryController::class, 'show'])->name('show.galery');
Route::post('galery-create', [GalaryController::class, 'create'])->name('galery-create');
Route::post('galery-update', [GalaryController::class, 'update'])->name('galery-update');
Route::delete('galery-delete', [GalaryController::class, 'delete'])->name('galery-delete');

Route::get('ulasan', [UlasanController::class, 'index'])->name('ulasan');
Route::get('ulasan/{slug}', [UlasanController::class, 'show'])->name('show.ulasan');
Route::post('ulasan-create', [UlasanController::class, 'create'])->name('ulasan-create');
Route::post('ulasan-update', [UlasanController::class, 'update'])->name('ulasan-update');
Route::delete('ulasan-delete', [UlasanController::class, 'delete'])->name('ulasan-delete');


Route::get('kategori/{slug}', [KategoriController::class, 'show'])->name('show.kategori');
Route::post('kategori-create', [KategoriController::class, 'create'])->name('kategori-create');
Route::post('kategori-update', [KategoriController::class, 'update'])->name('kategori-update');
Route::delete('kategori-delete', [KategoriController::class, 'delete'])->name('kategori-delete');
