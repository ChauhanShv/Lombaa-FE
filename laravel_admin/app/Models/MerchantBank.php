<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MerchantBank extends Model
{
    protected $table = 'merchant_bank';
    public $timestamps = true;
    protected $keyType = 'string';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    use Uuids;
    use SoftDeletes;

    protected $fillable = [
        'id',
        'bank',
        'acct_name',
        'acct_number',
        'acct_sort_code',

    ];
    use HasFactory;
}
