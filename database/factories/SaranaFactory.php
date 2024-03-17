<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Sarana;

class SaranaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Sarana::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'nama_sarana' => $this->faker->word(),
            'foto_sarana' => "Image/mangrove.jpg",
            'status_sewa' => $this->faker->word(),
            'harga_sewa' => $this->faker->word(),
        ];
    }
}
