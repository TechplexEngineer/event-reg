<script lang="ts">
	import { page } from '$app/stores';

	const links = [
		{
			name: "Home",
			path: "/"
		},{
			name: "Video",
			path: "/video"
		}
	]
</script>

<nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
	<div class="container-fluid">
		<a class="navbar-brand" href="/" title="Amazon Robotics Process Engineer Tools">AR PE Tools</a>
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
				{#each links as link (link.name)}
					<li class="nav-item">
						<a
							class="nav-link {$page.url.pathname === link.path ? 'active' : ''}"
							aria-current="page"
							href={link.path}>{link.name}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>
