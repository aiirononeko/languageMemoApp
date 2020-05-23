class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :authenticate_api_v1_user!, except:[:create,:new]
  wrap_parameters false

  def edit	
    render json: current_api_v1_user, serializer: UserSerializer	
  end

  def update
    if params[:avatar]
      image_match = params[:avatar].match(/^data:(.*?);(?:.*?),(.*)$/)
      mime_type, encoded_image = image_match.captures
      extension = mime_type.split('/').second
      decoded_image = Base64.decode64(encoded_image)
      filename = "avatar#{current_api_v1_user.id}.#{extension}"
      image_path = Rails.root.join('storage', filename)
      File.open(image_path, 'wb') do |f|
        f.write(decoded_image)
      end
      current_api_v1_user.avatar.attach({ io: File.open(image_path), filename: filename, content_type: mime_type })
    end
    super
  end
  

  private

  def sign_up_params
    params.permit(:email, :password, :username).merge(username: default_username)
  end

  def account_update_params
    params.permit(:name, :username, :image, :profile, :address, :avatar)
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
