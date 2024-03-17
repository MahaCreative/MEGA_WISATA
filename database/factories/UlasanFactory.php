<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Ulasan;

class UlasanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Ulasan::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'nama' => $this->faker->word(),
            'email' => $this->faker->safeEmail(),
            'ulasan' => $this->faker->text(),
            'status_ulasan' => $this->faker->word(),
        ];
    }
}
