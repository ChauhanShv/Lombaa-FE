<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoices extends Model
{
    use HasFactory;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    use SoftDeletes;

    public $timestamps = true;

    protected $table = 'invoices';

    use Uuids;

    public function user()
    {
        return $this->belongsTo(Users::class, 'userId', 'id');
    }

    public function package()
    {
        return $this->belongsTo(Packages::class, 'packageId', 'id');
    }


    protected $fillable = [
        'id',
        'invoiceNumber',
        'packageName',
        'price',
        'status',
        'updatedAt',
        'deletedAt',
        'userId ',
    ];

}
