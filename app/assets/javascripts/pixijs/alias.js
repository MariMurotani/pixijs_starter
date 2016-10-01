// This file stores miscellaneous functions used globally
//   define alias name for each function
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;

//  constructor caller
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var __style = {fontFamily: 'Arial',fontSize: '30pt',fontWeight: 'bold', dropShadowColor: '#000000', fill:'white'}

//  set position x of target object to center of window
function __setCenterX(target){
  target.position.x = myCanvasDrawer.windowWidth / 2 - target.width/2;
  return target;
}

//  set position y target object to center of window
function __setCenterY(target){
  target.position.y = myCanvasDrawer.windowHeight / 2 - target.height/2;
  return target;
}
