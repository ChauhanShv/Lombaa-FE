<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\Uuids;
use Facade\Ignition\Support\Packagist\Package;

class UserPackage extends Model
{
    use Uuids;
    protected $table = 'user_packages';
    public $timestamps = true;


    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';
    use SoftDeletes;

    protected $fillable = [
        'id',
        'startDate',
        'endDate',
        'userId',
        'packageId',
        'categoryId',
    ];
    protected $keyType = 'string';
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(Users::class, 'userId', 'id');
    }

    public function package()
    {
        return $this->belongsTo(Packages::class, 'packageId', 'id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'categoryId', 'id');
    }
}
