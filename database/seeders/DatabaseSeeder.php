<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Galery;
use App\Models\Informasi;
use App\Models\Kategori;
use App\Models\Profil;
use App\Models\Sarana;
use App\Models\Slider;
use App\Models\Ulasan;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
        ]);
        Kategori::factory(4)
            ->hasInformasis(1)
            ->hasGaleries(27)->create();
        Sarana::factory(10)->create();
        Profil::factory()->create();
        Slider::factory(15)->create();
        // Ulasan::factory(10)->create();
    }
}
