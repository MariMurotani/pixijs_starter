(function(global) {
    "use strict;"
    CanvasDrawer = function(windowWidth,windowHeight,backgroundColor) {
      this.backgroundColor = backgroundColor;
      this.stages = [];
      this.currentStage = new Container();
      this.windowWidth = windowWidth;
      this.windowHeight = windowHeight;
      this.initialized = false;
    };

    CanvasDrawer.prototype.initialize = function(params) {
      params = params || {                        //Options
        antialiasing: false,
        transparent: false,
        resolution: 1
      };
      this.renderer = PIXI.autoDetectRenderer(
        this.windowWidth,                     //Width
        this.windowHeight,                     //Height
        params,
        false                    //Optionally force canvas rendering
      );
      document.body.appendChild(this.renderer.view);
    };

    CanvasDrawer.prototype.resourceLoad = function(){
      var allResouces = [];
      for (key in PRELOAD_RESOUCES) {
        Array.prototype.push.apply(allResouces, PRELOAD_RESOUCES[key]);
      }
      this.writeMessage("Start Loading");
      loader
        .add(allResouces)
        .on("progress", this.loadProgressHandler)
        .load(CanvasDrawer.prototype.afterLoading);

    };

    CanvasDrawer.prototype.loadProgressHandler = function(loader, resource){
      CanvasDrawer.prototype.writeMessage("Loading " +　loader.progress + "%");
    };

    CanvasDrawer.prototype.afterLoading = function(loader, resource){
      myCanvasDrawer.initialized = true;
      myCanvasDrawer.currentStage.removeChildren();
      if(myCanvasDrawer.backgroundColor != null){
        myCanvasDrawer.renderer.backgroundColor = myCanvasDrawer.backgroundColor;
      }
      myCanvasDrawer.currentStage.start();
    };

    CanvasDrawer.prototype.switchStage = function(scene_name,scene_title) {
      myCanvasDrawer.currentStage.removeChildren();
      myCanvasDrawer.currentStage.destroy();
      /// remove any item on scene
      cmd = "this.currentStage = new " + scene_name + "(scene_name,scene_title);";
      eval(cmd);
      /// load resouces, after complete resource loading,afterResourceLoading is called
      if(this.initialized == false){
        this.resourceLoad();
      }else{
        myCanvasDrawer.currentStage.start();
      }
    };

    CanvasDrawer.prototype.writeMessage = function(word){
      myCanvasDrawer.LoadingTxt = new PIXI.Text(word, __style);
      myCanvasDrawer.LoadingTxt = __setCenterY(myCanvasDrawer.windowHeight,__setCenterX(myCanvasDrawer.windowWidth,myCanvasDrawer.LoadingTxt),myCanvasDrawer.LoadingTxt);

      myCanvasDrawer.currentStage.removeChildren();
      myCanvasDrawer.currentStage.addChild(myCanvasDrawer.LoadingTxt);
      myCanvasDrawer.renderer.render(myCanvasDrawer.currentStage);
      return myCanvasDrawer.LoadingTxt;
    };

    CanvasDrawer.prototype.getScenes = function(word){
      var scenes = new Array();
      for( var prop in window ) {
          if ( prop == null || prop.match("Scene[0-9a-zA-Z]{1}")) {
            if(typeof window[ prop ] == "function"){
              if ((window.hasOwnProperty( 'name' ) == true) && (prop != "SceneBase")) {
                scenes.push(prop);
              }
            }
          }
      }
      return scenes;
    };

    CanvasDrawer.prototype.render = function(){
      myCanvasDrawer.renderer.render(myCanvasDrawer.currentStage);
    };

})((this || 0).self || global);
