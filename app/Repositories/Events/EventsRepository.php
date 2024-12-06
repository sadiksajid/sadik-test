<?php

namespace App\Repositories\Events;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\Events\EventsRepositoryInterface;

class EventsRepository implements EventsRepositoryInterface
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find(int $id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }

    public function update(int $id, array $attributes)
    {
        $record = $this->find($id);
        $record->update($attributes);
        return $record;
    }

    public function delete(int $id)
    {
        $record = $this->find($id);
        $record->delete();
        return true;
    }
}
