<script lang="ts">
	import { liveQuery } from 'dexie';
	
	let files: FileList;
	let videoNode: HTMLVideoElement;
	let message = '';
	import { db, type VideoEvent } from './events.db';
	import { saveDbCSV, saveDbJSON } from './download';
	import { formatControl, formatTime } from './format';
	import SeekBar from './SeekBar.svelte';

	const defaultPlaybackRate = 1.5;

	const playSelectedFile = function (files: FileList) {
		if (!files || files.length == 0) return;

		if (files.length > 1) {
			message = 'Please select only one file.';
			return;
		}
		const file = files[0];

		var fileURL = URL.createObjectURL(file);
		videoNode.src = fileURL;
		videoNode.playbackRate = defaultPlaybackRate;
	};

	const seek = (seconds: number | undefined) => {
		if (typeof seconds == "undefined") return;
		videoNode.currentTime += seconds;
	};

	// when files changes, play the selected file
	$: playSelectedFile(files);

	

	let inputEventName = '';
	let playbackRate = defaultPlaybackRate;

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

	const eventNameChange = async (evt: any, eventId: any) => {
		// console.log('eventNameChange', evt.target.value, eventId);
		db.events.update(eventId, {name: evt.target.value})
	};

	const deleteEvent = (eventId: number) => {
		db.events.delete(eventId);
	}
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

			<SeekBar fileName={(files && files[0].name) ?? ''} {seek}/>

			
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
										>{formatTime(event.startTime)}
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
										>{formatTime(event.endTime)}
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
											on:change={(e)=>eventNameChange(e, event.id)}
										/>
									</td>
									<td>
										<button class="btn btn-warning" on:click={()=>deleteEvent(event.id)}>Delete</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}

				<div class="d-flex w-100 mt-auto">
					<button class="btn btn-primary me-2 flex-fill" on:click={async()=>saveDbJSON(await db.events.toArray(), files[0].name)}>Save JSON</button>
					<button class="btn btn-primary me-2 flex-fill" on:click={async()=>saveDbCSV(await db.events.toArray(), files[0].name)}>Save CSV</button>
					<button class="btn btn-outline-danger flex-fill" on:click={clearDb}>Clear</button>
				</div>
			</div>
		</div>
	</div>
</div>
