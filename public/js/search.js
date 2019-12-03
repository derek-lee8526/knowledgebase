document.addEventListener('DOMContentLoaded', function() {

    getSearchKeyword();
}, false);


function getSearchKeyword() {

    let input = document.getElementById('searchInput');

    input.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            console.log(input.value);
            window.location.href = `/search/${input.value}`;
        }
    })
}