module Concerns
  module ImageUrl
    extend ActiveSupport::Concern
    include Rails.application.routes.url_helpers

    included do
      Rails.application.routes.default_url_options[:host] = ENV['DEV_API_DOMAIN']
    end
  end
end
