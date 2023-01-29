// Refresh the selectpicker 
function refresh(){
    console.log("Refresh test");
    $(".selectpicker").selectpicker("refresh");
}

function delay() {
    return new Promise( resolve => setTimeout(resolve, 10) );
}

function getCurrentImage(){
    return $('.swiper-slide-active img').attr('src');
}
