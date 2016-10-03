# PixijsStarter

Welcome to pixijs starter kit!
This is javascript framework to start pixijs quickly.
1. resource preloader and loading display is supported
2. scene changer is supported

## Installation
Add location of this repository to your application's Gemfile:

```ruby
gem 'pixijs_starter', :git => 'git://github.com/MariMurotani/pixijs_starter',:branch => "master"
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install pixijs_starter

## Usage

This package is for someone who want to start developping pixijs application.
It will provide efficient way to implement pixijs , you just need to override start() and update() method and fill up your logic into there.

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

### 1. Start in your app
#### 1. create assets on your project with generator
```ruby
bundle exec rails generate pixijs_starter:install
```

#### 2. generate controller
```ruby
rails generate controller pixijs index loadpoint savepoint
```

#### 3. make sure that you have precomiple config in `config/application.rb`
```ruby
config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)
```

#### 4. modify require setting in `pixijs.js` as following  [example](https://github.com/MariMurotani/pixijs_starter_test/blob/master/app/assets/javascripts/pixijs.js).

```ruby
//= require pixijs/jquery-3.1.1.min
//= require pixijs/pixi.min
//= require pixijs/pixi-particles
//= require pixijs/stats
//= require pixijs/alias
//= require pixijs/resources
//= require pixijs/scene_base
//= require_tree ./pixijs
//= require pixijs/main
```

#### 5. modify index.html.erb as following [example](https://github.com/MariMurotani/pixijs_starter_test/blob/master/app/views/pixijs/index.html.erb)
```html
<style type="text/css">
.parent{
  position: relative;
  height: 100%;
  width: 600px;
  margin-right: auto;margin-left:auto;
  overflow: hidden;
}
div.overflow{
  width: 500px;
  height: 600px;
}
</style>
<script type="text/javascript">
var myCanvasDrawer;
$(document).ready(function(){
  myCanvasDrawer = new CanvasDrawer(window.innerWidth,window.innerHeight,0x000000);
  myCanvasDrawer.initialize();
  myCanvasDrawer.switchStage("SceneMain","メインのシーン");
});
</script>
<div class="parent overflow" style="width:500px;">
  <div>
    <div id="stage1"></div>
    <div id="stage2"></div>
  </div>
  </div>
</div>

```

#### 6. add routing as following [example](https://github.com/MariMurotani/pixijs_starter_test/blob/master/config/routes.rb)

```ruby
Rails.application.routes.draw do
  get 'pixijs/index'
  get 'pixijs/loadpoint'
  post 'pixijs/savepoint'
end
```

#### 7. start rails server
```ruby
bundle exec rails server
```

#### 8. access to index page
http://localhost:3000/pixijs/index

### 2. Customize in your app
#### 1. create scene on your project with generator
```ruby
bundle exec rails generate pixijs_starter:add your_scene_name
```

this command will create `scene_your_scene_name.js` into `pixijs/scenes`

#### 2. modify `pixijs/resources.js` to add preload resources as following [example](https://github.com/MariMurotani/pixijs_starter_test/blob/master/app/assets/javascripts/pixijs/resources.js)

```javascript
var PRELOAD_RESOUCES = {
  "YourSceneName": [ // name of class => scene_main.js == SceneMain
    "/assets/pixijs/title.png"
  ],
```

#### 3. modify scene which is created in step1
see original document provided by [pixijs](https://pixijs.github.io/docs/)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/MariMurotani/pixijs_starter. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
