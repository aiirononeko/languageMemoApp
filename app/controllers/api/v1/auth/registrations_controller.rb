class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :authenticate_api_v1_user!, except:[:create,:new]
  wrap_parameters false

  def edit
    render json: current_api_v1_user, serializer: UserSerializer
  end

  private

  def sign_up_params
    params.permit(:email, :password, :username).merge(username: default_username)
  end

  def account_update_params
    params.permit(:name, :username, :image, :profile, :address)
  end

  def render_create_success
    render json: @resource, serializer: UserSerializer
  end

  def render_update_success
    render json: @resource, serializer: UserSerializer
  end

  def set_default_username
    default_username = "user" + SecureRandom.alphanumeric(15)
    @resource.update
  end

  def default_username
    SecureRandom.alphanumeric(15)
  end
end
