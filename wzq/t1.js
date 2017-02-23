var canvas = document.getElementById("chess");
var context = canvas.getContext("2d");
var me =true;
var over =false;
var chessBoardb = [];
for(var i=0;i<15;i++){
	chessBoardb[i] =[];
	for(var j=0;j<15;j++){
		chessBoardb[i][j] = 0;
	}
}
//赢法统计数组
var myWin =[];
var computerWin =[]; 
//赢法数组
var wins =[];
for(var i=0;i<15;i++){
	wins[i] =[];
	for(var j=0;j<15;j++){
		wins[i][j] = [];
	}
}

var count = 0;
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
	for(var k=0;k<5;k++){
	wins[i][j+k][count]=true;
}
count++;
}
}
//165

for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
	for(var k=0;k<5;k++){
	wins[j+k][i][count]=true;
}
count++;
}
}
//330

for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
	for(var k=0;k<5;k++){
	wins[i+k][j+k][count]=true;
}
count++;
}
}


for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
	for(var k=0;k<5;k++){
	wins[i+k][j-k][count]=true;
}
count++;
}
}
console.log(count);
//
for(var i =0;i<count;i++){
    myWin[i]=0;
    computerWin[i]=0;
}

context.strokeStyle ="#BFBFBF";
//var logo = new Image();
//logo.src="1.png";
//logo.onload=function(){

	//context.drawImage(logo,0,0,450,450);
    chessBoard();
//}
function chessBoard(){
for(var i=0;i<15;i++){
	
context.moveTo(i*30+15,15);
context.lineTo(i*30+15,435);
context.moveTo(15,i*30+15);
context.lineTo(435,i*30+15);
context.stroke();

}
}
function oneStep(i,j,me){
 context.beginPath();
 context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
 context.closePath();
 var gradient = context.createRadialGradient(15+i*30+2, 15+j*30-2, 13, 15+i*30+2, 15+j*30-2, 0);
 if (me) {
 	gradient.addColorStop(0,"#0A0A0A");
 	gradient.addColorStop(1,"#636766");
  }
  else{
    gradient.addColorStop(0,"#D1D1D1");
 	gradient.addColorStop(1,"#F9F9F9");
}

 context.fillStyle = gradient;
 context.fill();

}
chess.onclick= function(e){
	if(over){
		return;
	}
	if(!me){
		return;
	}
 var x = e.offsetX;
 var y = e.offsetY;
 var i = Math.floor(x/ 30);
 var j = Math.floor(y/ 30);
 if(chessBoardb[i][j]==0){
 	oneStep(i,j,me);
 	chessBoardb[i][j]=1;
 for(var k=0;k<count;k++){
 
 	if(wins[i][j][k]){
 		myWin[k]++;
 		
 		if(myWin[k]==5){
 		computerWin[k]=6;
 		window.alert("you win!");
 		over =true;

 	}
 	}	
 	
 }
 if(!over){
 	 me=!me;
 	computerAI();
 }
}
}

function computerAI(){
   var myScore=[];
   var computerScore=[];
   var max=0;
   var u=0,v=0;
   for(var i=0;i<15;i++){
   	myScore[i] = [];
   	computerScore[i] = [];
   	for(var j=0;j<15;j++){
   		myScore[i][j]=0;
   		computerScore[i][j]=0;
   	}
   }

   for(var i=0;i<15;i++){
   	for(var j=0;j<15;j++){
   		if(chessBoardb[i][j]==0){
   			for(var k=0;k<count;k++){
   				if(wins[i][j][k]){
   				if(myWin[k]==1){
   					myScore[i][j]+=200;
   				}
   				else if (myWin[k]==2) {
   					myScore[i][j]+=400;
   				}
   				else if (myWin[k]==3) {
   					myScore[i][j]+=2000;
   				}
   				else if (myWin[k]==4) {
   					myScore[i][j]+=20000;
   				}
   				if(computerWin[k]==1){
   					computerScore[i][j]+=210;
   				}
   				else if (computerWin[k]==2) {
   					computerScore[i][j]+=420;
   				}
   				else if (computerWin[k]==3) {
   					computerScore[i][j]+=2100;
   				}
   				else if (computerWin[k]==4) {
   					computerScore[i][j]+=20000;
   				}
   			}


   		}
   		/*if(myScore[i][j]>max){
   			max=myScore[i][j];
   			u=i;
   			v=j;
   		}
   		else if(myScore[i][j]==max){
   			if(computerScore[i][j]>computerScore[u][v]){
   				u=i;
   				v=j;
   			}
   		}
   		   if(computerScore[i][j]>max){
   			max=computerScore[i][j];
   			u=i;
   			v=j;
   		}
   		else if(computerScore[i][j]==max){
   			if(myScore[i][j]>myScore[u][v]){
   				u=i;
   				v=j;
   			}
   		}  原作者比较最大分值点方法*/
   		if(computerScore[i][j]>myScore[i][j]){
            if(computerScore[i][j]>max){
   			u=i;
   			v=j;
       
          max = computerScore[i][j];
      }
   		}
   		else{
   			if(myScore[i][j]>max){
   			max = myScore[i][j];
   			u=i;
   			v=j;
       
   			}
   		}//现创比较法
   	}
   }
   }
   oneStep(u,v,false);
   chessBoardb[u][v]=2;
    for(var k=0;k<count;k++){
 
 	if(wins[u][v][k]){
 		computerWin[k]++;
 		
 		if(computerWin[k]==5){
 		myWin[k]=6;
 		window.alert("AI win!");
 		over =true;

 	}
 	}	
 	
 }
 if(!over){
 	 me =!me
 }

}
