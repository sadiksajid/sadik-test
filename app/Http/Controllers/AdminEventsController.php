<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Requests\ValidationEvent;
use Illuminate\Http\Resources\Json\JsonResource;

public function __construct(private readonly EventsRepositoryInterface $eventsRepositoryInterface) 
{
    //
}


class AdminEventsController extends Controller
{
    /**
     * Display a listing of the events.
     */
    static function Index()
    {
        $sort = request('sort');

        $events = $this->eventsRepositoryInterface->all($sort);
    
        // $events = Event::when($sort, fn ($query, $sort) => $query->orderBy($sort))
        // ->paginate(10);
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
        $event = $this->eventsRepositoryInterface->create($request->validated());

        // Event::create($request->validated());
        if(isset($event->id)){
            return redirect()->route('admin.events.index')->with('success', 'Event created successfully!');
        }

        return redirect()->route('admin.events.index')->with('error', 'Event Not Saved!');
    }

    /**
     * Display the event details.
     *
     * @param int $id
     */
    static function Show(int $id)
    {
        $event = $this->eventsRepositoryInterface->find($id);

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
        $event = $this->eventsRepositoryInterface->find($id);

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

        
        $event = $this->eventsRepositoryInterface->update($id,$request->validated());

        if (!$event) {
            return redirect()->route('admin.events.index')->with('error', 'Event not found!');
        }

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
