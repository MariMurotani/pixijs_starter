require 'test_helper'
require 'generators/pixijs_starter/pixijs_starter_generator'

class PixijsStarterGeneratorTest < Rails::Generators::TestCase
  tests PixijsStarterGenerator
  destination Rails.root.join('tmp/generators')
  setup :prepare_destination

  # test "generator runs without errors" do
  #   assert_nothing_raised do
  #     run_generator ["arguments"]
  #   end
  # end
end
