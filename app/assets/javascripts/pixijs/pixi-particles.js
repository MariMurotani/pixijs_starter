/*! PixiParticles 1.2.2 */
!function(){"use strict";!function(){"use strict";window.cloudkid=window.cloudkid||{};var a={},b=a.DEG_TO_RADS=Math.PI/180;a.rotatePoint=function(a,c){if(a){a*=b;var d=Math.sin(a),e=Math.cos(a),f=c.x*e-c.y*d,g=c.x*d+c.y*e;c.x=f,c.y=g}},a.combineRGBComponents=function(a,b,c){return a<<16|b<<8|c},a.normalize=function(b){var c=1/a.length(b);b.x*=c,b.y*=c},a.scaleBy=function(a,b){a.x*=b,a.y*=b},a.length=function(a){return Math.sqrt(a.x*a.x+a.y*a.y)},a.hexToRGB=function(a,b){b?b.length=0:b=[],"#"==a.charAt(0)?a=a.substr(1):0===a.indexOf("0x")&&(a=a.substr(2));var c;return 8==a.length&&(c=a.substr(0,2),a=a.substr(2)),b.push(parseInt(a.substr(0,2),16)),b.push(parseInt(a.substr(2,2),16)),b.push(parseInt(a.substr(4,2),16)),c&&b.push(parseInt(c,16)),b},a.generateEase=function(a){var b=a.length,c=1/b,d=function(d){var e,f,g=b*d|0;return e=(d-g*c)*b,f=a[g]||a[b-1],f.s+e*(2*(1-e)*(f.cp-f.s)+e*(f.e-f.s))};return d},a.getBlendMode=function(a){if(!a)return PIXI.BLEND_MODES.NORMAL;for(a=a.toUpperCase();a.indexOf(" ")>=0;)a=a.replace(" ","_");return PIXI.BLEND_MODES[a]||PIXI.BLEND_MODES.NORMAL},cloudkid.ParticleUtils=a,Array.prototype.shuffle||Object.defineProperty(Array.prototype,"shuffle",{enumerable:!1,writable:!1,value:function(){for(var a,b,c=this.length;c;a=Math.floor(Math.random()*c),b=this[--c],this[c]=this[a],this[a]=b);return this}}),Array.prototype.random||Object.defineProperty(Array.prototype,"random",{enumerable:!1,writable:!1,value:function(){return this[Math.floor(Math.random()*this.length)]}})}(),function(a){"use strict";var b=a.ParticleUtils,c=function(a){var b=a.particleImages[0]instanceof PIXI.Texture?[a.particleImages[0]]:a.particleImages[0];PIXI.extras.MovieClip.call(this,b),this.emitter=a,this.anchor.x=this.anchor.y=.5,this.velocity=new PIXI.Point,this.maxLife=0,this.age=0,this.ease=null,this.extraData=null,this.startAlpha=0,this.endAlpha=0,this.startSpeed=0,this.endSpeed=0,this.acceleration=null,this.startScale=0,this.endScale=0,this.startColor=null,this._sR=0,this._sG=0,this._sB=0,this.endColor=null,this._eR=0,this._eG=0,this._eB=0,this._doAlpha=!1,this._doScale=!1,this._doSpeed=!1,this._doColor=!1,this._doNormalMovement=!1,this._oneOverLife=0},d=c.prototype=Object.create(PIXI.extras.MovieClip.prototype);d.init=d.Particle_init=function(){this.age=0,this.velocity.x=this.startSpeed,this.velocity.y=0,b.rotatePoint(this.rotation,this.velocity),this.rotation*=b.DEG_TO_RADS,this.rotationSpeed*=b.DEG_TO_RADS,this.alpha=this.startAlpha,this.scale.x=this.scale.y=this.startScale,this.startColor&&(this._sR=this.startColor[0],this._sG=this.startColor[1],this._sB=this.startColor[2],this.endColor&&(this._eR=this.endColor[0],this._eG=this.endColor[1],this._eB=this.endColor[2])),this._doAlpha=this.startAlpha!=this.endAlpha,this._doSpeed=this.startSpeed!=this.endSpeed,this._doScale=this.startScale!=this.endScale,this._doColor=!!this.endColor,this._doNormalMovement=this._doSpeed||0!==this.startSpeed||this.acceleration,this._oneOverLife=1/this.maxLife,this.tint=b.combineRGBComponents(this._sR,this._sG,this._sB)},d.applyArt=function(a){this.texture=a},d.update=d.Particle_update=function(a){if(this.age+=a,this.age>=this.maxLife)return this.kill(),-1;var c=this.age*this._oneOverLife;if(this.ease&&(c=4==this.ease.length?this.ease(c,0,1,1):this.ease(c)),this._doAlpha&&(this.alpha=(this.endAlpha-this.startAlpha)*c+this.startAlpha),this._doScale){var d=(this.endScale-this.startScale)*c+this.startScale;this.scale.x=this.scale.y=d}if(this._doNormalMovement){if(this._doSpeed){var e=(this.endSpeed-this.startSpeed)*c+this.startSpeed;b.normalize(this.velocity),b.scaleBy(this.velocity,e)}else this.acceleration&&(this.velocity.x+=this.acceleration.x*a,this.velocity.y+=this.acceleration.y*a);this.position.x+=this.velocity.x*a,this.position.y+=this.velocity.y*a}if(this._doColor){var f=(this._eR-this._sR)*c+this._sR,g=(this._eG-this._sG)*c+this._sG,h=(this._eB-this._sB)*c+this._sB;this.tint=b.combineRGBComponents(f,g,h)}return 0!==this.rotationSpeed?this.rotation+=this.rotationSpeed*a:this.acceleration&&(this.rotation=Math.atan2(this.velocity.y,this.velocity.x)),c},d.kill=function(){this.emitter.recycle(this)},d.destroy=function(){this.emitter=null,this.velocity=null,this.startColor=this.endColor=null,this.ease=null},a.Particle=c}(cloudkid),function(cloudkid,undefined){"use strict";var ParticleUtils=cloudkid.ParticleUtils,Particle=cloudkid.Particle,PathParticle=function(a){Particle.call(this,a),this.path=null,this.initialRotation=0,this.initialPosition=new PIXI.Point,this.movement=0},s=Particle.prototype,p=PathParticle.prototype=Object.create(s),helperPoint=new PIXI.Point;p.init=function(){if(this.initialRotation=this.rotation,this.Particle_init(),this.extraData&&this.extraData.path){var a=this.emitter._sharedExtraData;if(a.path!==undefined)this.path=a.path;else try{this.path=a.path=parsePath(this.extraData.path)}catch(b){console.error("PathParticle: error in parsing path expression"),this.path=a.path=null}}else console.error("PathParticle requires a path string in extraData!"),this.path=null;this._doNormalMovement=!this.path,this.movement=0,this.initialPosition.x=this.position.x,this.initialPosition.y=this.position.y};for(var MATH_FUNCS=["pow","sqrt","abs","floor","round","ceil","E","PI","sin","cos","tan","asin","acos","atan","atan2","log"],WHITELISTER="[01234567890\\.\\*\\-\\+\\/\\(\\)x ,]",index=MATH_FUNCS.length-1;index>=0;--index)WHITELISTER+="|"+MATH_FUNCS[index];WHITELISTER=new RegExp(WHITELISTER,"g");var parsePath=function(pathString){for(var rtn,matches=pathString.match(WHITELISTER),i=matches.length-1;i>=0;--i)MATH_FUNCS.indexOf(matches[i])>=0&&(matches[i]="Math."+matches[i]);return pathString=matches.join(""),eval("rtn = function(x){ return "+pathString+"; };"),rtn};p.update=function(a){var b=this.Particle_update(a);if(b>=0&&this.path){var c=(this.endSpeed-this.startSpeed)*b+this.startSpeed;this.movement+=c*a,helperPoint.x=this.movement,helperPoint.y=this.path(this.movement),ParticleUtils.rotatePoint(this.initialRotation,helperPoint),this.position.x=this.initialPosition.x+helperPoint.x,this.position.y=this.initialPosition.y+helperPoint.y}},p.destroy=function(){s.destroy.call(this)},cloudkid.PathParticle=PathParticle}(cloudkid),function(a){"use strict";var b=(a.ParticleUtils,a.Particle),c=function(a){b.call(this,a),this._helperTextures=[]},d=b.prototype,e=c.prototype=Object.create(d);e.init=function(){if(this.Particle_init(),this.extraData){this.fps=this.extraData.fps?this.extraData.fps:60;var a=this.extraData.animationSpeed||1;"matchLife"==a?(this.loop=!1,this.animationSpeed=this.hasOwnProperty("_duration")?this._duration/this.maxLife:this.textures.length/this.maxLife/60):(this.loop=!0,this.animationSpeed=a)}else this.loop=!0,this.animationSpeed=1;this.play()},e.applyArt=function(a){Array.isArray(a)?this.textures=a:(this._helperTextures[0]=a,this.textures=this._helperTextures),this.gotoAndStop(0)},e.update=function(a){this.Particle_update(a)>=0&&this._duration&&this.updateAnim(a)},e.destroy=function(){d.destroy.call(this)},a.AnimatedParticle=c}(cloudkid),function(a){"use strict";var b=a.ParticleUtils,c=a.Particle,d=function(a,b,d){this._particleConstructor=c,this.particleImages=null,this.startAlpha=1,this.endAlpha=1,this.startSpeed=0,this.endSpeed=0,this.acceleration=null,this.startScale=1,this.endScale=1,this.minimumScaleMultiplier=1,this.startColor=null,this.endColor=null,this.minLifetime=0,this.maxLifetime=0,this.minStartRotation=0,this.maxStartRotation=0,this.minRotationSpeed=0,this.maxRotationSpeed=0,this.particleBlendMode=0,this.customEase=null,this.extraData=null,this.frequency=0,this.maxParticles=1e3,this.emitterLifetime=-1,this.spawnPos=null,this.spawnType=null,this._spawnFunc=null,this.spawnRect=null,this.spawnCircle=null,this.particlesPerWave=1,this.particleSpacing=0,this.angleStart=0,this.rotation=0,this.ownerPos=null,this._prevEmitterPos=null,this._prevPosIsValid=!1,this._posChanged=!1,this.parent=a,this.addAtBack=!1,this._emit=!1,this._spawnTimer=0,this._emitterLife=-1,this._activeParticles=[],this._pool=[],this._sharedExtraData=null,b&&d&&this.init(b,d)},e=d.prototype={},f=new PIXI.Point;Object.defineProperty(e,"particleConstructor",{get:function(){return this._particleConstructor},set:function(a){a!=this._particleConstructor&&(this._particleConstructor=a,this.cleanup(),this._activeParticles.length&&(this._activeParticles.length=0),this._pool.length&&(this._pool.length=0))}}),e.init=function(a,c){if(a&&c){this.cleanup(),this.particleImages=a instanceof PIXI.Texture?[a]:a;c.alpha?(this.startAlpha=c.alpha.start,this.endAlpha=c.alpha.end):this.startAlpha=this.endAlpha=1,c.speed?(this.startSpeed=c.speed.start,this.endSpeed=c.speed.end):this.startSpeed=this.endSpeed=0;var d=c.acceleration;switch(d&&(d.x||d.y)?(this.endSpeed=this.startSpeed,this.acceleration=new PIXI.Point(d.x,d.y)):this.acceleration=null,c.scale?(this.startScale=c.scale.start,this.endScale=c.scale.end,this.minimumScaleMultiplier=c.scale.minimumScaleMultiplier||1):this.startScale=this.endScale=this.minimumScaleMultiplier=1,c.color&&(this.startColor=b.hexToRGB(c.color.start),this.endColor=c.color.start!=c.color.end?b.hexToRGB(c.color.end):null),c.startRotation?(this.minStartRotation=c.startRotation.min,this.maxStartRotation=c.startRotation.max):this.minStartRotation=this.maxStartRotation=0,c.rotationSpeed?(this.minRotationSpeed=c.rotationSpeed.min,this.maxRotationSpeed=c.rotationSpeed.max):this.minRotationSpeed=this.maxRotationSpeed=0,this.minLifetime=c.lifetime.min,this.maxLifetime=c.lifetime.max,this.particleBlendMode=b.getBlendMode(c.blendMode),this.customEase=c.ease?"function"==typeof c.ease?c.ease:b.generateEase(c.ease):null,this.extraData=c.extraData||null,this._sharedExtraData={},this.minAngle=this.maxAngle=0,this.spawnRect=this.spawnCircle=null,this.particlesPerWave=1,this.particleSpacing=0,this.angleStart=0,c.spawnType){case"rect":this.spawnType="rect",this._spawnFunc=this._spawnRect;var e=c.spawnRect;this.spawnRect=new PIXI.Rectangle(e.x,e.y,e.w,e.h);break;case"circle":this.spawnType="circle",this._spawnFunc=this._spawnCircle;var f=c.spawnCircle;this.spawnCircle=new PIXI.Circle(f.x,f.y,f.r);break;case"arc":this.spawnType="arc",this._spawnFunc=this._spawnArc,this.minAngle=c.angle.min,this.maxAngle=c.angle.max;break;case"burst":this.spawnType="burst",this._spawnFunc=this._spawnBurst,this.particlesPerWave=c.particlesPerWave,this.particleSpacing=c.particleSpacing,this.angleStart=c.angleStart?c.angleStart:0;break;case"point":this.spawnType="point",this._spawnFunc=this._spawnPoint;break;default:this.spawnType="point",this._spawnFunc=this._spawnPoint}this.frequency=c.frequency,this.emitterLifetime=c.emitterLifetime||-1,this.maxParticles=c.maxParticles>0?c.maxParticles:1e3,this.addAtBack=!!c.addAtBack,this.rotation=0,this.ownerPos=new PIXI.Point,this.spawnPos=new PIXI.Point(c.pos.x,c.pos.y),this._prevEmitterPos=this.spawnPos.clone(),this._prevPosIsValid=!1,this._spawnTimer=0,this.emit=!0}},e.recycle=function(a){var b=this._activeParticles.indexOf(a);b<this._activeParticles.length-1&&(this._activeParticles[b]=this._activeParticles[this._activeParticles.length-1]),this._activeParticles.pop(),this._pool.push(a),a.parent&&a.parent.removeChild(a)},e.rotate=function(a){if(this.rotation!=a){var c=a-this.rotation;this.rotation=a,b.rotatePoint(c,this.spawnPos),this._posChanged=!0}},e.updateSpawnPos=function(a,b){this._posChanged=!0,this.spawnPos.x=a,this.spawnPos.y=b},e.updateOwnerPos=function(a,b){this._posChanged=!0,this.ownerPos.x=a,this.ownerPos.y=b},e.resetPositionTracking=function(){this._prevPosIsValid=!1},Object.defineProperty(e,"emit",{get:function(){return this._emit},set:function(a){this._emit=!!a,this._emitterLife=this.emitterLifetime}}),e.update=function(a){var b;for(b=this._activeParticles.length-1;b>=0;--b)this._activeParticles[b].update(a);var c,d;this._prevPosIsValid&&(c=this._prevEmitterPos.x,d=this._prevEmitterPos.y);var e=this.ownerPos.x+this.spawnPos.x,f=this.ownerPos.y+this.spawnPos.y;if(this.emit)for(this._spawnTimer-=a;this._spawnTimer<=0;){if(this._emitterLife>0&&(this._emitterLife-=this.frequency,this._emitterLife<=0)){this._spawnTimer=0,this._emitterLife=0,this.emit=!1;break}if(this._activeParticles.length>=this.maxParticles)this._spawnTimer+=this.frequency;else{var g;if(g=this.minLifetime==this.maxLifetime?this.minLifetime:Math.random()*(this.maxLifetime-this.minLifetime)+this.minLifetime,-this._spawnTimer<g){var h,i;if(this._prevPosIsValid&&this._posChanged){var j=1+this._spawnTimer/a;h=(e-c)*j+c,i=(f-d)*j+d}else h=e,i=f;b=0;for(var k=Math.min(this.particlesPerWave,this.maxParticles-this._activeParticles.length);k>b;++b){var l=this._pool.length?this._pool.pop():new this.particleConstructor(this);if(l.applyArt(this.particleImages.length>1?this.particleImages.random():this.particleImages[0]),l.startAlpha=this.startAlpha,l.endAlpha=this.endAlpha,l.startSpeed=this.startSpeed,l.endSpeed=this.endSpeed,l.acceleration=this.acceleration,1!=this.minimumScaleMultiplier){var m=Math.random()*(1-this.minimumScaleMultiplier)+this.minimumScaleMultiplier;l.startScale=this.startScale*m,l.endScale=this.endScale*m}else l.startScale=this.startScale,l.endScale=this.endScale;l.startColor=this.startColor,l.endColor=this.endColor,l.rotationSpeed=this.minRotationSpeed==this.maxRotationSpeed?this.minRotationSpeed:Math.random()*(this.maxRotationSpeed-this.minRotationSpeed)+this.minRotationSpeed,l.maxLife=g,l.blendMode=this.particleBlendMode,l.ease=this.customEase,l.extraData=this.extraData,this._spawnFunc(l,h,i,b),l.init(),l.update(-this._spawnTimer),this.addAtBack?this.parent.addChildAt(l,0):this.parent.addChild(l),this._activeParticles.push(l)}}this._spawnTimer+=this.frequency}}this._posChanged&&(this._prevEmitterPos.x=e,this._prevEmitterPos.y=f,this._prevPosIsValid=!0,this._posChanged=!1)},e._spawnPoint=function(a,b,c){a.rotation=this.minStartRotation==this.maxStartRotation?this.minStartRotation+this.rotation:Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,a.position.x=b,a.position.y=c},e._spawnRect=function(a,c,d){a.rotation=this.minStartRotation==this.maxStartRotation?this.minStartRotation+this.rotation:Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,f.x=Math.random()*this.spawnRect.width+this.spawnRect.x,f.y=Math.random()*this.spawnRect.height+this.spawnRect.y,0!==this.rotation&&b.rotatePoint(this.rotation,f),a.position.x=c+f.x,a.position.y=d+f.y},e._spawnCircle=function(a,c,d){a.rotation=this.minStartRotation==this.maxStartRotation?this.minStartRotation+this.rotation:Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,f.x=Math.random()*this.spawnCircle.radius,f.y=0,b.rotatePoint(360*Math.random(),f),f.x+=this.spawnCircle.x,f.y+=this.spawnCircle.y,0!==this.rotation&&b.rotatePoint(this.rotation,f),a.position.x=c+f.x,a.position.y=d+f.y},e._spawnBurst=function(a,b,c,d){a.rotation=0===this.particleSpacing?360*Math.random():this.angleStart+this.particleSpacing*d+this.rotation,a.position.x=b,a.position.y=c},e.cleanup=function(){for(var a=this._activeParticles.length-1;a>=0;--a)this.recycle(this._activeParticles[a])},e.destroy=function(){this.cleanup();for(var a=this._pool.length-1;a>=0;--a)this._pool[a].destroy();this._pool=null,this._activeParticles=null,this.parent=null,this.particleImages=null,this.spawnPos=null,this.ownerPos=null,this.startColor=null,this.endColor=null,this.customEase=null},a.Emitter=d}(cloudkid);}();