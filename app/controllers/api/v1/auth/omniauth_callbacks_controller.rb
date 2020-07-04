module Api::V1::Auth
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    include Devise::Controllers::Rememberable

    def redirect_callbacks
      # derive target redirect route from 'resource_class' param, which was set
      # before authentication.
      devise_mapping = get_devise_mapping
      redirect_route = get_redirect_route(devise_mapping)

      case params[:provider]
      when "google_oauth2"
        request.env['omniauth.params'] = request.env['omniauth.params'].merge({auth_origin_url: "http://localhost:3001/auth/google_oauth2"})
      when "twitter"
        request.env['omniauth.params'] = request.env['omniauth.params'].merge({auth_origin_url: "http://localhost:3001/auth/twitter"})
      when "github"
        request.env['omniauth.params'] = request.env['omniauth.params'].merge({auth_origin_url: "http://localhost:3001/auth/github"})
      end
      # preserve omniauth info for success route. ignore 'extra' in twitter
      # auth response to avoid CookieOverflow.
      session['dta.omniauth.auth'] = request.env['omniauth.auth'].except('extra')
      session['dta.omniauth.params'] = request.env['omniauth.params']
      redirect_to redirect_route
    end

    def omniauth_success
      if current_api_v1_user
        assign_provider_attrs_for_current_user(current_api_v1_user, auth_hash)
        current_api_v1_user.save!
        render json: current_api_v1_user, serializer: UserSerializer
      else
        get_resource_from_auth_hash
        set_token_on_resource
        create_auth_params

        if confirmable_enabled?
          # don't send confirmation email!!!
          @resource.skip_confirmation!
        end

        sign_in(:user, @resource, store: false, bypass: false)
        @resource.save!
        update_auth_header

        yield @resource if block_given?
        render_data_or_redirect('deliverCredentials', @auth_params.as_json, @resource.as_json)
      end
    end

    protected

    def assign_provider_attrs(user, auth_hash)
      attrs = auth_hash['info'].to_hash
      extra_info = {}
      extra_info = {
        "twitter_link" => attrs&.fetch("urls")&.fetch("Twitter", nil)
      } if auth_hash["provider"] == "twitter"
      extra_info = {
        "github_link" => attrs&.fetch("urls")&.fetch("GitHub", nil),
        "github_token" => auth_hash&.fetch("credentials")&.fetch("token")
      } if auth_hash["provider"] == "github"

      attrs = attrs.slice(*user.attribute_names)
      attrs = attrs.merge(extra_info)
      user.assign_attributes(attrs)
    end

    def assign_provider_attrs_for_current_user(user, auth_hash)
      attrs = auth_hash['info'].to_hash
      extra_info = {}
      extra_info = {
        "twitter_link" => attrs&.fetch("urls")&.fetch("Twitter", nil)
      } if auth_hash["provider"] == "twitter"

      extra_info = {
        "github_link" => attrs&.fetch("urls")&.fetch("GitHub", nil),
        "github_token" => auth_hash&.fetch("credentials")&.fetch("token")
      } if auth_hash["provider"] == "github"
      
      user.assign_attributes(extra_info)
    end

    def render_data_or_redirect(message, data, user_data = {})

      # We handle inAppBrowser and newWindow the same, but it is nice
      # to support values in case people need custom implementations for each case
      # (For example, nbrustein does not allow new users to be created if logging in with
      # an inAppBrowser)
      #
      # See app/views/devise_token_auth/omniauth_external_window.html.erb to understand
      # why we can handle these both the same.  The view is setup to handle both cases
      # at the same time.
      if ['inAppBrowser', 'newWindow'].include?(omniauth_window_type)
        render_data(message, user_data.merge(data))

      elsif auth_origin_url # default to same-window implementation, which forwards back to auth_origin_url

        # build and redirect to destination url
        redirect_to "#{DeviseTokenAuth::Url.generate(auth_origin_url, data.merge(blank: true))}&username=#{current_api_v1_user.username}&id=#{current_api_v1_user.id}"
      else

        # there SHOULD always be an auth_origin_url, but if someone does something silly
        # like coming straight to this url or refreshing the page at the wrong time, there may not be one.
        # In that case, just render in plain text the error message if there is one or otherwise
        # a generic message.
        fallback_render data[:error] || 'An error occurred'
      end
    end

    def get_resource_from_auth_hash
      super
      @resource.assign_attributes({username: default_username}) if @resource.new_record?
      @resource
    end

    def default_username
      SecureRandom.alphanumeric(15)
    end
  end
end
