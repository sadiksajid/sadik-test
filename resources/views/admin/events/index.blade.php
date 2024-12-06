@extends('admin.layouts.dashboard.master')

@section('content')
<div class="container mt-4">
    <h1 class="mb-4">Events</h1>

    <!-- Filters Section -->
    <div class="row">
        <div class="col-md-6 col-12">
            <form method="GET" action="{{ route('admin.events.index') }}" class="mb-4">
                <div class="row">
                    <div class="col-8">
                        <select name="sort" class="form-select">
                            <option value="date" {{ request('sort') == 'date' ? 'selected' : '' }}>Date</option>
                            <option value="location" {{ request('sort') == 'location' ? 'selected' : '' }}>Location</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary w-100">Filter</button>
                    </div>
                </div>
            </form>
        </div>

        <!-- New Event Button -->
        <div class="col-md-6 col-12 ">
            <a href="{{ route('admin.events.create') }}" class="btn btn-primary mb-4 d-md-block float-md-end">
                <i class="fa fa-plus-circle"></i> New Event
            </a>
        </div>
    </div>

    <!-- Events Table -->
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">Description</th>
                <th scope="col">RSVP Limit</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($events as $event)
            <tr>
                <th scope="row">{{ $loop->index + 1 }}</th>
                <td>{{ $event['name'] }}</td>
                <td>{{ $event['date'] }}</td>
                <td>{{ $event['location'] }}</td>
                <td>{{ Str::limit($event['description'], 50) }}</td>
                <td>{{ $event['rsvp_limit'] }}</td>
                <td>
                    <a href="{{ route('admin.events.edit', $event['id']) }}" class="btn btn-sm btn-primary">
                        <i class="fa fa-edit"></i>
                    </a>
                    <form action="{{ route('admin.events.destroy', $event['id']) }}" method="POST" class="d-inline" onsubmit="return confirmDelete(this)">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger mt-2">
                            <i class="fa fa-trash"></i>
                        </button>
                    </form>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="7" class="text-center">No events found.</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <!-- Pagination -->
    <div class="d-flex justify-content-end">
        {{ $events->links() }}
    </div>
</div>
@endsection

