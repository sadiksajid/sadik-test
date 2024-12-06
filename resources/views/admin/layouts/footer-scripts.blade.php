<!-- Jquery js-->
<script src="{{URL::asset('assets/js/jquery-3.5.1.min.js')}}"></script>

<!-- Bootstrap4 js-->
<script src="{{URL::asset('assets/plugins/bootstrap/popper.min.js')}}"></script>
<script src="{{URL::asset('assets/plugins/bootstrap/js/bootstrap.min.js')}}"></script>

<!--Othercharts js-->
<script src="{{URL::asset('assets/plugins/othercharts/jquery.sparkline.min.js')}}"></script>

<!-- Circle-progress js-->
<script src="{{URL::asset('assets/js/circle-progress.min.js')}}"></script>

<!-- Jquery-rating js-->
<script src="{{URL::asset('assets/plugins/rating/jquery.rating-stars.js')}}"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="{{ URL::asset('assets\js\lottie-player.js') }}"></script>

@yield('js')
<!-- Custom js-->
<script src="{{URL::asset('assets/js/custom.js')}}"></script>

<script>
	
	function confirmDelete(form) {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
				form.submit();
			}
		})
		return false;
	}

	@if(session('success'))
		const Toast = Swal.mixin({
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener("mouseenter", Swal.stopTimer);
				toast.addEventListener("mouseleave", Swal.resumeTimer);
			}
		});
		Toast.fire({
			icon: "success",
			title: "{{ session('success') }}"
		});
	@endif

	@if(session('error'))
		const Toast = Swal.mixin({
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener("mouseenter", Swal.stopTimer);
				toast.addEventListener("mouseleave", Swal.resumeTimer);
			}
		});
		Toast.fire({
			icon: "error",
			title: "{{ session('error') }}"
		});
	@endif
</script>