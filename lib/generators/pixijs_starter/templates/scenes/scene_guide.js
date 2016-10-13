var SceneGuide = (function (_super) {
    __extends(SceneGuide, _super);
    function SceneGuide() {
        _super.apply(this, arguments);
    }
    //  this is called just before scene changes
    SceneGuide.prototype.destroy = function () {
      // invisible html element
      element = document.getElementById("explain");
      element.style.visibility = "collapse";

        _super.prototype.destroy();
    };

    //  this function is called as call back of resource load
    //  use this method as start point of this scene
    SceneGuide.prototype.start = function () {
      _super.prototype.start();

      // title image
      this.title = new Sprite(resources["/assets/pixijs/logo.png"].texture);
      this.title = __setCenterX(this.title);
      this.addChild(this.title);
      this.render();

      // visible html element
      var element = $("#explain").clone();
      element.css("visibility","visible");

      div = $(myCanvasDrawer.overlay_prefix+"2").append(element);
    };

    //  override this method to handle update event
    SceneGuide.prototype.update = function () {
      _super.prototype.update();
    };
    return SceneGuide;
})(SceneBase);
