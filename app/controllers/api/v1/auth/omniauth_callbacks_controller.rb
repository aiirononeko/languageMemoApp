module Api::V1::Auth
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    include Devise::Controllers::Rememberable
    skip_before_filter :verify_authenticity_token

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

  end
end
