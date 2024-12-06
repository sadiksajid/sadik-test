<?php

namespace App\Repositories\Events;

use App\Models\Event;
use App\Repositories\Events\EventsRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class EventsRepository implements EventsRepositoryInterface
{
    /**
     * Retrieve all events with optional sorting and pagination.
     *
     * @param string|null $sort The field to sort by.
     * @return LengthAwarePaginator The paginated list of events.
     */
    public function all(?string $sort = null): LengthAwarePaginator
    {
        $sort = in_array($sort, ['location', 'date']) ? $sort : 'date';

        return Event::orderBy($sort)->paginate(10);
    }

    /**
     * Find an event by its ID.
     *
     * @param int $id
     * @return Event|null
     */
    public function find(int $id): Event|null
    {
        return Event::find($id);
    }

    /**
     * Create a new event.
     *
     * @param array $attributes
     * @return Event
     */
    public function create(array $attributes): Event
    {
        return Event::create($attributes);
    }

    /**
     * Update an existing event by its ID.
     *
     * @param int $id
     * @param array $attributes
     * @return Event|null
     */
    public function update(int $id, array $attributes): Event|null
    {
        $record = $this->find($id);
        
        if (!$record) {
            return $record;
        }
        $record->update($attributes);

        return $record;
    }

    /**
     * Delete an event by its ID.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $record = $this->find($id);

        if (!$record) {
            return $record;
        }

        $record->delete();
        return true;
    }
}
