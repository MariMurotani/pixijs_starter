var %%SceneName%% = (function (_super) {
    __extends(%%SceneName%%, _super);
    function %%SceneName%%() {
        _super.apply(this, arguments);
    }
    //  this is called just before scene changes
    %%SceneName%%.prototype.destroy = function () {
      _super.prototype.destroy();
    };
    //  this function is called as call back of resource load
    //  use this method as start point of this scene
    %%SceneName%%.prototype.start = function () {
      _super.prototype.start();
      myCanvasDrawer.render();
    };
    //  override this method to handle update event
    %%SceneName%%.prototype.update = function () {
      _super.prototype.update();
    };
    return %%SceneName%%;
})(SceneBase);
