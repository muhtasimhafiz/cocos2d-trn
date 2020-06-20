
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

                // //pin action//

                // let rotate =  new cc.RotateBy(Math.trunc(a/30), -35)
                // let pin_action1 =  new cc.EaseBounceOut(rotat)

                // let rotat_Back =new  cc.RotateBy(0.5,35)
                // let pin_action2 =  new cc.EaseBounceOut(rotatBack)

                // //let sequence_action =  cc.Sequence.create(rotat,rotatBack)

                // //var sprite_action = cc.MoveBy.create(2.0, cc.p(50, 100));
                // //var sprite_action2 = cc.FadeTo.create(2.0, 0);



		        // var sequence_action = cc.Sequence.create(new cc.Repeat(pin_action1,Math.trunc(a/360)), rotat_Back);

                // this.pin.runAction(sequence_action)




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

