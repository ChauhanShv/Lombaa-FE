<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\Uuids;

class UserPackage extends Model
{   
    use Uuids;
    protected $table = 'user_packages';
    public $timestamps = true;
    

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';
    use SoftDeletes;

    public function categories()
    {
        return $this->belongsTo(Category::class, 'categoryId', 'id');
    }

    public function packages()
    {
        return $this->belongsTo(Packages::class, 'packageId', 'id');
    }

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
   
}
