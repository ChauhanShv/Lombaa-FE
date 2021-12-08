<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CategoryField extends Pivot
{
    use HasFactory;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';

    public function categories()
    {
        return $this->belongsTo(Category::class, 'categoryId', 'id');
    }

    public function fields()
    {
        return $this->belongsTo(Fields::class, 'fieldId', 'id');
    }

    protected $table = 'category_fields';

    protected $fillable = [
        'categoryId',
        'fieldId',
    ];

    public $timestamps = true;
    protected $keyType = 'string';
}
