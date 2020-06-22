var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    Bg:"res/EndlessBackground.png",
    Egg:"res/Egg.png",
    Basket:"res/basket.png",
    Cracked_EGG:"res/cracked_egg.png",
    GameOver:"res/GameOver.png"


};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}