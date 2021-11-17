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

    // public function files()
    // {
    //     return $this->belongsTo(\App\Models\Files::class, 'id');
    //     return $this->where('id', '=', $table->iconId)->select('absolute_path')->first();
    // }

    // public funtion absolutePath() {
    //     $file = files();
    //     return $table->wher
    // }
    public $timestamps = true;
    protected $keyType ='string';
    // protected $keyType = 'uuids';
    use HasFactory;
}
