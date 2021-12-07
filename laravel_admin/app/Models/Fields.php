<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fields extends Model
{
    use HasFactory;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    protected $table = 'fields';

    protected $fillable = [
        'id',
        'label',
        'isRequired',
        'isActive',
        'dataTypes',
        'fieldType',
        'sortOrder',
        'iconId',
    ];

    public function icon()
    {
        return $this->belongsTo(Files::class, 'iconId', 'id');
    }

    public function values()
    {
        return $this->hasMany(Values::class, 'fieldId', 'id');
    }

    public $timestamps = true;
    protected $keyType = 'string';
}
