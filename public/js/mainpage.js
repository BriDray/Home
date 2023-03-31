// SLIDE OUT MENU
document.addEventListener('DOMContentLoaded', function() {
    var elem = document.querySelector('.sidenav');
     M.Sidenav.init(elem, {});
    var instance = M.Sidenav.getInstance(elem);
    document.querySelector('#profile').addEventListener('click', function(){
        instance.open()
    })
  });