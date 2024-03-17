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

        Schema::create('profils', function (Blueprint $table) {
            $table->id();
            $table->string('nama_wisata');
            $table->text('alamat');
            $table->string('logo');
            $table->string('no_telp');
            $table->string('email_wisata');
            $table->string('url_map');

            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profils');
    }
};
