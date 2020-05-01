function on_prog(){
    setInterval(function(){
        var data=document.getElementById('pog_data').innerHTML;
        document.getElementById("prog_icon_id").setAttribute("style", "margin-left: "+data+";"); 
        console.log(data);
    },500);
}