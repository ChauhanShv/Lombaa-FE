<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;


class Regions extends Model
{       
    use HasFactory;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    use SpatialTrait;

    protected $table = 'regions';

    protected $fillable = [
        'id',
        'name',
        'code',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'countryId'
    ];
    
    protected $spatialFields = [
        'coordinate'
    ];

    public function country() {

        return $this->belongsTo(Countries::class, 'countryId', 'id');
    }

    protected $keyType ='string';
    use HasFactory;
}
