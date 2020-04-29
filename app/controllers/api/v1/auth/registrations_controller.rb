class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :authenticate_api_v1_user!, except:[:create,:new]

  def edit
    render json: current_api_v1_user, serializer: UserSerializer
  end

  private

  def sign_up_params
    params.permit(:email, :password, :username)
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

  def sign_up_params
    params.permit(*params_for_resource(:sign_up)).merge(username: set_default_username)
  end

  def set_default_username
    loop do 
      default_username = SecureRandom.alphanumeric(15)
      return default_username unless User.find_by(username: default_username)
    end
  end
end