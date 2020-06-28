var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    Popcorn:"res/popcorn.png",
    Corn:"res/corn.png",
    Arr:"res/indicator.png",
    Heart:"res/heart.png",
    "Button":"res/buttonOn.png",
    "Lose":"res/GameOver.png",
    "YouWin":"res/YouWin.png"

   
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}