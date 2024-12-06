<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRsvp extends Model
{
    use HasFactory;
    
    public function belongsToEvent()
    {
        return $this->belongsTo(Event::class, 'event_id', 'id');
    }
}
