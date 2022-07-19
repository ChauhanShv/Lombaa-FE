<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductFields extends Model
{
    public $timestamps = false;

    use HasFactory;

    public function field()
    {
        return $this->belongsTo(Fields::class, 'fieldId', 'id');
    }

    public function product()
    {
        return $this->belongsTo(Products::class, 'ProductId', 'id');
    }

    protected $table = 'product_fields';

    protected $fillable = [
        'id',
        'value',
        'key',
        'fieldId',
        'fieldValueId',
        'ProductId',
    ];

    protected $keyType = 'string';
}
