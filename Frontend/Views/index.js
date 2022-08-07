const getElements = async () => {

    const { results } = await fetch('/api/list').then(resp => resp.json());
    
    let html = '';

    results.forEach(video => {
        html += `
            <articles class="card click_card" data-poster="${video.banner}" data-name="${video.name}" data-video="${video.video}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img src="/media/${video.banner}" class="card-img-top" alt="${video.name}" data-poster="${video.banner}" data-name="${video.name}" data-video="${video.video}">
                <div class="card-body" data-name="${video.name}" data-poster="${video.banner}" data-video="${video.video}">
                    <p class="card-text" data-name="${video.name}" data-poster="${video.banner}" data-video="${video.video}">${video.name}</p>
                </div>
            </articles>
        `
    });

    const ref = document.querySelector('main');

    ref.innerHTML = html;

}
(async () => {
    await getElements();
    const cards = document.querySelectorAll('articles');

    cards.forEach(element => {
        element.addEventListener('click', (e) => {
	 console.log(e.target.dataset)
            const {name, video, poster} = e.target.dataset;
            const title = document.querySelector('.modal-title');
            const videoRef = document.querySelector('.modal-body');

            const split = video.split('.')
            const ext = split.pop()

            title.innerHTML = name;
            if (video !== "undefined") {
		console.log('join video')
		videoRef.innerHTML = `
                	<video 
                    		controls 
                    		poster="/media/${poster}"
                	>
                    		<source 
                        		src="/media/${video}"
                        		type="video/${ext}"
                    		>
                	</video>
            	`
	    }
	    else {
		videoRef.innerHTML = `
			<img
				class="max-h-100"
				src="/media/${poster}"
				alt="${name}"
			/>
		`
            }
        })
    });

    const closeModal = document.querySelector('.btn-close')

    closeModal.addEventListener('click', () => {
        const title = document.querySelector('.modal-title');
        const videoRef = document.querySelector('.modal-body');
        title.innerHTML = ''
        videoRef.innerHTML = ''
    })
})()