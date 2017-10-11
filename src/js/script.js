(function(){
  let formWrap = document.querySelector('.form-wrap');
  let showBtn = document.querySelector('.btn-cta');
  let hideBtn = document.querySelector('.close-form');
  showBtn.addEventListener('click', openForm);
  hideBtn.addEventListener('click', closeForm);
  window.addEventListener('click', outsideClick);
  function openForm(){
    formWrap.style.display="block";
  }
  function closeForm(){
    formWrap.style.display="none";
  }
  function outsideClick(e){
    if(e.target == formWrap){
      formWrap.style.display="none";
    }
  }
})();
