<?php

namespace App\Models;

use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StaticPage extends Model
{
    protected $table = 'static_pages';
    public $timestamps = true;
    protected $keyType = 'string';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const ENABLED_AT = 'enabledAt';
    const DELETED_AT = 'deletedAt';

    use SoftDeletes;
    public function pageCategory()
    {
        return $this->belongsTo(PageCategory::class, 'pageCategoryId', 'id');
    }

    protected $fillable = [
        'id',
        'title',
        'description',
        'slug',
        'content',
        'pageCategoryId'
    ];


    use HasFactory;
}
