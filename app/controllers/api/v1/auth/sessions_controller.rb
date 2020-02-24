class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController 

  def render_create_success 
   render json: @resource, serializer: UserSerializer
  end 

end 