const svg1 = document.querySelector('.bi-arrow-down-left-circle');
const button = document.querySelector('.j-btn-test');

button.addEventListener('click',()=>{
    svg1.classList.toggle('bi-arrow-down-left-circle-fill');
})