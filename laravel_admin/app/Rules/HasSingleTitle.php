<?php

namespace App\Rules;

use App\Models\Fields;
use Illuminate\Contracts\Validation\Rule;

class HasSingleTitle implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return Fields::whereIn('id', $value)->where('fieldType', 'title')->count() === 1;

        // $val = Fields::whereIn('id', $value)->where('fieldType', 'title')->count();

        // dd($val);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Category fields should have only one title field.';
    }
}
