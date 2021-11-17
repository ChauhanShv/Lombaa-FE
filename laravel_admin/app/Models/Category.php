<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use App\Traits\Uuids;


class Category extends Model
{
    protected $table = 'categories';

    protected $fillable = [
        'id',
        'name',
        'description',
        'isPopular',
        'isActive',
        'iconId',
        'parentId'
    ];

    public $timestamps = true;
    protected $keyType ='string';
    // protected $keyType = 'uuids';
    use HasFactory;
}
