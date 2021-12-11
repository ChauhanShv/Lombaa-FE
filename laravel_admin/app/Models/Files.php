<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;

class Files extends Pivot
{

    protected $table = 'files';

    public $timestamps = true;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    use SoftDeletes;

    protected $fillable = [
        'id',
        'key_name',
        'extension',
        'name',
        'mime',
        'relative_path',
        'absolute_path',
        'location',
    ];

    protected $keyType = 'string';
    use HasFactory;
}
