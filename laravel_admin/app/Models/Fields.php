<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fields extends Model
{
    use HasFactory;

    protected $table = 'fields';

    protected $fillable = [

        'id',
        'label',
        'isRequired',
        'isActive',
        'dataTypes',
        'fieldType',
        'sortOrder',
        'iconId',
        'createdAt',
        'updatedAt'

    ];

    public function icon() {
        return $this->belongsTo(Files::class, 'iconId', 'id');
    }

    public function values() {
        return $this->hasMany(Values::class, 'fieldId', 'id');
    }

    // public function value_icons() {
    //     return $this->belongsToMany(Values::class, 'files', 'relative_path')->using(Files::class);
    // }


    public $timestamps = true;
    protected $keyType ='string';

}
