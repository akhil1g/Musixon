var blindingg = new Audio("music/blindinglights.mp3");
var b=document.getElementById("blinding");
b.addEventListener('click',function()
{
	blindingg.play();
});
document.addEventListener('key')