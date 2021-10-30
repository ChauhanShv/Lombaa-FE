<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Users extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'email',
        'password',
    ];
    protected $table = 'users';
    protected $keyType ='string';
    public $incrementing = false;
    public $timestamps = false;
}