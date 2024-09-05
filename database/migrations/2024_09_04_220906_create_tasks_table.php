<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->text('title');
            $table->text('description'); // Task description
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade'); // Foreign key referencing the users table
            $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending'); // Task status
            $table->timestamps(); // Includes created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
