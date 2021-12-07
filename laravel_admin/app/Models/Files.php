<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Files extends Pivot
{

    protected $table = 'files';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

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
        'updatedAt',
    ];

    public $timestamps = true;
    protected $keyType = 'string';
    use HasFactory;
}
