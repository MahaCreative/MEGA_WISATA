<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Profil;

class ProfilFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Profil::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'nama_wisata' => $this->faker->word(),
            'alamat' => $this->faker->text(),
            'logo' => "Image/mangrove.jpg",
            'no_telp' => $this->faker->word(),
            'email_wisata' => $this->faker->word(),
            'url_map' => "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7970.841652442297!2d118.8688168!3d-2.6903179!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d92d9fd10f3b8fb%3A0x1dd6977dfa5f3a44!2sINRI%20SALON%202!5e0!3m2!1sid!2sid!4v1710366165226!5m2!1sid!2sid"
        ];
    }
}
