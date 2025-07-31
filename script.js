document.addEventListener('keydown',function(e) {
    if (e.code==='Space') {
        const note = document.querySelector('.hello-note').classList.add('show');
    }
});