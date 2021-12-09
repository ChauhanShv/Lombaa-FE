<?php

namespace App\Models;

use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cities extends Model
{
    use HasFactory;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    use SoftDeletes;

    use SpatialTrait;

    protected $table = 'cities';

    protected $fillable = [

        'id',
        'name',
        'code',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'regionId',
    ];
    protected $spatialFields = [
        'coordinate',
    ];
    public function region()
    {
        return $this->belongsTo(Regions::class, 'regionId', 'id');
    }
    protected $keyType = 'string';
}
