<?php

namespace App\Models;

use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Countries extends Model
{
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    use SoftDeletes;

    use SpatialTrait;

    protected $table = 'countries';

    protected $fillable = [
        'id',
        'name',
        'code',
        'createdAt',
        'updatedAt',
    ];

    protected $spatialFields = [
        'coordinate',
    ];

    protected $keyType = 'string';
    use HasFactory;
}
