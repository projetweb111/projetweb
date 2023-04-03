<script lang="ts">
	export let PostTitle: string;
	export let PostAssociation: string;
	// export let PostAuthorSurname: string;

	export let PostContent: string;
	// export let PostLikes: number;
	export let PostDate: string;

	import '../styles.css';
</script>

<div id="postHolder">
	<div id="postHeader">
		<div id="postPFP" />
		<div id="postMainInfo">
			<h1>{PostTitle}</h1>
			<div id="authorInfo">
				<h2>{PostAssociation}</h2>
			</div>
		</div>
		<div id="postDate">
			<p id="date">{PostDate}</p>
		</div>
	</div>
	<p id="postContent">{PostContent}</p>
</div>

<style>
	#postHolder {
		border-radius: 1rem;
		background-color: var(--custom-color3);
		margin-top: 1rem;
		margin-bottom: 1rem;
		padding: 1rem;
	}

	#postHeader {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	#postPFP {
		background-color: blue;
		width: 3.8rem;
		height: 3.8rem;
		border-radius: 50%;
		margin-right: 1rem;
	}

	#postMainInfo {
		flex-grow: 3;
		display: flex;
		flex-direction: column;
	}

	#postHolder h1 {
		font-size: 1.4rem;
		font-family: var(--custom-font2);
		font-weight: 500;
		margin: 0px;
	}

	#authorInfo {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	#postHolder h2 {
		font-size: 1rem;
		font-family: var(--custom-font2);
		font-weight: 200;
		font-style: italic;
		padding-top: 0.5rem;
		margin: 0px;
	}

	#date {
		font-size: 0.9rem;
		font-family: var(--custom-font2);
		font-weight: 200;
		font-style: italic;
		margin: 0px;
		margin-right: 1rem;
		padding-right: 0.5rem;
	}

	#postContent {
		font-size: 1rem;
		font-family: var(--custom-font2);
		font-weight: 300;
		margin: 1rem;
		margin-top: 1.5rem;
	}

	/* hr {
		display: block;
		height: 1px;
		border: 0;
		border-top: 1.5px solid var(--custom-color);
		margin-top: 2em;
		margin-left: 1rem;
		margin-right: 1rem;
		padding: 0;
	}

	#postLikes {
		font-size: 1rem;
		font-family: var(--custom-font2);
		font-weight: 400;
		margin: 0rem;
		margin-top: 0.8rem;

		font-style: italic;

		padding-right: 3rem;

		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	} */
</style>
