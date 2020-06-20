
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    pin:null,

    check:true,
    results: 0,
    angle:0,
    label:null,
    
    ctor:function () {
        
        this._super();

       
        var size = cc.winSize;

        
       
        this.sprite = new cc.Sprite(res.spinner_wheel);
        this.sprite.setAnchorPoint(0.5,0.5)
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.2,
            
        });
        this.addChild(this.sprite, 0);
	
	//ten
        
        

        this.pin = new cc.Sprite(res.pin);
        this.pin.setAnchorPoint(0.5,0.5);
        this.pin.attr({
            x:size.width/2,
            y:size.height/2+100,
            scale:0.03,

        })

        this.addChild(this.pin,1)

        

       

        


        var button = new ccui.Button();
        button.loadTextures(res.buttonOn,res.buttonOff);
        button.attr({
            x:size.width/2,
            y:size.height/2,
            scale:0.1
        })
        button.addTouchEventListener(this.touchEvent, this);
        this.addChild(button);

        label = new ccui.Text("0","Ariel",20)
        label.attr({
            x:size.width/2,
            y:size.height/2+150
        })

        this.addChild(label)

        
       
        
        
        return true;
    },


    pinRotate(a){
                let rotate =  new cc.RotateBy(0.2, -35)
                let pin_action1 =  new cc.EaseBounceOut(rotate)

                let rotat_Back =new  cc.RotateBy(0.25,35)
                let pin_action2 =  new cc.EaseBounceOut(rotat_Back)

                cc.log("pin rotate: a/30 "+a%30)

               // let reapeat_action =  cc.Repeat.create(pin_action1,Math.trunc(a/30))

                let sequence_action =  cc.Sequence.create(pin_action1,rotat_Back)
                let reapeat_action =  cc.Repeat.create(sequence_action,12)
                let Sequence_action2 = new cc.Sequence(reapeat_action,cc.RotateTo.create(0.5,0))

                

                this.pin.runAction(reapeat_action)


    },

    touchEvent: function(sender,type)
    {
        switch(type)
        {
            case ccui.Widget.TOUCH_BEGAN:
               { //cc.log("Touch Down")
                //sender.pressedActionEnabled=false
                
                sender.setTouchEnabled(false); 
                sender.bright=false
                sender.setEnabled(false);

                var a =  Math.floor(Math.random()*1800)
                this.angle+=a;
                cc.log("a "+a)
                cc.log("angle "+this.angle)

                if (this.angle%360==0){
                    this.angle+=5
                }else if (this.angle%30==0){
                    this.angle+=5
                }




               
                var calc=Math.floor((this.angle%360)/30)+1

                cc.log("calc "+calc)
                
                this.results=calc

                cc.log("results = "+this.results)

                //label.string=this.results.toString()
                //cc.log("label "+label.string)
                

                var  sprite_action = new cc.RotateBy(5, -a)

                this.pinRotate(a)






                this.sprite.runAction(sprite_action);

                setTimeout(()=>{
                    //cc.log("labels"+label.string)
                    label.setString(this.results)
                },5000)

                

            }

            
                
            case ccui.Widget.TOUCH_MOVED:
                //cc.log("Touch Moved")
            
            
            case ccui.Widget.TOUCH_ENDED:
                 setTimeout(()=>{
                     
                     
                     sender.setTouchEnabled(true); 
                     sender.bright=true
                     sender.setEnabled(true);
                 },5000)
            
            
            case ccui.Widget.TOUCH_CANCELLED:
                //cc.log("Touch canelled")
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

