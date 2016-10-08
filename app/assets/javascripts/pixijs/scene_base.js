var SceneBase = (function (_super) {
    __extends(SceneBase, _super);
    function SceneBase() {
        _super.apply(this, arguments);
        this.name = arguments[0];
        this.title = arguments[1];
        this.stage = this;
    }

    SceneBase.prototype.getName = function () {
        return this.name;
    };
    SceneBase.prototype.getTitle = function () {
        return this.title;
    };
    SceneBase.prototype.dataLoad = function (success, error) {
        $.ajax({
            url: LOAD_URL,
            type: 'GET',
            dataType: 'json',
            timeout: 5000,
            success: success,
            error: error
        })
    };
    SceneBase.prototype.dataSave = function (success, error, data) {
        $.ajax({
            url: SAVE_URL,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            timeout: 5000,
            success: success,
            error: error
        })
    };
    //  this function is called when scene stats , is called as call back of resource load
    SceneBase.prototype.start = function () {
        this.ticker = PIXI.ticker.shared.add(myCanvasDrawer.currentStage.update, myCanvasDrawer.currentStage);
    };
    SceneBase.prototype.destroy = function () {
        this.ticker.stop();
        this.ticker = PIXI.ticker.shared.remove(myCanvasDrawer.currentStage.update, myCanvasDrawer.currentStage);
    };
    SceneBase.prototype.update = function () {
    };
    SceneBase.prototype.render = function () {
        myCanvasDrawer.render();
    };
    return SceneBase;
})(Container);
