<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryField extends Model
{
    use HasFactory;

    protected $table = 'category_fields';

    protected $fillable = [
        'categoryId',
        'fieldId'
    ];
    function categories() {
        return $this->belongsTo(Category::class, 'categoryId', 'id');
    }

    function fields() {
        return $this->belongsTo(Field::class, 'fieldId', 'id');
    }
    public $timestamps = true;
    protected $keyType ='string';
}
