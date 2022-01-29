<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Fields extends Model
{
    use HasFactory;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    protected $table = 'fields';

    use SoftDeletes;

    public function icon()
    {
        return $this->belongsTo(Files::class, 'iconId', 'id');
    }

    public function values()
    {
        return $this->hasMany(Values::class, 'fieldId', 'id');
    }

    protected $fillable = [
        'id',
        'label',
        'field_tag',
        'isRequired',
        'isActive',
        'dataTypes',
        'fieldType',
        'iconId',
    ];

    public $timestamps = true;
    protected $keyType = 'string';
}
