<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductFields extends Model
{
    use HasFactory;

    public function field()
    {
        return $this->belongsTo(Fields::class, 'fieldId', 'id');
    }

    public function product()
    {
        return $this->belongsTo(Products::class, 'ProductId', 'id');
    }

    protected $tabel = 'product_fields';

    protected $fillable = [
        'id',
        'value',
        'key',
        'fieldId',
        'fieldValueId',
        'productId',
    ];

    protected $keyType = 'string';
}
