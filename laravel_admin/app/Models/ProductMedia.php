<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductMedia extends Model
{
    use HasFactory;

    use SoftDeletes;

    public $timestamps = false;

    protected $keyType = 'string';

    const DELETED_AT = 'deletedAt';

    public function file()
    {
        return $this->belongsTo(Files::class, 'fileId', 'id');
    }

    protected $table = 'product_media';

    protected $fillable = [
        'deletedAt',
    ];
}
