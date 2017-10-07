$(document).ready(function () {
  $('.nvb-collapse').click(function(){
    var showed = false;
    if(showed === false){
      $('nav a').css("visibility", "visible");
      $('nav a').css("display", "block");
      showed = true;
    }else{
      $('nav a').css("visibility", "hidden");
      $('nav a').css("display", "none");
      showed = false;
    }
  });
});
function goBack() {
    window.history.back();
}
function goHome() {
    window.location='/';
}
