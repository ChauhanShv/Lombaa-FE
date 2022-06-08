<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PageCategory extends Model
{   
    protected $table = 'page_category';
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
    ];

    use HasFactory;
}
