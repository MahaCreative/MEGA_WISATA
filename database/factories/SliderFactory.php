<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Slider;

class SliderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Slider::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'image' => "Image/mangrove.jpg",
            'imageBackground' => "Image/mangrove.jpg",
            'title' => $this->faker->sentence(4),
            'tagline' => $this->faker->word(),
            'position' => $this->faker->word(),
            'direction_text' => $this->faker->word(),
        ];
    }
}
