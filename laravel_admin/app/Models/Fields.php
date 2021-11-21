<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fields extends Model
{
    use HasFactory;

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
        'createdAt',
        'updatedAt'

    ];

    public $timestamps = true;
    protected $keyType ='string';

}
