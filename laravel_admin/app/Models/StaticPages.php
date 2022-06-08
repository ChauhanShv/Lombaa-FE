<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class StaticPages extends Model
{
    protected $table = 'static_pages';
    public $timestamps = true;
    protected $keyType = 'string';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const ENABLED_AT = 'enabledAt';
    const DELETED_AT = 'deletedAt';

    use SoftDeletes;

    protected $fillable = [
        'id',
        'slug',
        'content',
    ];

    use HasFactory;
}
