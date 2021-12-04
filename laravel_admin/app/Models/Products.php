<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'id',
        'title',
        'category_Id',
        'slug',
        'price',
        'is_Negotiable',
        'is_Free',
        'buyer_Do_Delivery',
        'stock',
        'condition',
        'description',
        'location',
        'promote_Type',
        'deal_Method',
        'is_Approved',
        'is_Sold',
        'postedAt',
        'createdAt',
        'updatedAt',
        'deletedAt'
    ];

    protected $keyType = 'string';
}
