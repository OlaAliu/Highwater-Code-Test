<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Black Fujifilm Dslr Camera',
            'price' => 500,
            'type' => 'b2b',
            'image' => 'img/product/pexels-math-90946.jpg',

        ]);
        Product::create([
            'name' => 'Sony Camera Lens Cover',
            'price' => 300,
            'type' => 'b2c',
            'image' => 'img/product/pexels-sethu-gauri-shankar-987122.jpg',

        ]);
    }
}
