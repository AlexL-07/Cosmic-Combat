!function(){"use strict";!function(){var t=class{constructor(t,e,i,s,n,h){this.x=t,this.y=e+10,this.xVel=i,this.yVel=s,this.time=0,this.radius=10,this.ctx=n,this.weight=.055,this.damage=150,this.hitObject=null,this.explosionRadius=50,this.ctxTerrain=h,this.sprite=new Image,this.sprite.src="./assets/small_blue_fireball.png",this.windAngle=window.map.windAngle,this.windSpeed=window.map.windSpeed}render(t){"spaceship"===this.collisionCheck(this.x,this.y,2*this.radius,2*this.radius)?(window.game.removeObject(this),window.map.weapon=this,window.ctxText.font="20px sans-serif",window.ctxText.fillStyle="red",window.ctxText.fillText("-"+this.damage.toString(),this.x,this.y-20),this.hitObject.health>0&&(this.hitObject.health-=this.damage,this.hitObject.health<=0&&(window.spaceShips.splice(window.spaceShips.indexOf(this.hitObject),1),window.game.turnCounter--),document.getElementById("overlay").classList.add("hidden"),window.game.time=window.game.TIMEOUT,clearInterval(window.game.interval),clearTimeout(window.game.timeout),window.game.startTurns()),window.setTimeout((()=>{window.ctxText.clearRect(0,0,window.canText.width,window.canText.height),this.hitObject=null}),1250)):"terrain"===this.collisionCheck(this.x,this.y,2*this.radius,2*this.radius)?(window.game.removeObject(this),window.map.weapon=this,document.getElementById("overlay").classList.add("hidden"),window.game.time=window.game.TIMEOUT,clearInterval(window.game.interval),clearTimeout(window.game.timeout),window.game.startTurns()):(this.x+=this.xVel+.02*this.windSpeed*Math.cos(this.windAngle*Math.PI/180)*this.time,this.y+=this.yVel+.5*this.weight*this.time*this.time-.02*this.windSpeed*Math.sin(this.windAngle*Math.PI/180)*this.time,t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.drawImage(this.sprite,this.x,this.y),t.closePath(),this.time+=.5)}collisionCheck(t,e,i,s){for(let t=0;t<window.spaceShips.length;t++)if(this.isCollidedWith(window.spaceShips[t]))return this.hitObject=window.spaceShips[t],"spaceship";let n=[];for(let h=0;h<i;h++)for(let i=0;i<s;i++)n.push([t+h,e+i]);for(let t=0;t<n.length;t++)if(0!=this.ctxTerrain.getImageData(n[t][0],n[t][1],1,1).data[0]||0!=this.ctxTerrain.getImageData(n[t][0],n[t][1],1,1).data[1]||0!=this.ctxTerrain.getImageData(n[t][0],n[t][1],1,1).data[2]||0!=this.ctxTerrain.getImageData(n[t][0],n[t][1],1,1).data[3])return"terrain";return!1}isCollidedWith(t){const e=this.x+this.radius,i=this.y+this.radius,s=t.x+t.width/2,n=t.y+t.height/2;return this.radius+t.radius>Math.sqrt((e-s)*(e-s)+(i-n)*(i-n))}},e=class extends t{constructor(t,e,i,s,n,h){super(t,e,i,s,n,h)}},i=class extends t{constructor(t,e,i,s,n,h){super(t,e,i,s,n,h),this.sprite.src="./assets/30new.png",this.radius=20,this.damage=100,this.explosionRadius=100}},s=class extends t{constructor(t,e,i,s,n,h){super(t,e,i,s,n,h),this.sprite.src="./assets/small_pink_fireball.png",this.radius=10,this.damage=70,this.explosionRadius=50}},n=class{constructor(t,e,i,s,n){this.username=t,this.x=e,this.y=i,this.ctx=s,this.ctxTerrain=n,this.width=65,this.height=40,this.maxHealth=1e3,this.health=1e3,this.currentWeapon=1,this.power=0,this.prevPower=0,this.velX=0,this.velY=0,this.prevAngle=0,this.maxAngle=93,this.minAngle=37,this.angle=Math.floor((this.maxAngle+this.minAngle)/2),this.delay=0,this.distance=0,this.maxDistance=80,this.radius=this.width/2,this.weapon3CD=0,this.x<500?this.face="right":this.face="left",s.fillStyle="rgba(255,0,0,1)",this.weaponSpeed=.25,this.spriteLeft=new Image,this.spriteLeft.src="./assets/spaceship2_left.png",this.spriteRight=new Image,this.spriteRight.src="./assets/spaceship2_right.png",this.collisionCheck=this.collisionCheck.bind(this),this.render=this.render.bind(this),this.draw=this.draw.bind(this),this.shoot=this.shoot.bind(this),this.changeAngle=this.changeAngle.bind(this),this.switchWeapon1=this.switchWeapon1.bind(this),this.switchWeapon2=this.switchWeapon2.bind(this),this.switchWeapon3=this.switchWeapon3.bind(this)}draw(){(Math.abs(this.x)>window.UI.canvas.width||Math.abs(this.y)>window.UI.canvas.height)&&(this.turnOver=!0),window.UI.ctx.fillStyle="rgba(255,0,0,1)",window.UI.ctx.fillRect(this.x-25,this.y+this.height+15,this.width+30,4),window.UI.ctx.fillStyle="rgba(0,255,0,1)",window.UI.ctx.fillRect(this.x-25,this.y+this.height+15,(this.width+30)*(this.health/this.maxHealth),4),window.UI.ctx.font="14px sans-serif",window.UI.ctx.fillStyle="white",window.UI.ctx.fillText(this.username,this.x+23,this.y+this.height+35),"right"==this.face?(this.ctx.drawImage(this.spriteRight,this.x-25,this.y-25),window.UI.ctx.beginPath(),window.UI.ctx.arc(this.x+60,this.y,50,(20-this.angle)*Math.PI/180,(-this.angle-20)*Math.PI/180,!0),window.UI.ctx.strokeStyle="rgba(255,255,255,0.7)",window.UI.ctx.stroke(),window.UI.ctx.closePath(),window.UI.ctx.beginPath(),window.UI.ctx.arc(this.x+60,this.y,50,(5-this.angle)*Math.PI/180,(-this.angle-5)*Math.PI/180,!0),window.UI.ctx.strokeStyle="rgba(255,0,0,0.7)",window.UI.ctx.stroke(),window.UI.ctx.closePath(),window.UI.ctx.beginPath(),window.UI.ctx.arc(this.x+60,this.y,45,(2-this.angle)*Math.PI/180,(-this.angle-2)*Math.PI/180,!0),window.UI.ctx.strokeStyle="rgba(255,0,0,1)",window.UI.ctx.stroke(),window.UI.ctx.closePath()):"left"==this.face&&(this.ctx.drawImage(this.spriteLeft,this.x-10,this.y-25),window.UI.ctx.beginPath(),window.UI.ctx.arc(this.x+5,this.y,50,(this.angle+20+180)*Math.PI/180,(this.angle-20+180)*Math.PI/180,!0),window.UI.ctx.strokeStyle="rgba(255,255,255,0.7)",window.UI.ctx.stroke(),window.UI.ctx.closePath(),window.UI.ctx.beginPath(),window.UI.ctx.arc(this.x+5,this.y,50,(this.angle+5+180)*Math.PI/180,(this.angle-5+180)*Math.PI/180,!0),window.UI.ctx.strokeStyle="rgba(255,0,0,0.7)",window.UI.ctx.stroke(),window.UI.ctx.closePath(),window.UI.ctx.beginPath(),window.UI.ctx.arc(this.x+5,this.y,45,(this.angle+2+180)*Math.PI/180,(this.angle-2+180)*Math.PI/180,!0),window.UI.ctx.strokeStyle="rgba(255,0,0,1)",window.UI.ctx.stroke(),window.UI.ctx.closePath()),this.ctx.restore()}render(t){switch(this.currentWeapon){case 1:document.getElementById("light1").style.background="rgb(0,255,0)",document.getElementById("light2").style.background="rgb(60,60,60)",document.getElementById("light3").style.background="rgb(60,60,60)";break;case 2:document.getElementById("light2").style.background="rgb(0,255,0)",document.getElementById("light1").style.background="rgb(60,60,60)",document.getElementById("light3").style.background="rgb(60,60,60)";break;case 3:document.getElementById("light3").style.background="rgb(255,0,0)",document.getElementById("light1").style.background="rgb(60,60,60)",document.getElementById("light2").style.background="rgb(60,60,60)"}this.move(),this.draw()}collisionCheck(t,e,i,s){let n=[];for(let h=0;h<i;h++)for(let i=0;i<s;i++)n.push([t+h,e+i]);for(let t=0;t<n.length;t++)if(0!=this.ctxTerrain.getImageData(n[t][0],n[t][1],1,1).data[0]||0!=this.ctxTerrain.getImageData(n[t][0],n[t][1],1,1).data[1]||0!=this.ctxTerrain.getImageData(n[t][0],n[t][1],1,1).data[2]||0!=this.ctxTerrain.getImageData(n[t][0],n[t][1],1,1).data[3])return!0;return!1}move(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1?arguments[1]:void 0;if(e)this.distance++,"left"!=e||this.collisionCheck(this.x-1,this.y,1,this.height/1.5)||(this.face="left",this.distance<this.maxDistance&&(this.x+=t,this.collisionCheck(this.x,this.y+this.height-1,this.width,1)&&(this.y-=1))),"right"!=e||this.collisionCheck(this.x+this.width+1,this.y,1,this.height/1.5)||(this.face="right",this.distance<this.maxDistance&&(this.x+=t,this.collisionCheck(this.x,this.y+this.height-1,this.width,1)&&(this.y-=1)));else if(this.x=this.x,this.collisionCheck(this.x,this.y+this.height+1,this.width,1))for(;this.collisionCheck(this.x,this.y+this.height-1,this.width,1);)this.y-=1;else this.y+=6}shoot(t){if(this.turnOver=!0,1===this.currentWeapon?this.delay+=100:2===this.currentWeapon?this.delay+=300:3===this.currentWeapon&&(this.delay+=1e3,this.weapon3CD=3,document.getElementById("overlay").classList.remove("hidden")),this.weapon3CD>0&&this.weapon3CD--,"right"===this.face){if(1===this.currentWeapon)return new e(this.x+this.width,this.y-30,t*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),-t*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),this.ctx,this.ctxTerrain);if(2===this.currentWeapon)return new i(this.x+this.width,this.y-15,t*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),-t*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),this.ctx,this.ctxTerrain);{this.currentWeapon=1;let e=0,i=[];for(;e<5;){const n=new s(this.x+this.width+Math.floor(99*Math.random()+1),this.y-this.height-20,t*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),-t*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),this.ctx,this.ctxTerrain);i.push(n),e++}return i}}if("left"===this.face){if(1===this.currentWeapon)return new e(this.x-this.width,this.y-20,-t*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),-t*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),this.ctx,this.ctxTerrain);if(2===this.currentWeapon)return new i(this.x-this.width,this.y-20,-t*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),-t*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),this.ctx,this.ctxTerrain);{this.currentWeapon=1;let e=0,i=[];for(;e<5;){const n=new s(this.x+this.width+Math.floor(99*Math.random()-100),this.y-this.height-20,-t*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),-t*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),this.ctx,this.ctxTerrain);i.push(n),e++}return i}}}changeAngle(t){t>0?this.angle+t<=this.maxAngle&&(this.prevAngle=this.angle,this.angle+=t):t<0&&this.angle+t>=this.minAngle&&(this.prevAngle=this.angle,this.angle+=t)}switchWeapon1(t){this.currentWeapon=1}switchWeapon2(t){this.currentWeapon=2}switchWeapon3(t){this.currentWeapon=3}};const h=document.getElementById("canvas"),a=h.getContext("2d"),r=document.getElementById("terrain-canvas"),o=r.getContext("2d"),c=document.getElementById("ui-canvas"),d=(c.getContext("2d"),document.getElementById("text-canvas")),l=d.getContext("2d"),w=document.getElementById("background"),g=w.getContext("2d"),u=document.getElementById("start-button"),m=document.getElementById("instructions-button"),p=document.getElementById("instructions-back");let y=new class{constructor(t,e,i,s,h,a,r,o){this.canvas=t,this.ctx=e,this.ctxTerrain=i,this.canTerrain=s,this.background=r,this.ctxBG=o,this.map=new class{constructor(t,e){this.ctx=t,this.canvas=e,this.img=new Image,this.img.src="./assets/map_2.png",this.buffer=document.createElement("canvas"),this.buffer.width=this.canvas.width,this.buffer.height=this.canvas.height,this.windSpeed=Math.floor(12*Math.random()+0),this.windAngle=360*Math.random(),this.img.onload=()=>{this.ctx.drawImage(this.img,50,320),this.data=this.ctx.getImageData(0,0,this.img.width,this.img.height)},this.weapon=null,this.holes=[]}render(t){this.data&&this.ctx.putImageData(this.data,0,0),this.canvas.getContext("2d").drawImage(this.buffer,0,0),this.weapon&&(this.ctx.globalCompositeOperation="destination-out",this.ctx.strokeStyle="#000",this.ctx.beginPath(),this.ctx.arc(this.weapon.x,this.weapon.y,this.weapon.explosionRadius,0,2*Math.PI),this.ctx.fill(),this.weapon=null,this.data=this.ctx.getImageData(0,0,this.img.width,this.img.height),this.ctx.globalCompositeOperation="source-over"),document.getElementById("wind-text").innerHTML=`${this.windSpeed}`,window.UI.ctx.beginPath(),window.UI.ctx.arc(this.canvas.width/2,45,40,(10-this.windAngle)*Math.PI/180,(-this.windAngle-10)*Math.PI/180,!0),window.UI.ctx.strokeStyle="rgba(255,0,0,255)",window.UI.ctx.lineWidth=10,window.UI.ctx.stroke(),window.UI.ctx.closePath(),window.UI.ctx.lineWidth=2}changeWind(){this.windSpeed=Math.floor(12*Math.random()+0),this.windAngle=360*Math.random()}}(this.ctxTerrain,this.canTerrain),this.spaceship1=new n("Player 1",80,-200,e,i),this.spaceship2=new n("Player 2",380,-200,e,i),this.spaceship3=new n("Player 3",750,-200,e,i),this.spaceship4=new n("Player 4",1050,-200,e,i),this.currentPlayer=this.spaceship1,this.TIMEOUT=30,this.time=30,this.turnCounter=1,this.roundCounter=0,this.objects=[],this.UI=new class{constructor(t){this.game=t,this.canvas=document.getElementById("ui-canvas"),this.ctx=this.canvas.getContext("2d"),this.ctx.fillStyle="white",this.ctx.font="20px sans-serif",window.UI=this,this.disabled=!1}startAdjustPower(){if(!this.disabled){const t=document.getElementById("power-fill");let e=parseInt(t.style.width.slice(0,-2));this.interval||(this.interval=setInterval((()=>{e=parseInt(t.style.width.slice(0,-2)),e<1e3&&(t.style.width=e+5+"px")}),6))}}stopAdjustPower(t){if(!this.disabled){window.UI.disabled=!0,clearInterval(this.interval),this.interval=null;const e=document.getElementById("power-fill"),i=document.getElementById("power-container");let s=parseInt(e.style.width.slice(0,-2))/parseInt(i.style.width.slice(0,-2))*100;t.prevPower=s/100*1e3,setTimeout((()=>{e.style.width="5px",this.game.addObject(t.shoot(s))}),100)}}}(this),this.backgroundImg=new Image,this.backgroundImg.src="./assets/bg2.png",this.bindKeyDown=this.bindKeyDown.bind(this),this.bindKeyUp=this.bindKeyUp.bind(this),window.game=this,window.spaceShips=[this.spaceship1,this.spaceship2,this.spaceship3,this.spaceship4].sort((()=>Math.random()-.5)),window.canText=h,window.ctxText=a,window.keyDown=window.addEventListener("keydown",this.bindKeyDown),window.keyUp=window.addEventListener("keyup",this.bindKeyUp),this.startTurns=this.startTurns.bind(this),this.render=this.render.bind(this),this.theme=document.createElement("audio"),this.theme.src="./assets/theme.mp3",this.theme.id="theme",this.theme.loop=!0,this.theme.volume=.3,this.turn=document.createElement("audio"),this.turn.src="./assets/turn.mp3",this.turn.id="turn",this.turn.volume=.3,this.win=document.createElement("audio"),this.win.src="./assets/win.mp3",this.win.id="win",this.win.volume=.3,this.wind=document.createElement("audio"),this.wind.src="./assets/wind.mp3",this.wind.id="wind",this.wind.volume=.3}bindKeyDown(t){const e=t.key;"a"==e&&this.currentPlayer.move(-1.5,"left"),"d"==e&&this.currentPlayer.move(1.5,"right"),"w"==e&&this.currentPlayer.changeAngle(2),"s"==e&&this.currentPlayer.changeAngle(-2)," "==e&&(t.preventDefault(),this.UI.startAdjustPower())}bindKeyUp(t){" "==t.key&&this.UI.stopAdjustPower(this.currentPlayer)}addObject(t){t instanceof Array?this.objects=this.objects.concat(t):this.objects.push(t)}removeObject(t){this.objects.splice(this.objects.indexOf(t),1)}render(){this.ctx.clearRect(0,0,canvas.width,canvas.height),window.UI.ctx.clearRect(0,0,window.UI.canvas.width,window.UI.canvas.height),this.ctxBG.drawImage(this.backgroundImg,0,0,this.canvas.width,this.canvas.height),window.map.render(this.ctxTerrain),window.spaceShips.length>1&&("right"===this.currentPlayer.face?(window.UI.ctx.fillStyle="rgba(220,190,90,1)",window.UI.ctx.fillRect(this.currentPlayer.x-15,this.currentPlayer.y-70,30,25),window.UI.ctx.strokeStyle="rgba(0,0,0,1)",window.UI.ctx.strokeRect(this.currentPlayer.x-15,this.currentPlayer.y-70,30,25),window.UI.ctx.font="20px sans-serif",window.UI.ctx.fillStyle="white",window.UI.ctx.textAlign="center",window.UI.ctx.fillText(this.time.toString(),this.currentPlayer.x,this.currentPlayer.y-51)):"left"===this.currentPlayer.face&&(window.UI.ctx.fillStyle="rgba(220,190,90,1)",window.UI.ctx.fillRect(this.currentPlayer.x+33,this.currentPlayer.y-70,30,25),window.UI.ctx.strokeStyle="rgba(0,0,0,1)",window.UI.ctx.strokeRect(this.currentPlayer.x+33,this.currentPlayer.y-70,30,25),window.UI.ctx.font="20px sans-serif",window.UI.ctx.fillStyle="white",window.UI.ctx.textAlign="center",window.UI.ctx.fillText(this.time.toString(),this.currentPlayer.x+48,this.currentPlayer.y-51)));for(let t=0;t<window.spaceShips.length;t++)window.spaceShips[t].render(this.ctx,this.ctxTerrain),window.spaceShips[t]&&(Math.abs(window.spaceShips[t].x)>this.canvas.width||Math.abs(window.spaceShips[t].y)>this.canvas.height)&&(window.spaceShips.splice(t,1),clearInterval(window.game.interval),clearTimeout(window.game.timeout),window.game.startTurns());for(let t=0;t<this.objects.length;t++)this.objects[t].render(this.ctx),this.objects[t]&&(Math.abs(this.objects[t].x)>1800||Math.abs(this.objects[t].y)>1800)&&(this.objects.splice(t,1),document.getElementById("overlay").classList.add("hidden"),window.game.time=window.game.TIMEOUT,clearInterval(this.interval),clearTimeout(this.timeout),this.startTurns());document.getElementById("angle-display").innerHTML=this.currentPlayer.prevAngle}startTurns(){this.turn.play(),window.UI.disabled=!1,window.removeEventListener("keypress",this.shotKeys),window.removeEventListener("keypress",this.shotKey3),window.spaceShips.sort(((t,e)=>t.delay-e.delay)),this.currentPlayer===window.spaceShips[0]&&2!==window.spaceShips.length&&window.spaceShips.push(window.spaceShips.shift()),this.currentPlayer=window.spaceShips[0],this.currentPlayer.delay=0,this.currentPlayer.distance=0,document.getElementById("prev-power").style.left=`${this.currentPlayer.prevPower}px`;0!==this.roundCounter&&this.roundCounter%3==0&&1===this.turnCounter&&(this.wind.play(),this.map.changeWind()),document.getElementById("turn-queue").innerHTML="";for(let t=0;t<window.spaceShips.length;t++){let e=document.createElement("li");e.innerHTML=`${window.spaceShips[t].username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${window.spaceShips[t].delay}`,document.getElementById("turn-queue").appendChild(e)}window.addEventListener("keypress",(t=>{t.key,"1"==t.key&&this.currentPlayer.switchWeapon1(),"2"==t.key&&this.currentPlayer.switchWeapon2()})),document.getElementById("weapon1").onclick=this.currentPlayer.switchWeapon1,document.getElementById("weapon2").onclick=this.currentPlayer.switchWeapon2,this.currentPlayer.weapon3CD<=0?(window.addEventListener("keypress",(t=>{t.key,"3"==t.key&&this.currentPlayer.weapon3CD<=0&&this.currentPlayer.switchWeapon3()})),document.getElementById("weapon3").onclick=this.currentPlayer.switchWeapon3,document.getElementById("weapon3").style.background="rgb(246, 216, 89)"):document.getElementById("weapon3").style.background="rgb(60,60,60)",this.currentPlayer.turnOver=!1,window.spaceShips.push(window.spaceShips.shift()),this.turnCounter%window.spaceShips.length==0?(this.roundCounter++,this.turnCounter=1):this.turnCounter++,this.interval=setInterval((()=>{this.currentPlayer.turnOver?(clearInterval(this.interval),this.time=this.TIMEOUT,clearTimeout(this.timeout)):(this.time--,document.getElementById("main-timer").innerHTML=this.time)}),1e3),this.timeout=setTimeout((()=>{this.time=this.TIMEOUT,clearInterval(this.interval),this.startTurns()}),1e3*this.TIMEOUT),this.playerDecayInc()}playerDecayInc(){window.spaceShips.forEach((t=>{t.delay>100&&(t.delay-=100)}))}gameOver(t){this.win.play(),this.theme.pause(),clearTimeout(this.timeout),clearInterval(this.interval),this.time="",window.UI.ctx.font="80px sans-serif",window.UI.ctx.fillStyle="red",window.UI.ctx.fillText(`${t.username} Wins!`,this.canvas.width/2,this.canvas.height/2-50)}}(h,a,o,r,d,l,w,g);y.theme.play();const x=document.getElementById("muteButton"),I=document.getElementById("unmuteButton");I.classList.add("hidden"),x.addEventListener("click",(()=>{y.theme.volume=0,y.turn.volume=0,y.win.volume=0,y.wind.volume=0,I.classList.remove("hidden"),x.classList.add("hidden")})),I.addEventListener("click",(()=>{y.theme.volume=.3,y.turn.volume=.3,y.win.volume=.3,y.wind.volume=.3,x.classList.remove("hidden"),I.classList.add("hidden")})),p.addEventListener("click",(function(){document.getElementById("instructions").setAttribute("style","display:none"),document.getElementById("main-menu").removeAttribute("style"),document.getElementById("game").setAttribute("style","display:none")})),m.addEventListener("click",(function(){document.getElementById("instructions").removeAttribute("style"),document.getElementById("main-menu").setAttribute("style","display:none")})),u.addEventListener("click",(function(){document.getElementById("game").removeAttribute("style"),document.getElementById("main-menu").setAttribute("style","display:none"),a.drawImage(w,0,0,h.width,h.height),window.map=y.map;let t=document.createElement("div");t.id="main-timer",document.getElementsByClassName("main")[0].insertBefore(t,c),y.theme.play(),y.startTurns();const e=()=>{y.render(),1===window.spaceShips.length?(y.render(),y.gameOver(window.spaceShips[0])):window.requestAnimationFrame(e)};window.requestAnimationFrame(e)}))}()}();
//# sourceMappingURL=main.js.map