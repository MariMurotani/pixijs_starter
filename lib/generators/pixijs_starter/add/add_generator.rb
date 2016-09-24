module PixijsStarter
  # Base=引数は自由に取れる NamedBase=引数を一つ取る
  # bundle exec rails generate pixijs_starter:add test
  class AddGenerator < Rails::Generators::NamedBase
    source_root File.expand_path("../../templates", __FILE__)
    def add
      puts "add start.."
      scene_tpl = "#{source_paths[0]}/scenes/scene_template.js"
      dist_name = "app/assets/javascripts/pixijs/scenes/scene_#{name}.js"

      s = File.read(scene_tpl, :encoding => Encoding::UTF_8)
      s = s.gsub("%%SceneName%%","Scene#{name.capitalize!}")

      create_file dist_name,s

      puts "..end"
    end
  end
end
