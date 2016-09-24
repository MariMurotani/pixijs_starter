module PixijsStarter
  # bundle exec rails generate pixijs_starter:install
  class InstallGenerator < ::Rails::Generators::Base
    source_root File.expand_path("../../templates", __FILE__)

    def install
      puts "install start.."
      dist_root = "app/assets/javascripts/pixijs"
      scene_root = "app/assets/javascripts/pixijs/scenes"

      files = []
      files.push ["resources.js","#{dist_root}/resources.js"]
      files.push ["scenes/scene_main.js","#{scene_root}/scene_main.js"]
      files.push ["scenes/scene_guide.js","#{scene_root}/scene_guide.js"]

      FileUtils.mkdir_p(dist_root) unless FileTest.exist?(dist_root)
      FileUtils.mkdir_p(scene_root) unless FileTest.exist?(scene_root)

      files.each do |file|
        copy_file file[0],"#{file[1]}"
      end
      puts "..end"
    end
  end
end
