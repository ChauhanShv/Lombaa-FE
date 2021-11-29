<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Countries extends Model
{   
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $table = 'countries';

    protected $fillable = [
        'id',
        'name',
        'code',
        'createdAt',
        'updatedAt'
    ];

    protected $keyType ='string';
    use HasFactory;
}
