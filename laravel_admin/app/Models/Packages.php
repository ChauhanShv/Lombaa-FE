<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Packages extends Model
{
    protected $table = 'packages';
    public $timestamps = true;
    

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';
    use SoftDeletes;

    protected $fillable = [
        'id',
        'name',
        'title',
        'description',
        'type',
        'validity',
        'price',
        'currency'
    ];
    protected $keyType = 'string';
    use HasFactory;
}
