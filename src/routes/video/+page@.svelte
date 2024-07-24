<script lang="ts">
	import { liveQuery } from 'dexie';
	import FF from './FF.svelte';
	import RW from './RW.svelte';
	let files: FileList;
	let videoNode: HTMLVideoElement;
	let message = '';
	import { db, type Event } from './events.db';

	const defaultPlaybackRate = 1.5;

	const playSelectedFile = function (files: FileList) {
		if (!files || files.length == 0) return;

		if (files.length > 1) {
			message = 'Please select only one file.';
			return;
		}
		const file = files[0];
		// console.log('file:', file);

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
		videoNode.playbackRate = defaultPlaybackRate;
	};

	const seek = (seconds: number) => {
		videoNode.currentTime += seconds;
	};

	// when files changes, play the selected file
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
	let playbackRate = defaultPlaybackRate;
	// $: console.log('playbackRate:', playbackRate);

	let events = liveQuery(() => db.events.toArray());

	const eventStart = () => {
		// if event timestamp aldrady exists, update it
		// else, add new event
		const time = videoNode.currentTime;
		db.events
			.where('startTime')
			.equals(time)
			.first((event) => {
				if (event) {
					db.events.update(event.id, { name: inputEventName });
				} else {
					db.events.add({ startTime: time, name: inputEventName });
				}
			});
	};

	const eventEnd = () => {
		// 1. get most recent event with a start timestamp
		// 2. if found, add an end timestamp
		// 3. if not found, add event with end timestamp
		// db.events.add({ endTime: videoNode.currentTime, name: inputEventName });

		const time = videoNode.currentTime;

		db.events
			.where('startTime')
			.below(time)
			.reverse()
			.first((event) => {
				if (event) {
					db.events.update(event.id, { endTime: time });
				} else {
					db.events.add({ endTime: time, name: inputEventName });
				}
			});
	};

	const clearDb = () => {
		confirm('Are you sure you want to clear all events?') && db.events.clear();
	};

	const arrayToCsv = (data) => {
		if (!data || !data.length) {
			return '';
		}

		const headers = Object.keys(data[0]);
		const csvRows = [];

		// Add the headers to the first row
		csvRows.push(headers.join(','));

		// Map the data to rows
		data.forEach((row) => {
			const values = headers.map((header) => {
				const escaped = ('' + row[header]).replace(/"/g, '\\"');
				return `"${escaped}"`;
			});
			csvRows.push(values.join(','));
		});

		// Join rows with new lines
		return csvRows.join('\n');
	};

	// const arrayToCsv = (events: Event[]): string => {

	// 	for(const event of events) {

	// 	}

	// }

	const arrayToJSON = (events: Event[]) => {
		return JSON.stringify(events ?? [], null, 2);
	};

	const downloadData = (data: Blob, fileName: string) => {
		const url = URL.createObjectURL(data);
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		a.click();
	};

	const saveDbCSV = async () => {
		const events = await db.events.toArray();
		const fileName = files[0].name;

		const csvData = arrayToCsv(events);
		const blob = new Blob([csvData], { type: 'text/csv' });

		downloadData(blob, `events-${fileName}.csv`);
	};

	const saveDbJSON = async () => {
		const events = await db.events.toArray();
		const fileName = files[0].name;

		const jsonData = arrayToJSON(events);
		const blob = new Blob([jsonData], { type: 'application/json' });

		downloadData(blob, `events-${fileName}.json`);
	};

	const eventNameChange = async (evt, id) => {
		console.log('eventNameChange', evt, id);
	};

	$: console.log('events:', events);
</script>

<div class="container-fluid">
	<div class="row vh-100">
		<div class="col-md-7 p-2" style="border: 1px solid black">
			<div>{message}</div>

			<div style="height: 60vh" class="d-flex justify-content-center align-items-center">
				<input type="file" accept="video/*" bind:files class:d-none={files && files.length > 0} />
				<!-- svelte-ignore a11y-media-has-caption -->
				<video
					controls
					bind:this={videoNode}
					style="height: 100%;"
					muted
					bind:playbackRate
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
				<h3>{(files && files[0].name) ?? ''}</h3>
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
					<button class="btn btn-primary flex-fill" on:click={eventEnd}>Event Stop</button>
				</div>

				<!-- <button class="btn btn-primary mt-2 w-100">Event Stop + Start New</button> -->

				<input
					type="text"
					class="form-control mt-2"
					placeholder="Event Name"
					bind:value={inputEventName}
				/>

				<!-- <hr /> -->
				<h2 class="mt-2">Events</h2>
				{#if $events}
					<table class="table">
						<thead>
							<tr>
								<th>Start</th>
								<th>End</th>
								<th>Name</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{#each $events as event (event.id)}
								<tr>
									<td
										>{formatControl(event.startTime)}
										{#if typeof event.startTime != 'undefined'}
											<button
												class="btn btn-primary"
												on:click={() => {
													seek(event.startTime);
												}}>Seek</button
											>
										{/if}
									</td>
									<td
										>{event.endTime ?? ''}
										{#if typeof event.endTime != 'undefined'}
											<button
												class="btn btn-primary"
												on:click={() => {
													seek(event.endTime);
												}}>Seek</button
											>
										{/if}</td
									>
									<td>
										<input
											type="text"
											value={event.name}
											class="form-control"
											on:change={(e) => eventNameChange(e, event.id)}
										/>
									</td>
									<td>
										<button class="btn btn-warning">Delete</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}

				<div class="d-flex w-100 mt-auto">
					<button class="btn btn-primary me-2 flex-fill" on:click={saveDbJSON}>Save JSON</button>
					<button class="btn btn-primary me-2 flex-fill" on:click={saveDbCSV}>Save CSV</button>
					<button class="btn btn-outline-danger flex-fill" on:click={clearDb}>Clear</button>
				</div>
			</div>
		</div>
	</div>
</div>
