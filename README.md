# PixijsStarter

Welcome to your new gem! In this directory, you'll find the files you need to be able to package up your Ruby library into a gem. Put your Ruby code in the file `lib/pixijs_starter`. To experiment with that code, run `bin/console` for an interactive prompt.

TODO: Delete this and the text above, and describe your gem

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'pixijs_starter'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install pixijs_starter

## Usage

TODO: Write usage instructions here

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

### 1. Start in your app
1. include gem
`gem 'pixijs_starter', path: '$downloaded_path/pixijs_starter'`
`bundle update`

2. generate controller
`rails generate controller pixijs index loadpoint savepoint`

3. modify index.html.erb as following example
https://github.com/MariMurotani/pixijs_starter_test/blob/master/app/views/pixijs/index.html.erb

4. add routing as following example
https://github.com/MariMurotani/pixijs_starter_test/blob/master/config/routes.rb

5. start rails server
`bundle exec rails server`

6. access to index page
http://localhost:3000/pixijs/index

### 2. Customize in your app


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/pixijs_starter. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
