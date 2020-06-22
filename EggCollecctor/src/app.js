
var INITIALIZED = false;


var gamelayer;

let a=5;


var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if (INITIALIZED == false)
        {
        
            gamelayer = new HelloWorldLayer();
        
        
            this.addChild(gamelayer);
        }
    }
});



var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    //egg:null,
    arr:null,
    catch:null,
    baske:null,
    label:null,
    label_life:null,
    life:3,
    score:0,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.arr=[]
        this.catch=cc.winSize.height/2-125

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        cc.log(size)

        this.sprite = new cc.Sprite(res.Bg);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scaleY: 0.95
        });
        this.addChild(this.sprite, 0);

        //egg =  new Egg()
        //this.addChild(egg,1)

        basket = new Basket()
        //basket.setPosition(size.width/2,size.height/2-150)
        //basket.setAnchorPoint(0.5,0.5)
        this.addChild(basket,1)


        this.label = new ccui.Text("score","Ariel",30)
        this.label.attr({
            x:size.width/2-300,
            y:size.height/2+185
        })

        this.addChild(this.label)


        
        this.label_life = new ccui.Text("life 3","Ariel",30)
        this.label_life.attr({
            x:size.width/2+300,
            y:size.height/2+185
        })

        this.addChild(this.label_life)
        //cc.log(basket.touchCheck)


        // if(cc.sys.capabilities.hasOwnProperty('touches'))
        // {
        //     cc.eventManager.addListener({
        //         event:cc.EventListener.TOUCH_ONE_BY_ONE,
        //         onTouchBegan:function(touch, event)
        //         {
        //             cc.log("touch began")
        //         }
        //     },this)
                
        // }

        // if ( cc.sys.capabilities.hasOwnProperty( 'mouse' ) )
        // {
        // 	cc.eventManager.addListener(
        // 	{
        // 		event: cc.EventListener.MOUSE,

        // 		onMouseDown:function(touch, event)
        // 		{
        // 			cc.log(touch.getLocationX());

        // 			return true;
        // 		}
        // 	}, this);
        // }

        // let crak =  new cc.Sprite(res.Cracked_EGG)
        // crak.setPosition(size.width/2,size.height/2)
        // crak.setAnchorPoint(0.5,0.5)
        // this.addChild(crak,1)
        // crak.attr({
        //     scaleX:0.14,
        //     scaleY:0.4
        // })

        // let crak = new CrackedEgg();
        // crak.setPosition(size.width/2,size.height/2)
        // this.addChild(crak,1)

        // let ac = cc.FadeOut.create(2)
        // crak.runAction(ac)

        // setTimeout(() => {
        //     this.removeChild(crak)
        // }, 2000);
        
        //this.schedule(egg.move(),3)

        // this.arr.push(1)
        // this.arr.push(2)
        // this.arr.push(3)
        // this.arr.push(4)
        // this.arr.push(5)

        // let arr2=[]

        // for (let i=0;i<this.arr.length;i++){
        //     if(this.arr[i]==2||this.arr[i]==4){
        //         arr2.push(this.arr.splice(i,1)[0])
        //         i--
        //         cc.log("pop")
        //         continue
        //     }
        //         cc.log(this.arr[i])
        // }
        // cc.log(this.arr)
        // cc.log(arr2)

        //this.egg =  new Egg()

        //this.addChild(this.egg)

       
        
        // let egg = new Egg()
        // cc.log(egg.getBoundingBox())

        // this.basket = new Basket()
        // cc.log(basket.getBoundingBox().height/2)

       this.scheduleUpdate()
       this.schedule(this.spawnEggs,2)
       
        return true;
    },

    spawnEggs:function(dt){
        //cc.log("spawn eggs")
        let egg =  new Egg()
        this.arr.push(egg)
        this.addChild(egg)
    },

    update:function(dt){
       // this.egg.move()
       

       // if(this.egg.getPosition().y==(cc.winSize.height/2-169)){
       //     this.removeChild(this.egg)
       // }
         this.arr.forEach(element => {
             element.move()
             //cc.log("move")
         });

        //let dest_arr=[]
        for ( let i=0;  i<this.arr.length; i++)
        {   
            //var rect1 = sprite1.getBoundingBox();
            //var rect2 = sprite2.getBoundingBox();

            let rect1 = basket.getBoundingBox();
            let rect2 = this.arr[i].getBoundingBox()
            
            //cc.log(rect1)

            if(this.arr[i].getPosition().y==(cc.winSize.height/2-169)){
                let crak = new CrackedEgg();
                crak.setPosition(this.arr[i].getPosition().x,cc.winSize.height/2-169)
                this.addChild(crak)

                this.life-=1
                this.label_life.setString("life "+this.life)

                if(this.life==0)
                {
                    var scene = new HelloWorldScene2();
                    cc.director.runScene(scene);
                    cc.log("you dead")
                }

                let cracked_aciton = cc.FadeOut.create(1);
                crak.runAction(cracked_aciton)
                setTimeout(() => {
                    this.removeChild(crak)
                }, 1000);

                this.removeChild(this.arr.splice(i,1)[0])

                i--
                continue;
            }

            rect1.height=rect1.height/2.5
            if(cc.rectIntersectsRect(rect1,rect2))
            {   
                let crak = this.arr.splice(i,1)[0]
                i--
                cc.log("collide")
                let cracked_aciton = cc.FadeOut.create(1);
                this.score+=1
                this.label.setString("Score "+this.score)
                crak.runAction(cracked_aciton)
                 setTimeout(() => {
                     this.removeChild(crak)
                     
                 }, 1000);
            }

        }

        // for (let i=0;i<dest_arr.length;i++)
        // {
        //     this.removeChild(i);
        // }

        //cc.log(this.arr.length)
        
    },

    removeEgg:function(){
        cc.log("test")
    }
});

var Egg=cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.Egg)
        this.attr({
            x:Math.floor(Math.random()*750)+30,
            y:Math.floor(Math.random()*200)+cc.winSize.height,
            //y:cc.winSize.height+50,
            scale:0.4
        })
        this.setAnchorPoint(0.5,0.5)
        
        //gamelayer.removeEgg()
    },



    move:function(){
        this.setPosition(this.getPosition().x, this.getPosition().y-1);
        //cc.log("test")

        //if(this.getPosition().y==cc.winSize.height/2-180)


    }
})

var listener = cc.EventListener.create({ 
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    //eventM: cc.EventListener.MOUSE, 
    swallowTouches: true, 
   
    onTouchBegan:function(touch, event)
        		{
                    var target = event.getCurrentTarget(); 
                        // console.log("target "+JSON.stringify(target))
                         var location = target.convertToNodeSpace(touch.getLocation());
                        //console.log("location "+JSON.stringify(location))
                         var targetSize = target.getContentSize();
                        // console.log("targetsize "+JSON.stringify(targetSize)) 
                         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize. height);
                         //console.log("targetRectangle "+ JSON.stringify(targetRectangle)) 
                         //console.log(target.setPosition(200,200))
                         if (cc.rectContainsPoint(targetRectangle, location)) { 
                             
                             target.touchCheck=true
                             console.log("I picked a tile!! "+target.touchCheck); 
                        
                            } 

        			return true;
        		},

    onTouchMoved:function(touch, event)
        		{   let target = event.getCurrentTarget()
                    //cc.log("Touch moved: " + touch.getLocationX());
                    if (target.touchCheck==true){
                         target.setPosition(touch.getLocationX(),target.getPosition().y)
                             }
                },
    onTouchEnded:function(touch, event)
                {
                    let target = event.getCurrentTarget()
                    target.touchCheck=false
                }
 
    
    })

var Basket = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.Basket)
        this.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2-150

            
        })
        this.touchCheck =  false

        //cc.log(this.touchCheck)
        
        cc.eventManager.addListener(listener.clone(),this)


        this.setAnchorPoint(0.50,0.5)
    }



})





var CrackedEgg = cc.Sprite.extend({
    ctor:function(){
        this._super()
        this.initWithFile(res.Cracked_EGG)
        this.attr({
            scaleX:0.14,
            scaleY:0.3
        })
    }
})

