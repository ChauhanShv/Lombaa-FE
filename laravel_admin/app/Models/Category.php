<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use Uuids;
    use HasFactory;

    protected $table = 'categories';
    public $timestamps = false;
    protected $keyType = 'string';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'name',
        'description',
        'isPopular',
        'isActive',
        'iconId',
        'parentId',
    ];

    public function icon()
    {
        return $this->belongsTo(Files::class, 'iconId', 'id');
    }

    public function fields()
    {
        return $this->belongsToMany(Fields::class, 'category_fields', 'categoryId', 'fieldId')->using(CategoryField::class);
    }
}
