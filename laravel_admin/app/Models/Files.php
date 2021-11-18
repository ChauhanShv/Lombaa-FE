<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Files extends Model
{

    protected $table = 'files';

    protected $fillable = [
        'id',
        'key_name',
        'extension',
        'name',
        'mime',
        'relative_path',
        'absolute_path',
        'location',
        'createdAt',
        'updatedAt'
    ];

    public $timestamps = true;
    protected $keyType ='string';
    // protected $keyType = 'uuids';
    use HasFactory;
}
