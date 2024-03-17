<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Informasi;
use App\Models\Kategori;
use App\Models\User;

class InformasiFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Informasi::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'kategori_id' => Kategori::factory(),
            'judul' => $this->faker->word(),
            'slug' => $this->faker->slug(),
            'text' => $this->faker->text(),
            'thumbnail' => "Image/mangrove.jpg",
            'dilihat' => $this->faker->numberBetween(1, 10000),
        ];
    }
}
