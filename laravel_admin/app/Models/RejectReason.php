<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RejectReason extends Model
{
    use HasFactory;
    use Uuids;
    use SoftDeletes;

    public $timestamps = true;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    protected $keyType = 'string';
    protected $table = 'reject_reasons';

    protected $fillable = [
        'body',
    ];
}
