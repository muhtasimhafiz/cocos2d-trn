
var gamelayer;


var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        gamelayer = new HelloWorldLayer();
        
        
        this.addChild(gamelayer);
    }
});



var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    //egg:null,
    arr:null,
    catch:null,
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

        let basket = cc.Sprite.create(res.Basket)
        basket.setPosition(size.width/2,size.height/2-150)
        basket.setAnchorPoint(0.5,0.5)
        this.addChild(basket,1)

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
            if(this.arr[i].getPosition().y==(cc.winSize.height/2-169)){
                let crak = new CrackedEgg();
                crak.setPosition(this.arr[i].getPosition().x,cc.winSize.height/2-169)
                this.addChild(crak)

                let cracked_aciton = cc.FadeOut.create(1);
                crak.runAction(cracked_aciton)
                setTimeout(() => {
                    this.removeChild(crak)
                }, 1000);

                this.removeChild(this.arr.splice(i,1)[0])

                i--
                continue;
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

