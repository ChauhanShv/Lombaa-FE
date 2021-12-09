<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Fields extends Model
{
    use HasFactory;

    protected $table = 'fields';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

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
        'isRequired',
        'isActive',
        'dataTypes',
        'fieldType',
        'sortOrder',
        'iconId',
        'createdAt',
        'updatedAt',
    ];

    public $timestamps = true;
    protected $keyType = 'string';
}
