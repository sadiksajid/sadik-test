<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<!-- Meta data -->
		<meta charset="UTF-8">
		<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=0'>
		<meta content="Exxpress" name="description">
		<meta content="Exxpress" name="author">
		<meta name="keywords" content="Express ma"/>
		@include('admin.layouts.page.head')	
	</head>
	<body class="h-100vh bg-blue-sky ">
	<div class="box">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		@yield('content')	
		@include('admin.layouts.footer-scripts')	
	</body>
</html>