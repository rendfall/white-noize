window.onload = () => {
    let $div = document.getElementById('div');
    let $input = document.getElementById('input');

    $input.addEventListener('input', function (evt) {
        $div.innerText = this.value;
    });

    $input.addEventListener('blur', function (evt) {
        this.focus();
    });
};
