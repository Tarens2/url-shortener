<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    protected $fillable  = ['url', 'url_shorted'];
    protected $table = 'urls';
}
