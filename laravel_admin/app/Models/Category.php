<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;


class Category extends Model
{
    use Uuids;
    use HasFactory;

    protected $table = 'categories';
    public $timestamps = true;
    protected $keyType ='string';


    protected $fillable = [
        'name',
        'description',
        'isPopular',
        'isActive',
        'iconId',
        'parentId'
    ];

    public function icon()
    {
        return $this->belongsTo(Files::class, 'iconId', 'id');
    }
}
