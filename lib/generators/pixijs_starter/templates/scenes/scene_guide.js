var SceneGuide = (function (_super) {
    __extends(SceneGuide, _super);
    function SceneGuide() {
        _super.apply(this, arguments);
    }
    //  this is called just before scene changes
    SceneGuide.prototype.destroy = function () {
      _super.prototype.destroy();

      // invisible html element
      element = document.getElementById("explain");
      element.style.visibility = "collapse";
    };
    //  this function is called as call back of resource load
    //  use this method as start point of this scene
    SceneGuide.prototype.start = function () {
      _super.prototype.start();
      // title image
      this.title = new Sprite(resources["/assets/pixijs/logo.png"].texture);
      this.title = __setCenterX(myCanvasDrawer.windowWidth,this.title);
      this.addChild(this.title);
      myCanvasDrawer.render();

      // visible html element
      element = document.getElementById("explain");
      element.style.visibility = "visible";
    };
    //  override this method to handle update event
    SceneGuide.prototype.update = function () {
      _super.prototype.update();
    };
    return SceneGuide;
})(SceneBase);
