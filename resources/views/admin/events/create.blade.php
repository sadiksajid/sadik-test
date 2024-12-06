@extends('admin.layouts.dashboard.master')

@section('content')
<div class="container p-4">
    <h1 class="mb-4">Create Event</h1>
    <!-- Event Creation Form -->
    <form action="{{ route('admin.events.store') }}" method="POST" class="needs-validation" >
        @csrf
        <div class="row g-3">
            <!-- Event Name -->
            <div class="col-md-6 col-12">
                <label for="name" class="form-label">Event Name</label>
                <input type="text" name="name" id="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name') }}" required>
                @error('name')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <!-- Event Date -->
            <div class="col-md-6 col-12">
                <label for="date" class="form-label">Event Date and Time</label>
                <input type="datetime-local" name="date" id="date" class="form-control @error('date') is-invalid @enderror" value="{{ old('date') }}" required>
                @error('date')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <!-- Location -->
            <div class="col-md-6 col-12">
                <label for="location" class="form-label">Location</label>
                <input type="text" name="location" id="location" class="form-control @error('location') is-invalid @enderror" value="{{ old('location') }}" required>
                @error('location')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <!-- RSVP Limit -->
            <div class="col-md-6 col-12">
                <label for="rsvp_limit" class="form-label">RSVP Limit</label>
                <input type="number" name="rsvp_limit" id="rsvp_limit" class="form-control @error('rsvp_limit') is-invalid @enderror" value="{{ old('rsvp_limit') ?? 1 }}" required min="1" step="1">
                @error('rsvp_limit')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <!-- Description -->
            <div class="col-12">
                <label for="description" class="form-label">Description</label>
                <textarea name="description" id="description" rows="5" class="form-control @error('description') is-invalid @enderror" required>{{ old('description') }}</textarea>
                @error('description')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <!-- Submit Button -->
            <div class="col-12">
                <button type="submit" class="btn btn-primary w-100">Create Event</button>
            </div>
        </div>
    </form>
</div>
@endsection

