<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('saranas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_sarana');
            $table->string('foto_sarana');
            $table->string('status_sewa');
            $table->string('harga_sewa')->nullable();
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saranas');
    }
};
