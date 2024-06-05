<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

	let isAdmin = ['techplex.engineer@gmail.com', 'blake@team4909.org'].includes(
		$page.data.session?.user?.email || ''
	);
</script>

<nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">Event Registration</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarColor01"
			aria-controls="navbarColor01"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarColor01">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a
						class="nav-link {$page.url.pathname === '/' ? 'active' : ''}"
						aria-current="page"
						href="/">Home</a
					>
				</li>
				<!-- <li class="nav-item">
					<a class="nav-link" href="#">Features</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">Pricing</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">About</a>
				</li> -->
			</ul>
			<form class="d-flex">
				{#if $page.data.session}
					<a class="btn btn-info" on:click={signOut}>Sign Out</a>
				{:else}
					<a class="btn btn-primary" on:click={signIn}>Sign In</a>
				{/if}
			</form>
		</div>
	</div>
</nav>
