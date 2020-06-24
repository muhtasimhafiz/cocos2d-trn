


let   land_1=null;
let   land_2=null;
let   land_3=null;
let   land_1P=null;
let   land_2P=null;
let   indexFinger=null;
let   land1_rect=null;
let   land2_rect=null;
let   nextPhase=false;

let    run_nextPhase=false;

let v_1=null;
let v_2=null;
let v_3=null;

let v_1P= null;
let v_2P=null;
let v_3P=null;

let vv_1=null;
let vv_2=null;



let gameover=false




var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});



    


var HelloWorldLayer = cc.Layer.extend({
     sprite:null,
    // land_1:null,
    // land_2:null,
    // land_1P:null,
    // land_2P:null,
    // indexFinger:null,
    // land1_rect:null,
    // land2_rect:null,
    
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

       let size =  cc.winSize

       cc.log(size)
       
        this.sprite = new cc.Sprite(res.MainLand);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scaleX: 0.8,
            scaleY:0.6
            
            
        });
        this.addChild(this.sprite,0)

        

        // let l1 =  new Land_1()
        // this.addChild(l1,1)
        
        
        land_1P =  new Land_1P()       
        land_1P.setPosition(size.width/2+175,size.height/2+100)        
        this.addChild(land_1P,1)
        land_1P.setOpacity(0)

        

        land_2P = new Land_2P()  
        land_2P.setPosition(size.width/2+175, size.height/2-75)  
        this.addChild(land_2P,1)
        land_2P.setOpacity(0)



        // let vv1 = new Veg_1()
        // vv1.initWithFile(res.Tomato_s)
        // vv1.setPosition(land_1P.getPositionX(), land_1P.getPositionY())
        // vv1.attr({
        //     scale:0.2
        // })
        // this.addChild(vv1,1)

        // let vv2 = new Veg_2()
        // vv2.initWithFile(res.Potato_s)
        // vv2.setPosition(land_2P.getPositionX(), land_2P.getPositionY())
        // vv2.attr({
        //     scale:0.2
        // })
        // this.addChild(vv2,1)


        
        
        
        land_1 =  new Land_1()
        this.addChild(land_1,1)

        //this.land1_rect =  cc.rect()

        land1_rect = land_1.getBoundingBox()

        cc.log(land1_rect)

        // var dn = new cc.DrawNode();
        // this.addChild(dn);
        //dn.drawRect(cc.p(this.land1_rect.x-this.land1_rect.width/2,50), cc.p(200,300), cc.color(255,0,0,255), 3, cc.color(0,255,0,255))

         land_2 =  new Land_2()
         this.addChild(land_2,1)

         land_3 = new Land_3()
         this.addChild(land_3,1)
          

        indexFinger = new IndexFinger()
        indexFinger.setPosition(land_1.getPosition().x,land_1.getPosition().y)
        this.addChild(indexFinger,2)





    //    v_1=new Veg_1()
    //    this.addChild(v_1,1)

    //    v_2=new Veg_2()
    //    this.addChild(v_2,1)

    //    v_3= new Veg_3()
    //    this.addChild(v_3,1)
        

        // if(indexFinger.point==1){
        //      let act = cc.MoveTo.create(2,cc.p(land_1P.getPosition().x, land_1P.getPosition().y))
        //      let act2 = cc.place( cc.p(land_1.getPosition().x, land_1.getPosition().y))
        //      let seq = cc.Sequence.create(act,act2)
        //      let reapeat_action =  cc.RepeatForever.create(seq)

        //      indexFinger.runAction(reapeat_action)
        //  }else if(indexFinger.point==2)
        // {
        //     let act = cc.MoveTo.create(2,cc.p(land_2P.getPosition().x, land_2P.getPosition().y))
        //     let act2 = cc.place( cc.p(land_2.getPosition().x, land_2.getPosition().y))
        //     let seq = cc.Sequence.create(act,act2)
        //     let reapeat_action =  cc.RepeatForever.create(seq)

        //     indexFinger.runAction(reapeat_action)
        // }
       indexFinger.move_1_Pos()
        //indexFinger.move_2_pos()

        //indexFinger.ripe2_act()
       
       this.scheduleUpdate()


        // //let l = this.land1_rect
        let l1=land_1
        let l2=land_2
        let l3=land_3
        let l1rect=l1.getBoundingBox()
        let l2rect =l2.getBoundingBox()
        let l3rect =l3.getBoundingBox()
        let finger = indexFinger
        


        cc.eventManager.addListener(
            {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,

                onTouchBegan:function(touch, event)
        		{
                    //cc.log(touch.getLocationX());
                    if(nextPhase==false && run_nextPhase==false){


                

                        if(cc.rectContainsPoint(land_1.getBoundingBox(),touch.getLocation()) && land_1.touch_enabled)
                    {   
                       
                        cc.log("l1 touched")
                        land_1.touchCheck=true; 
                        
                        land_1P.setOpacity(100)
                        indexFinger.point=2
                        
                    }

                    if(cc.rectContainsPoint(land_2.getBoundingBox(),touch.getLocation()) && land_2.touch_enabled)
                    {
                        cc.log("l2 touched")
                        land_2.touchCheck=true

                       // if(land_1.placed){
                           land_2P.setOpacity(100)
                        //}
                    }

                    if(cc.rectContainsPoint(land_3.getBoundingBox(),touch.getLocation()))
                    {
                        cc.log("l3 touched")
                        land_3.touchCheck=true
                    }
                }






                if(run_nextPhase){


                    if(v_1.ripe && v_2.ripe){
                        if(cc.rectContainsPoint(v_1.getBoundingBox(), touch.getLocation())&&v_1.touch_ripe==true){
                            v_1.initWithFile(res.Tomato)
                            v_1.attr({
                                scaleX:0.23,
                                scaleY:0.33
                            })
                            v_1.stopAllActions()
                            v_1.moveBack()
                            
                            indexFinger.stopAllActions()
                            indexFinger.ripe2_act()

                            v_2.touch_ripe=true
                        }

                        if(cc.rectContainsPoint(v_2.getBoundingBox(), touch.getLocation())&&v_2.touch_ripe==true){
                            v_2.initWithFile(res.Potato)
                            v_2.attr({
                                scaleX:0.23,
                                scaleY:0.33
                            })
                            v_2.stopAllActions()
                            v_2.moveBack()
                            
                            indexFinger.stopAllActions()
                            //indexFinger.ripe2_act()

                            indexFinger.setOpacity(0)

                            v_2.ripe=false;
                            v_1.ripe=false

                            setTimeout(() => {
                                gameover=true
                            }, 1000);

                            //v_2.touch_ripe=true
                        }

                    }

                    if(cc.rectContainsPoint(v_1.getBoundingBox(),touch.getLocation()) && v_1.touch_enabled)
                    {   
                       
                        cc.log("v1 touched")
                        v_1.touchCheck=true; 

                        
                        
                        
                        
                    }

                    if(cc.rectContainsPoint(v_2.getBoundingBox(),touch.getLocation()) && v_2.touch_enabled)
                    {
                        cc.log("v2 touched")
                        v_2.touchCheck=true

                        
                    }

                    if(cc.rectContainsPoint(v_3.getBoundingBox(),touch.getLocation()))
                    {
                        cc.log("v3 touched")
                        v_3.touchCheck=true
                    }


                    ////////////////////////////////////////////////////////


                    if(cc.rectContainsPoint(v_1P.getBoundingBox(),touch.getLocation()) && v_1P.touch_enabled)
                    {   
                       
                        cc.log("v1p touched")
                        v_1P.touchCheck=true; 

                        
                        
                        
                        
                    }

                    if(cc.rectContainsPoint(v_2P.getBoundingBox(),touch.getLocation()) && v_2P.touch_enabled)
                    {
                        cc.log("v2p touched")
                        v_2P.touchCheck=true

                        
                    }

                    if(cc.rectContainsPoint(v_3P.getBoundingBox(),touch.getLocation()))
                    {
                        cc.log("v3 touched")
                        v_3P.touchCheck=true
                    }
                    
                }




                    
                



                
                    
                    
                    return true
        			
        		},
                
                onTouchMoved:function(touch, event){
                    
                    

                    if(!nextPhase && run_nextPhase==false){
                        if(land_1.touchCheck && land_1.touch_enabled){
                        land_1.setPosition(touch.getLocation().x, touch.getLocation().y)

                        

                        rect =cc.rect(land_1P.getPosition().x,land_1P.getPosition().y,land_1P.getBoundingBox().width,land_1P.getBoundingBox().height)                    
                        if(cc.rectIntersectsRect(land_1.getBoundingBox(),rect)){
                            land_1.touchCheck=false;
                            land_1.touch_enabled=false;
                            land_1.placed=true
                            indexFinger.point=2



                            indexFinger.stopAllActions()

                            let act2 = cc.place( cc.p(cc.winSize.width/2-300, cc.winSize.height/2))
                            indexFinger.runAction(act2)
                            indexFinger.setAnchorPoint(0,0.8)
                            indexFinger.move_2_pos()

                            land_1.setPosition(land_1P.getPosition().x,land_1P.getPosition().y)
                           
                        }

                    }else if(land_2.touchCheck && land_2.touch_enabled){
                        rect=cc.rect(land_2P.getPosition().x,land_2P.getPosition().y,land_2P.getBoundingBox().width,land_2P.getBoundingBox().height)
                        land_2.setPosition(touch.getLocation().x, touch.getLocation().y)
                        if(cc.rectIntersectsRect(land_2.getBoundingBox(),rect) && land_1.placed){
                            land_2.touchCheck=false;
                            land_2.touch_enabled=false;
                            
                            nextPhase=true
                            //indexFinger.stopAllActions()

                            land_2.setPosition(land_2P.getPosition().x,land_2P.getPosition().y)
                        }
                        
                        
                    }else if(land_3.touchCheck && land_3.touch_enabled){
                        land_3.setPosition(touch.getLocation().x, touch.getLocation().y)
                    }}




                    if(run_nextPhase){

                        


                        if(v_1.touchCheck && v_1.touch_enabled){
                            v_1.setPosition(touch.getLocation().x, touch.getLocation().y)

                            v_1P.setOpacity(255)
    
                            rect = cc.rect(land_1P.getPosition().x,land_1P.getPosition().y,land_1P.getBoundingBox().width,land_1P.getBoundingBox().height)                    
                            if(cc.rectIntersectsRect(v_1.getBoundingBox(),rect)){
                                v_1.touchCheck=false;
                                v_1.touch_enabled=false;
                                v_1.placed=true

                                v_1P.touch_enabled=true


                                v_1.initWithFile(res.Tomato_s)
                                v_1.attr({
                                    scale:0.2
                                })

                                //indexFinger.setOpacity(0)
                                let r_act =  cc.MoveBy.create(2, cc.p(0,-10))
                                v_1.runAction(r_act)

                                setTimeout(() => {
                                    v_1.initWithFile(res.Ripe)
                                    v_1.attr({
                                        scale:0.5
                                    })
                                    v_1.setPosition(cc.p(v_1.getPositionX(),v_1.getPositionY()+10))


                                    let r_act2 = cc.RotateTo.create(0.5,10)
                                    let r_act3 = cc.RotateTo.create(0.5,-10)

                                    let seq = cc.Sequence.create(r_act2,r_act3)
                                    let repeat = cc.RepeatForever.create(seq)

                                   // indexFinger.setOpacity(255)

                                    v_1.runAction(repeat)
                                    
                                }, 2000);

                                indexFinger.point=2
    
                                indexFinger.stopAllActions()
    
                                let act2 = cc.place( cc.p(cc.winSize.width/2-300, cc.winSize.height/2))
                                indexFinger.runAction(act2)
                                indexFinger.move_2_pos()
    
                                v_1.setPosition(land_1P.getPosition().x,land_1P.getPosition().y)}
                               
                            
    
                        }else if(v_2.touchCheck && v_2.touch_enabled){

                            v_2P.setOpacity(255)

                            rect=cc.rect(land_2P.getPosition().x,land_2P.getPosition().y,land_2P.getBoundingBox().width,land_2P.getBoundingBox().height)
                            v_2.setPosition(touch.getLocation().x, touch.getLocation().y)
                            if(cc.rectIntersectsRect(v_2.getBoundingBox(),rect) && v_1.placed){
                                v_2.touchCheck=false;
                                v_2.touch_enabled=false;
                                
                                v_2P.touch_enabled=true

                                v_2.initWithFile(res.Potato_s)
                                v_2.attr({
                                    scale:0.2
                                })

                                let r_act =  cc.MoveBy.create(2, cc.p(0,-10))
                                v_2.runAction(r_act)


                                setTimeout(() => {
                                    v_2.initWithFile(res.Ripe)
                                    v_2.attr({
                                        scale:0.5
                                    })
                                    v_2.setPosition(cc.p(v_2.getPositionX(),v_2.getPositionY()+10))


                                    let r_act2 = cc.RotateTo.create(0.5,10)
                                    let r_act3 = cc.RotateTo.create(0.5,-10)

                                    let seq = cc.Sequence.create(r_act2,r_act3)
                                    let repeat = cc.RepeatForever.create(seq)

                                    v_2.runAction(repeat)

                                    v_1.ripe=true
                                    v_2.ripe=true

                                    v_1.touch_ripe=true
                                
                                }, 2000);


                                



                                indexFinger.stopAllActions()
    
                                let act2 = cc.place( cc.p(cc.winSize.width/2-300, cc.winSize.height/2))
                                indexFinger.runAction(act2)

                                indexFinger.ripe1_act()

                                //nextPhase=true
                                //indexFinger.stopAllActions()
    
                                v_2.setPosition(land_2P.getPosition().x,land_2P.getPosition().y)
                            }
                            
                            
                        }else if(v_3.touchCheck && v_3.touch_enabled){

                            v_3P.setOpacity(255)

                            v_3.setPosition(touch.getLocation().x, touch.getLocation().y)
                        }


                        ////////////////////////////////////////////////////
                        if(v_1P.touchCheck && v_1P.touch_enabled){
                            v_1P.setPosition(touch.getLocation().x, touch.getLocation().y)

                            
    
                        }else if(v_2P.touchCheck && v_2P.touch_enabled){

                            //v_2P.setOpacity(255)

                            rect=cc.rect(land_2P.getPosition().x,land_2P.getPosition().y,land_2P.getBoundingBox().width,land_2P.getBoundingBox().height)
                            v_2P.setPosition(touch.getLocation().x, touch.getLocation().y)
                            
                            
                        }
    

                    }


                    





                },


                onTouchEnded:function(){
                    //cc.log("touch ended")

                    if(nextPhase==false && run_nextPhase==false){

                        if(land_1.touchCheck && land_1.touch_enabled){
                            land_1.moveBack()
                        }else if(land_2.touchCheck && land_2.touch_enabled){
                            land_2.moveBack()

                        }else if(land_3.touchCheck&& land_3.touch_enabled){
                            land_3.moveBack()
                        }

                        

                        land_1.touchCheck=false;
                        land_2.touchCheck=false;
                        land_3.touchCheck=false;


                        land_1P.setOpacity(0)
                        land_2P.setOpacity(0)
                        
                    }



                    if(run_nextPhase){

                        if(v_1.touchCheck && v_1.touch_enabled){
                            v_1.moveBack()
                        }else if(v_2.touchCheck && v_2.touch_enabled){
                            v_2.moveBack()

                        }else if(v_3.touchCheck&& v_3.touch_enabled){
                            v_3.moveBack()
                        }




                        if(v_1P.touchCheck && v_1P.touch_enabled){
                            v_1P.moveBack()
                        }else if(v_2P.touchCheck && v_2P.touch_enabled){
                            v_2P.moveBack()

                        }



                        v_1.touchCheck=false;
                        v_2.touchCheck=false
                        v_3.touchCheck=false

                        v_1P.touchCheck=false;
                        v_2P.touchCheck=false
                        v_3P.touchCheck=false


                    }

                }


            }, this);


        
        return true;
    },


    update:function(dt){

        if(gameover)
        {
            
        let gO=new cc.Sprite(res.GameOver)
        gO.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2,

            scale:0.5
        })
        this.addChild(gO,3)
        let act = cc.RotateTo.create(0.5,-10)
        let act2= cc.RotateTo.create(0.5, 10)

        let seq = cc.Sequence.create(act,act2)

        let r=cc.RepeatForever.create(seq)
        gO.runAction(r)

        gameover=false
        }
        
        if(nextPhase==true && run_nextPhase==false){
            this.removeChild(land_3)

            vv_1 = new Veg_1()
            vv_1.touch_enabled=false;
            vv_1.setOpacity(0)
            this.addChild(vv_1,1)

            vv_2 = new Veg_2()
            vv_2.touch_enabled=false;
            vv_2.setOpacity(0)
            this.addChild(vv_2,1)


           




            v_1P=new Veg_1()
            v_1P.touch_enabled=false;
            v_1P.setOpacity(0)
            this.addChild(v_1P,1)

            v_2P=new Veg_2()
            v_2P.touch_enabled=false;
            v_2P.setOpacity(0)
            this.addChild(v_2P,1)

            v_3P=new Veg_3()
            v_3P.setOpacity(0)
            v_3P.touch_enabled=false;
            this.addChild(v_3P,1)

            v_1=new Veg_1()
            //v_1.setOpacity(200)
            this.addChild(v_1,1)

            v_2=new Veg_2()
            //v_2.setOpacity(200)
            this.addChild(v_2,1)

            v_3=new Veg_3()
            //v_3.setOpacity(200)
            this.addChild(v_3,1)

           



            run_nextPhase=true;
            nextPhase=false

            indexFinger.stopAllActions();

            let act2 = cc.place( cc.p(v_1P.getPositionX(), v_1P.getPositionY()))
            indexFinger.runAction(act2)
            indexFinger.move_1_Pos()


        }
    },
    test:function(){
        //cc.log(f4)
        //this.removeChild(land_1P)
    }
    
});






// var Land_1 = cc.Sprite.extend({
//     ctor:function(){
//         //win_size=cc.winSize
//         this._super()
//         this.initWithFile(res.land1)
//         this.attr({
//             x:cc.winSize.width/2-300,
//             y:cc.winSize.height/2+150,
//             scaleX:0.23,
//             scaleY:0.33

//         })
//         cc.eventManager.addListener(listener.clone(),this)
//         this.setAnchorPoint(0.5,0.5)
//         this.main_landPosition =  1

        
//     }
// })

var Land_1P = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.land1)
        this.attr({
            x:cc.winSize.width/2-300,
            y:cc.winSize.height/2+150,
            scaleX:0.23,
            scaleY:0.33

            
        })
        this.touchCheck =  false

        //cc.log(this.touchCheck)
        
        //cc.eventManager.addListener(listener.clone(),this)
        this.main_landPosition =  1


        this.setAnchorPoint(0.50,0.5)
    }



})


var Land_2P = cc.Sprite.extend({
    ctor:function(){
        win_size=cc.winSize
        this._super()
        this.initWithFile(res.land2)
        this.attr({
            x:win_size.width/2-300,
            y:win_size.height/2,
            scaleX:0.23,
            scaleY:0.33

        })
        this.setAnchorPoint(0.5,0.5)
        this.main_landPosition =  2

       // cc.eventManager.addListener(listener.clone(),this)
    }
})

var Land_3P = cc.Sprite.extend({
    ctor:function(){
        win_size=cc.winSize
        this._super()
        this.initWithFile(res.land3)
        this.attr({
            x:win_size.width/2-300,
            y:win_size.height/2-150,
            scaleX:0.355,
            scaleY:0.255

        })
        this.setAnchorPoint(0.5,0.5)
        this.main_landPosition =  3
        //cc.eventManager.addListener(listener.clone(),this)
    }
})



var Land_1 = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.land1)
        this.attr({
            x:cc.winSize.width/2-300,
            y:cc.winSize.height/2+150,
            scaleX:0.23,
            scaleY:0.33

            
        })
        this.touchCheck =  false
        this.touch_enabled=true
        this.placed=false

        //cc.log(this.touchCheck)
        
        //cc.eventManager.addListener(listener.clone(),this)
        this.main_landPosition =  1


        this.setAnchorPoint(0.50,0.5)
    },

    moveBack:function(){
        let act = cc.MoveTo.create(0.5, cc.p(cc.winSize.width/2-300,cc.winSize.height/2+150))
        this.runAction(act)
    }



})


var Land_2 = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.land2)
        this.attr({
            x:cc.winSize.width/2-300,
            y:cc.winSize.height/2,
            scaleX:0.23,
            scaleY:0.33

            
        })
        this.touchCheck =  false
        this.touch_enabled=true
        this.placed=false


        //cc.log(this.touchCheck)
        
        //cc.eventManager.addListener(listener.clone(),this)
        this.main_landPosition =  2


        this.setAnchorPoint(0.50,0.5)
    },

    moveBack:function(){
        let act = cc.MoveTo.create(0.5, cc.p(cc.winSize.width/2-300,cc.winSize.height/2))
        this.runAction(act)
    }



})




var Land_3 = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.land3)
        this.attr({
            x:win_size.width/2-300,
            y:win_size.height/2-150,
            scaleX:0.355,
            scaleY:0.255

            
        })
        this.touchCheck =  false
        this.touch_enabled=true


        //cc.log(this.touchCheck)
        
        //cc.eventManager.addListener(listener.clone(),this)
        this.main_landPosition =  3


        this.setAnchorPoint(0.50,0.5)
    },

    moveBack:function(){
        let act = cc.MoveTo.create(0.5, cc.p(cc.winSize.width/2-300,cc.winSize.height/2-150))
        this.runAction(act)
    }



})









var IndexFinger = cc.Sprite.extend({
    ctor:function(){
        win_size=cc.winSize
        this._super()
        this.initWithFile(res.Finger)
        this.attr({
            x:win_size.width/2,
            y:win_size.height/2,
            scaleX:0.05,
            scaleY:0.05

        })

        this.point =  1
        this.setAnchorPoint(0.5,0.5)
        //this.main_landPosition =  3
    },

    move_1_Pos:function(){
        let act = cc.MoveTo.create(2,cc.p(cc.winSize.width/2+175, cc.winSize.height/2+100))
        let act2 = cc.place( cc.p(cc.winSize.width/2-300, cc.winSize.height/2+150))
        let seq = cc.Sequence.create(act,act2)
        let reapeat_action =  cc.RepeatForever.create(seq)

        this.runAction(reapeat_action)
    },

    move_2_pos:function(){
        let act = cc.MoveTo.create(2,cc.p(cc.winSize.width/2+175, cc.winSize.height/2-75))
        let act2 = cc.place( cc.p(cc.winSize.width/2-300, cc.winSize.height/2))
        let seq = cc.Sequence.create(act,act2)
        let reapeat_action =  cc.RepeatForever.create(seq)

        this.runAction(reapeat_action)

    },

    ripe1_act:function(){
        let act=cc.MoveTo.create(0.25,cc.p(cc.winSize.width/2+175, cc.winSize.height/2+100+5))
        let act2=cc.MoveTo.create(0.25,cc.p(cc.winSize.width/2+175, cc.winSize.height/2+100-5))
        let seq = cc.Sequence.create(act,act2)
        let reapeat_action =  cc.RepeatForever.create(seq)

        this.runAction(reapeat_action)


    },


    ripe2_act:function(){
        let act=cc.MoveTo.create(0.25,cc.p(cc.winSize.width/2+175, cc.winSize.height/2-75+5))
        let act2=cc.MoveTo.create(0.25,cc.p(cc.winSize.width/2+175, cc.winSize.height/2-75-5))
        let seq = cc.Sequence.create(act,act2)
        let reapeat_action =  cc.RepeatForever.create(seq)

        this.runAction(reapeat_action)


    }

})





var Veg_1 = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.Tomato)
        this.attr({
            x:cc.winSize.width/2-300,
            y:cc.winSize.height/2+150,
            scaleX:0.23,
            scaleY:0.33

            
        })
        this.touchCheck =  false
        this.touch_enabled=true
        this.placed=false
        this.ripe=false
        this.touch_ripe=false


        //cc.log(this.touchCheck)
        
        //cc.eventManager.addListener(listener.clone(),this)
        this.main_landPosition =  2


        this.setAnchorPoint(0.50,0.5)
    },

    moveBack:function(){
        let act = cc.MoveTo.create(0.5, cc.p(cc.winSize.width/2-300,cc.winSize.height/2+150))
        this.runAction(act)
    }



})


var Veg_2 = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.Potato)
        this.attr({
            x:cc.winSize.width/2-300,
            y:cc.winSize.height/2,
            scaleX:0.23,
            scaleY:0.33

            
        })
        this.touchCheck =  false
        this.touch_enabled=true
        this.placed=false
        this.ripe=false
        this.touch_ripe=false


        //cc.log(this.touchCheck)
        
        //cc.eventManager.addListener(listener.clone(),this)
        this.main_landPosition =  2


        this.setAnchorPoint(0.50,0.5)
    },

    moveBack:function(){
        let act = cc.MoveTo.create(0.5, cc.p(cc.winSize.width/2-300,cc.winSize.height/2))
        this.runAction(act)
    }



})


var Veg_3 = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.Cucumber)
        this.attr({
            x:cc.winSize.width/2-300,
            y:cc.winSize.height/2-150,
            scaleX:0.0315,
            scaleY:0.0308

            
        })
        this.touchCheck =  false
        this.touch_enabled=true
        this.placed=false


        //cc.log(this.touchCheck)
        
        //cc.eventManager.addListener(listener.clone(),this)
        this.main_landPosition =  2


        this.setAnchorPoint(0.50,0.5)
    },

    moveBack:function(){
        let act = cc.MoveTo.create(0.5, cc.p(cc.winSize.width/2-300,cc.winSize.height/2-150))
        this.runAction(act)
    }



})

