class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  skip_before_filter :verify_authenticity_token, :only => [:update]
end
