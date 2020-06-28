var world;
var shapeArray=[];
var heartArray=[];

var winGame;
var gameLose;



var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        gameLayer  = new HelloWorldLayer();
        //gameLayer.init();
        this.addChild(gameLayer );
    }
});


var touchListener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    onTouchBegan: function (touch, event) { 


        
         cc.log("touch began")
         gameLayer.pour=true;
         cc.log(gameLayer.pour)
         return true
    },
    onTouchMoved: function (touch, event) { 

        cc.log("touch moved")
        
   },

   onTouchEnded:function(touch, event){
       cc.log("touch ended")

       gameLayer.pour=false;
       cc.log(gameLayer.pour)

       cc.log(shapeArray.length)


       setTimeout(() => {
           if(shapeArray.length>=130 && gameLayer.pour==false){
                gameLayer.win=true
                gameLayer.GameOver=true
                cc.log("win")
           }
       }, 3000);
   }
}) 


let gameLayer

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    pour:null,
    GameOver:false,
    life:3,
    wincheck:true,
    win:false,
    lose:false,
    rungame:true,
    ctor:function () {
        
        cc.eventManager.addListener(touchListener,this)
        this._super();


        gameLayer=this
        this.pour=false
        var size = cc.winSize;

        let winSize=cc.winSize

        var backgroundLayer = cc.LayerGradient.create(cc. color(0xdf,0x9f,0x83,255), cc.color(52,232,235,255));
        this.addChild(backgroundLayer);
        
        
        world = new cp.Space();
        world.gravity =  cp.v(0,-100);
       var debugDraw = cc.PhysicsDebugNode.create(world); 
       debugDraw.setVisible(true); 
      // this.addChild(debugDraw);

        let popCorn = cc.Sprite.create(res.Popcorn)
        popCorn.attr({
            x:winSize.width/2,
            y:winSize.height/2+200,

            scaleX:0.5,
            scale:0.15,

            rotation:180

            //rotateTo:270
        })
        this.addChild(popCorn,1)

        let ind1 = cc.Sprite.create(res.Arr)
        ind1.attr({
            x:winSize.width/2-90,
            y:winSize.height/2+75,

            scaleX:0.025,
            scale:0.025,

            //rotation:180

            //rotateTo:270
        })
        this.addChild(ind1,1)

        let heart_inc=0

        for( let i =0; i<3;i++){
            let heart = new cc.Sprite(res.Heart)
            heart.attr({
                x:100,
                y:350+heart_inc,

            })

            heartArray.push(heart)

            heart_inc+=30

            this.addChild(heart,1)
        }

        //this.removeChild(heartArray[0])


        let ind2 = cc.Sprite.create(res.Arr)
        ind2.attr({
            x:winSize.width/2+90,
            y:winSize.height/2+75,

            scaleX:0.025,
            scale:0.025,

            rotation:180

            ////rotateTo:270
        })
        this.addChild(ind2,1)


        this.scheduleUpdate();

       
        this.BounceaddBody(400,175+4,128,2,true,res.Ground,"ground");
        this.addBody(400,175,150,10,false,res.Ground,"ground");
        this.addBody(330,256,10,150,false,res.Ground,"ground");
        this.addBody(470,256,10,150,false,res.Ground,"ground");


        let g1= new cc.DrawNode();
        this.addChild(g1)
        g1.drawRect(cc.p(325,180),cc.p(475,170),cc.color(0,0,0.0),0,cc.color(255,255,255,255))


        let g2= new cc.DrawNode();
        this.addChild(g2)
        g2.drawRect(cc.p(325,180),cc.p(335,325+10),cc.color(0,0,0.0),0,cc.color(255,255,255,255))


        let g3= new cc.DrawNode();
        this.addChild(g3)
        g3.drawRect(cc.p(475,170),cc.p(465,325+10),cc.color(0,0,0.0),0,cc.color(255,255,255,255))


        let loop = 6;
        let inc = 0;
        
        while(loop)
        {
            loop--
            inc+=20
            let i1 = new cc.DrawNode();
            this.addChild(i1)
            i1.drawRect(cc.p(325+inc,300),cc.p(340+inc,305),cc.color(0,0,0.0),0,cc.color(255,255,255,255))
        }


       
        let button = new cc.Sprite(res.Button)
        button.attr({
            x:size.width/2,
            y:size.height/2-150,

            scale:0.1
        })
        this.addChild(button,1)

        // gameLose = new cc.Sprite(res.Lose)
        // gameLose.attr({
        //     x:size.width/2,
        //     y:size.height/2,

        //     scale:0.5
        // })
        // this.addChild(gameLose,1)
        // gameLose.setOpacity(0)


        // winGame = new cc.Sprite(res.YouWin)
        // winGame.attr({
        //     x:size.width/2,
        //     y:size.height/2
        // })
        // this.addChild(winGame,1)

        // winGame.setOpacity(0)




        




  },
    update:function(dt)
    { 
       world.step(dt);
       if(this.life<=0){
        this.GameOver=true
        this.lose=true
       

        
    }
         
       if(this.GameOver && this.win && !this.lose && this.rungame==true){
           cc.log("win")
           this.removeAllChildren()
           var backgroundLayer = cc.LayerGradient.create(cc. color(0xdf,0x9f,0x83,255), cc.color(52,232,235,255));
        this.addChild(backgroundLayer);
           winGame = new cc.Sprite(res.YouWin)
           winGame.attr({
               x:cc.winSize.width/2,
               y:cc.winSize.height/2
           })
           this.addChild(winGame,1)
   
       }


       if(this.GameOver && this.lose && this.rungame==true){
        this.removeAllChildren()
        gameLose = new cc.Sprite(res.Lose)
        gameLose.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2,

            scale:0.5
        })
        this.addChild(gameLose,1)
        // winGame.setOpacity(0)
        // gameLose.setOpacity(255)
        cc.log("gameover")
       }
        
         if(!this.GameOver && this.pour){
            this.CornAddBody(400,350,10,10,true,res.Corn,"corn");
         }
       //this.addBodyCricle(400,350,10,4,true,res.Ground,"ground");

        for(var i=shapeArray.length-1;i>=0;i--){
            
            if(shapeArray[i].name=="corn"){
            shapeArray[i].image.x=shapeArray[i].body.p.x
            shapeArray[i].image.y=shapeArray[i].body.p.y
            var angle = Math.atan2(-shapeArray[i].body.rot.y,shapeArray[i].body.rot.x)
            shapeArray[i].image.rotation = angle * 180/Math.PI
            }

            // if(shapeArray[i].body.p.x<325 || shapeArray[i].body.p.x>475){
            //     cc.log("life deducted")
            //     this.life-=1
            // }

            if(shapeArray[i].body.p.y<=100){
                this.life-=1
                world.removeShape(shapeArray[i])
                this.removeChild(shapeArray[i].image)
                shapeArray.splice(i,1);

                if(heartArray.length>0){
                    cc.log("heart removed")
                    //cc.log(heartArray[0])
                   this.removeChild(heartArray[0])
                   heartArray.splice(0,1)
                }
                
                cc.log("removed")
            }

        }


    },

//     collisionBegin : function (arbiter, space ) {
//         cc.log(gameLayer)
//         cc.log(arbiter.a.name)
//         cc.log(arbiter.b.name)
//         if((arbiter.a.name=="totem" && arbiter.b.name=="ground") || (arbiter.b.name=="totem" && arbiter.a.name=="ground")){
//              console.log("Oh no chfasdfp!!!!");
//         }
//         return true;
//    },
CornAddBody: function(posX,posY,width,height,isDynamic,spriteImage,type){
    if(isDynamic){
        var body = new cp.Body(1,cp.momentForBox(1,width,height));
    }
    else{
        var body = new cp.Body(Infinity,Infinity);
    }
    body.setPos(cp.v(posX,posY));
      var bodySprite = cc.Sprite.create(spriteImage);
      gameLayer.addChild(bodySprite,1);
      bodySprite.setPosition(posX,posY);
    if(isDynamic){		
       world.addBody(body);		
    }
    var shape = new cp.BoxShape(body, width, height);
    shape.setFriction(1);
    shape.setElasticity(0);
    shape.name=type;
    shape.image=bodySprite;
    world.addShape(shape);
    shapeArray.push(shape);	
},

   addBody: function(posX,posY,width,height,isDynamic,spriteImage,type){
    if(isDynamic){
        var body = new cp.Body(1,cp.momentForBox(1,width,height));
    }
    else{
        var body = new cp.Body(Infinity,Infinity);
    }
    body.setPos(cp.v(posX,posY));
    //  var bodySprite = cc.Sprite.create(spriteImage);
    //   gameLayer.addChild(bodySprite,0);
    //   bodySprite.setPosition(posX,posY);
    if(isDynamic){		
       world.addBody(body);		
    }
    var shape = new cp.BoxShape(body, width, height);
    shape.setFriction(1);
    shape.setElasticity(0);
    shape.name=type;
   // shape.image=bodySprite;
    world.addShape(shape);
    shapeArray.push(shape);	
},

BounceaddBody: function(posX,posY,width,height,isDynamic,spriteImage,type){
    if(isDynamic){
        var body = new cp.Body(1,cp.momentForBox(Infinity,width,height));
    }
    else{
        var body = new cp.Body(Infinity,Infinity);
    }
    body.setPos(cp.v(posX,posY));
    // var bodySprite = cc.Sprite.create(spriteImage);
    //   gameLayer.addChild(bodySprite,0);
    //   bodySprite.setPosition(posX,posY);
    if(isDynamic){		
       world.addBody(body);		
    }
    var shape = new cp.BoxShape(body, width, height);
    shape.setFriction(100);
    shape.setElasticity(0);
    shape.name=type;
   // shape.image=bodySprite;
    world.addShape(shape);
    shapeArray.push(shape);	
},

addBodyCricle: function(posX,posY,width,height,isDynamic,spriteImage,type){
    if(isDynamic){
        var body = new cp.Body(1,cp.momentForCircle(1,1,width/2,cp.vzero));
    }
    else{
        var body = new cp.Body(Infinity,Infinity);
    }
    body.setPos(cp.v(posX,posY));
    // var bodySprite = cc.Sprite.create(spriteImage);
    //   gameLayer.addChild(bodySprite,0);
    //   bodySprite.setPosition(posX,posY);
    if(isDynamic){		
       world.addBody(body);		
    }
    var shape = new cp.CircleShape(body, width/2, cp.vzero);
    shape.setFriction(1);
    shape.setElasticity(1);
    shape.setCollisionType(1)
    shape.name=type;
   // shape.image=bodySprite;
    world.addShape(shape);
    shapeArray.push(shape);	
},



        



})

// var HelloWorldScene = cc.Scene.extend({
//     onEnter:function () {
//         this._super();
//         gameLayer = new HelloWorldLayer();
//         this.addChild(gameLayer);
//     }
// });

