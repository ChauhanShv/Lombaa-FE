<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;

class Countries extends Model
{   
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    use SpatialTrait;

    protected $table = 'countries';

    protected $fillable = [
        'id',
        'name',
        'code',
        'createdAt',
        'updatedAt'
    ];

    protected $spatialFields = [
        'coordinate'
    ];

    protected $keyType ='string';
    use HasFactory;
}
