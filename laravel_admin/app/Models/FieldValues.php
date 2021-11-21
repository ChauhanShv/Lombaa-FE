<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FieldValues extends Model
{
    use HasFactory;

    protected $table = 'field_values';

    protected $fillable = [
        'id',
        'value',
        'createdAt',
        'updatedAt',
        'iconId',
        'fieldId'
    ];

    public $timestamps = true;
    public $keyType = 'string';
}
