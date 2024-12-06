<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Requests\ValidationEvent;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminEventsController extends Controller
{
    /**
     * Display a listing of the events.
     */
    static function Index()
    {
        $sort = request('sort');
        $sort = in_array($sort, ['location', 'date']) ? $sort : 'date';
    
        $events = Event::when($sort, fn ($query, $sort) => $query->orderBy($sort))
        ->paginate(10);
        return view('admin.events.index', compact('events', 'sort'));
    }

    /**
     * Show the form for creating a new event.
     */
    static function Create()
    {
        return view('admin.events.create');
    }

    /**
     * Store a newly created event in storage.
     * @param ValidationEvent $request
     */
    static function Store(ValidationEvent $request)
    {
        Event::create($request->validated());
        return redirect()->route('admin.events.index')->with('success', 'Event created successfully!');
    }

    /**
     * Display the event details.
     *
     * @param int $id
     */
    static function Show(int $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        return new JsonResource($event);
    }
    /**
     * Show the form for editing the specified event.
     *
     * @param int $id
     */
    static function Edit(int $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return redirect()->route('admin.events.index')->with('error', 'Event not found!');
        }

        return view('admin.events.edit', compact('event'));
    }

    /**
     * Update the specified event.
     *
     * @param ValidationEvent $request
     * @param  int  $id
     */
    static function Update(ValidationEvent $request,int $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return redirect()->route('admin.events.index')->with('error', 'Event not found!');
        }

        $event->update($request->validated());

        return redirect()->route('admin.events.index')->with('success', 'Event updated successfully!');
    }

    /**
     * Delete the specified event.
     *
     * @param int $id
     */
    static function Delete($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return redirect()->route('admin.events.index')->with('error', 'Event not found!');
        }

        $event->delete();
        return redirect()->route('admin.events.index')->with('success', 'Event Deleted successfully!');
    }
    

}
