<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Galery;
use App\Models\Kategori;
use App\Models\User;

class GaleryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Galery::class;

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
            // 'thumbnail' => "https://source.unsplash.com/random/" . rand(300, 700) . "x" . rand(300, 800) . "?figma",
            'thumbnail' => "Image/mangrove.jpg",
            'dilihat' => $this->faker->numberBetween(-0, 10000),
        ];
    }
}
