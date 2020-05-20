require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    config.generators do |g|  #12行〜15行は作成しない為に記述
      g.stylesheets false
      g.javascripts false
      g.helper false
      g.test_framework false
    end
  end
end
