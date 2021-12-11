<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FieldValues extends Model
{
    use HasFactory;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    use SoftDeletes;

    protected $table = 'field_values';

    protected $fillable = [
        'id',
        'value',
        'createdAt',
        'updatedAt',
        'iconId',
        'fieldId',
    ];

    public $timestamps = true;
    public $keyType = 'string';
}
