(function(global) {
    "use strict;"
    CanvasDrawer = function(windowWidth,windowHeight,backgroundColor) {
            this.backgroundColor = backgroundColor;
            this.previousStage;
            this.currentStage;
            this.stage_prefix = "#stage";
            this.overlay_prefix = "#overlay";
            this.windowWidth = windowWidth;
            this.windowHeight = windowHeight;
            this.initialized = false;
            this.animateSwitch = false;
        };

        CanvasDrawer.prototype.initialize = function(params) {
        params = params || {                        //Options
            antialiasing: false,
            transparent: false,
            resolution: 1
        };

        this.renderer1 = PIXI.autoDetectRenderer(
            this.windowWidth,                     //Width
            this.windowHeight,                     //Height
            params,
            false                    //Optionally force canvas rendering
        );
        this.renderer2 = PIXI.autoDetectRenderer(
            this.windowWidth,                     //Width
            this.windowHeight,                     //Height
            params,
            false                    //Optionally force canvas rendering
        );

        var rend1 = $(this.stage_prefix+"1");
        rend1.css({
            "position": "absolute",
            "top":0,
            "left": 0
        });
        var rend2 = $(this.stage_prefix+"2");
        rend2.css({
            "position": "absolute",
            "top":0,
            "left": this.windowWidth
        });

        $(this.stage_prefix+"1").append(this.renderer1.view);
        $(this.stage_prefix+"2").append(this.renderer2.view);
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
        if(myCanvasDrawer.backgroundColor != null){
            myCanvasDrawer.renderer1.backgroundColor = myCanvasDrawer.backgroundColor;
        }
        myCanvasDrawer.currentStage.start();
    };

    CanvasDrawer.prototype.switchStage = function(scene_name,scene_title) {
        if(myCanvasDrawer.currentStage != null) {
            myCanvasDrawer.currentStage.removeChildren();
            myCanvasDrawer.currentStage.destroy();
        }
        this.previousStage = myCanvasDrawer.currentStage;
        this.animateSwitch  = true;
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
        myCanvasDrawer.LoadingTxt = __setCenterY(__setCenterX(myCanvasDrawer.LoadingTxt),myCanvasDrawer.LoadingTxt);
        myCanvasDrawer.previousStage = new Container();
        myCanvasDrawer.previousStage.removeChildren();
        myCanvasDrawer.previousStage.addChild(myCanvasDrawer.LoadingTxt);
        myCanvasDrawer.renderer1.render(myCanvasDrawer.previousStage);
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
        myCanvasDrawer.renderer1.render(myCanvasDrawer.previousStage);
        myCanvasDrawer.renderer2.render(myCanvasDrawer.currentStage);

        if(myCanvasDrawer.animateSwitch){
            $(this.stage_prefix+"2").css("left",200);
            $(this.stage_prefix+"2").animate({
                left:0
            },100);
            myCanvasDrawer.animateSwitch = false;
        }
    };

})((this || 0).self || global);
