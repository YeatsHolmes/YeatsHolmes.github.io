var wid =1300 ;
var heigh=800 ;
var r=8;
var balls=[];
var ohour=-1;
var ominute=-1;
var osecond=-1;
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
window.onload=function(){
var canvas= document.getElementById("canvas");
var context=canvas.getContext("2d");
canvas.width=wid;
canvas.height=heigh;
function update(){
 
   var date = new Date();
   var hour =date.getHours();
   var minute =date.getMinutes();
   var second =date.getSeconds();
   if(second!=osecond && osecond!=-1){
     if(parseInt(second/10)!=parseInt(osecond/10)){
   addballs(920,100,parseInt(osecond/10),context);
 }
   addballs(1080,100,parseInt(osecond%10),context);
   }

  if(minute!=ominute && ominute!=-1){
   if(parseInt(minute/10)!=parseInt(ominute/10)){
   addballs(500,100,parseInt(ominute/10),context);
}
   addballs(680,100,parseInt(ominute%10),context);
   }

   if(hour!=ohour && ohour!=-1){
      if(parseInt(hour/10)!=parseInt(ohour/10)){
   addballs(500,100,parseInt(ohour/10),context);
}
   addballs(680,100,parseInt(ohour%10),context);
}
   number(context,hour,minute,second);
   updateball(context);
}

setInterval(update,50);
}

function number(cxxt,hour,minute,second){
   cxxt.clearRect(0,0,1300,800);
   var cxxt=cxxt;
 
	drawa(100,100,parseInt(hour/10),cxxt);
   drawa(260,100,parseInt(hour%10),cxxt);
   drawa(420,100,10,cxxt);

   drawa(500,100,parseInt(minute/10),cxxt);
   drawa(680,100,parseInt(minute%10),cxxt);
   drawa(840,100,10,cxxt);

   drawa(920,100,parseInt(second/10),cxxt);
   drawa(1080,100,parseInt(second%10),cxxt);
   ohour=hour;
   ominute=minute;
   osecond=second;
 
 
   //addballs(500,100,parseInt(minute/10),cxxt);
  // addballs(680,100,parseInt(minute%10),cxxt);
 
   


}
function drawa(x,y,num,cxxt ){
	cxxt.fillStyle="black";
	for(var i=0;i<digit[num].length;i++){
         for(var j=0;j<digit[num][i].length;j++){
         	if(digit[num][i][j]==1){
         		cxxt.beginPath();
         		cxxt.arc(x+j*2*(r+1)+(r+1),y+i*2*(r+1)+(r+1),r,0,2*Math.PI);
         		cxxt.closePath();
         		cxxt.fill();
         	}
         }
	}
}
function addballs(x,y,num,cxxt){
   for(var i=0;i<digit[num].length;i++){
         for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
               cxxt.fillStyle=colors[(2*j+i)%9];
               cxxt.beginPath();
               cxxt.arc(x+j*2*(r+1)+(r+1),y+i*2*(r+1)+(r+1),r,0,2*Math.PI);
                  var aBall = {
                    x:x+j*2*(r+1)+(r+1),
                    y:y+i*2*(r+1)+(r+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 10,
                    vy:-5,color:colors[(2*j+i)%9]};
                balls.push(aBall);
               cxxt.closePath();
               cxxt.fill();
         
           
         }
   }
} 
}
function updateball(cxxt){
   for(var i=0;i<balls.length;i++){
 
      balls[i].vy=balls[i].vy+balls[i].g;
      balls[i].x=balls[i].x+balls[i].vx;
      balls[i].y=balls[i].y+balls[i].vy;
      if((balls[i].y+r)>800){
        balls[i].y=800-r;
        balls[i].vy=-balls[i].vy;
        balls[i].vy=0.5*balls[i].vy;
      }
      if((balls[i].x+r)>1300){
         balls[i].x=1300-r;
        balls[i].vx=-balls[i].vx;
      }
      cxxt.beginPath();
      cxxt.fillStyle=balls[i].color;
      cxxt.arc(balls[i].x,balls[i].y,r,0,2*Math.PI);
      cxxt.closePath();
      cxxt.fill();
  

     }
    for(var t=0;t<balls.length;t++){

      if(balls[t].x-r<0){
        arrayRemove(balls,t);
      }
     }
  console.log(balls.length);

  
}
function arrayRemove(a,i){
    for(var j=i;j<a.length;j++){
      a[j]=a[j+1];
    }
    a.pop();

  }






