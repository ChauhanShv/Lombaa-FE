<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Products extends Model
{
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    use SoftDeletes;

    use HasFactory;

    public function favourite()
    {
        return $this->belongsTo(Favourite::class, 'id', 'productId');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'categoryId', 'id');
    }

    public function location()
    {
        return $this->belongsTo(Locations::class, 'locationId', 'id');
    }

    public function user()
    {
        return $this->belongsTo(Users::class, 'userId', 'id');
    }

    protected $table = 'products';

    protected $fillable = [
        'id',
        'slug',
        'approvedAt',
        'postedAt',
        'rejectedAt',
        'rejectReason',
        'expiry',
        'soldAt',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'userId',
        'categoryId',
        'locationId',
    ];

    protected $keyType = 'string';
}
