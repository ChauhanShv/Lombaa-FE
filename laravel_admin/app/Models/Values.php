<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Values extends Model
{
    use HasFactory;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    protected $table = 'field_values';

    protected $fillable = [
        'id',
        'value',
        'iconId',
        'fieldId',
    ];

    public function icon()
    {
        return $this->belongsTo(Files::class, 'iconId', 'id');
    }

    public function field()
    {
        return $this->belongsTo(Fields::class, 'fieldId', 'id');
    }

    public $timestamps = true;
    protected $keyType = 'string';
}
