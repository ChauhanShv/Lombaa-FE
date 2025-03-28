<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Locations extends Model
{
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    use HasFactory;

    use SoftDeletes;

    public function city()
    {
        return $this->belongsTo(Cities::class, 'cityId', 'id');
    }

    public function region()
    {
        return $this->belongsTo(Regions::class, 'regionId', 'id');
    }

    public function country()
    {
        return $this->belongsTo(Countries::class, 'countryId', 'id');
    }

    protected $table = 'locations';

    protected $fillable = [
        'id',
        'cityId',
        'regionId',
        'countryId',
    ];

    protected $keyType = 'string';
}
