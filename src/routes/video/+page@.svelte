<script lang="ts">
	import { liveQuery } from 'dexie';
	import FF from './FF.svelte';
	import RW from './RW.svelte';
	let files: FileList;
	let videoNode: HTMLVideoElement;
	let message = '';
	import { db } from './events.db';

	const playSelectedFile = function (files: FileList) {
		if (!files || files.length == 0) return;

		if (files.length > 1) {
			message = 'Please select only one file.';
			return;
		}
		const file = files[0];
		console.log('file:', file);

		// const type = file.type;
		// const canPlay = videoNode.canPlayType(type);

		// console.log('canPlay:', file);

		// switch (canPlay) {
		// 	case 'maybe':
		// 		message = 'Your browser thinks it can play this type of file, but is not sure.';
		// 		break;
		// 	case 'probably':
		// 		message = 'Your browser thinks it can play this type of file.';
		// 		break;
		// 	case '':
		// 		message = 'Your browser does not think it can play this type of file.';
		// 		return; // bail
		// }

		// console.log('message:', message);

		var fileURL = URL.createObjectURL(file);
		videoNode.src = fileURL;
	};

	const seek = (seconds: number) => {
		videoNode.currentTime += seconds;
	};

	$: playSelectedFile(files);

	const controls: number[] = [
		-5 * 60,
		-2 * 60,
		-1 * 60,
		-20,
		-10,
		-5,
		5,
		10,
		20,
		1 * 60,
		2 * 60,
		5 * 60
	];

	const formatControl = (amt: number) => {
		const absAmt = Math.abs(amt);
		const minutes = Math.floor(absAmt / 60);
		const remainingSeconds = absAmt % 60;
		const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
		return `${minutes}:${formattedSeconds}`;
	};

	// let events: any[] = [];
	let inputEventName = '';

	let events = liveQuery(() => db.events.toArray());

	const eventStart = () => {
		console.log('eventStart');

		db.events.add({ type: 'start', time: videoNode.currentTime, name: inputEventName });

		// events = [...events, { type: 'start', time: videoNode.currentTime, name: inputEventName }];
	};

	$: console.log('events:', events);
</script>

<div class="container-fluid">
	<div class="row vh-100">
		<div class="col-md-9 p-2" style="border: 1px solid black">
			<div>{message}</div>

			<div style="height: 60vh" class="d-flex justify-content-center align-items-center">
				<input type="file" accept="video/*" bind:files class:d-none={files && files.length > 0} />
				<!-- svelte-ignore a11y-media-has-caption -->
				<video
					controls
					bind:this={videoNode}
					style="height: 100%;"
					class:d-none={!(files && files.length > 0)}
				/>
			</div>

			<div class="d-flex justify-content-between mt-4">
				<div class="btn-group" role="group">
					{#each controls.filter((c) => c < 0) as control}
						<button type="button" class="btn btn-outline-secondary" on:click={() => seek(control)}
							><RW /> {formatControl(control)}</button
						>
					{/each}
				</div>
				<div class="btn-group" role="group">
					{#each controls.filter((c) => c > 0) as control}
						<button type="button" class="btn btn-outline-secondary" on:click={() => seek(control)}
							>{formatControl(control)} <FF /></button
						>
					{/each}
				</div>
			</div>
		</div>
		<div class="col p-2" style="border: 1px solid black">
			<div style="height: 100%" class="d-flex flex-column align-items-start">
				<div class="d-flex w-100">
					<button class="btn btn-primary me-2 flex-fill" on:click={eventStart}>Event Start</button>
					<button class="btn btn-primary flex-fill">Event Stop</button>
				</div>

				<button class="btn btn-primary mt-2 w-100">Event Stop + Start New</button>

				<input
					type="text"
					class="form-control mt-2"
					placeholder="Event Name"
					bind:value={inputEventName}
				/>

				<!-- <hr /> -->
				<h2 class="mt-2">Events</h2>
				<ul>
					{#if $events}
						{#each $events as event}
							<li>{JSON.stringify(event)}</li>
						{/each}
					{/if}
				</ul>

				<button class="btn btn-primary w-100 mt-auto">Save</button>
			</div>
		</div>
	</div>
</div>
