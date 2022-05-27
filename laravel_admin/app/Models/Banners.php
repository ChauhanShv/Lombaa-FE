<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;

class Banners extends Model
{
    protected $table = 'banners';
    public $timestamps = true;
    protected $keyType = 'string';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    use SoftDeletes;
    // use SpatialTrait;

    protected $fillable = [
        'id',
        'title',
        'description',
        'action_label',
        'action',
        'action_type',
        'mediaId',
    ];

    use HasFactory;

}
