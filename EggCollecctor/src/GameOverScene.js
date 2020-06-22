var INITIALIZED_2 = false;


var HelloWorldLayer2 = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        cc.log("test")
        var size = cc.winSize;

        var sprite = new cc.Sprite.create(res.GameOver);
        sprite.setAnchorPoint(cc.p(0.5, 0.5));
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        sprite.attr({
            scale:0.5
        })
        this.addChild(sprite, 0);

        // var menuItem1 = new cc.MenuItemFont("Pop", pop);
        // var menu = new cc.Menu(menuItem1);
        // menu.alignItemsVertically();
        // this.addChild(menu);

        return true;
    }
});

var pop = function()
{
    INITIALIZED_2 = false;
    cc.director.popScene();
};

var HelloWorldScene2 = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if (INITIALIZED_2 == false)
        {
            INITIALIZED_2 = true;

            var layer = new HelloWorldLayer2();
            this.addChild(layer);
        }
    }
});