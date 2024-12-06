<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidationEvent;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Repositories\Events\EventsRepositoryInterface;



class AdminEventsController extends Controller
{

    public function __construct(private readonly EventsRepositoryInterface $eventsRepositoryInterface)
    {
        //
    }

    /**
     * Display a listing of the events.
     */
    public function Index()
    {
        $sort = request('sort');

        $events = $this->eventsRepositoryInterface->all($sort);

        return view('admin.events.index', compact('events', 'sort'));
    }

    /**
     * Show the form for creating a new event.
     */
    public function Create()
    {
        return view('admin.events.create');
    }

    /**
     * Store a newly created event in storage.
     * @param ValidationEvent $request
     */
    public function Store(ValidationEvent $request)
    {
        $event = $this->eventsRepositoryInterface->create($request->validated());

        if (isset($event->id)) {
            return redirect()->route('admin.events.index')->with('success', 'Event created successfully!');
        }

        return redirect()->route('admin.events.index')->with('error', 'Event Not Saved!');
    }

    /**
     * Display the event details.
     *
     * @param int $id
     */
    public function Show(int $id)
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
    public function Edit(int $id)
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
    public function Update(ValidationEvent $request, int $id)
    {


        $event = $this->eventsRepositoryInterface->update($id, $request->validated());

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
    public function Delete($id)
    {
        $event = $this->eventsRepositoryInterface->delete($id);

        if (!$event) {
            return redirect()->route('admin.events.index')->with('error', 'Event not found!');
        }

        return redirect()->route('admin.events.index')->with('success', 'Event Deleted successfully!');
    }
}
