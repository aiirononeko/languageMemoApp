class Api::V1::Auth::TokenValidationsController < DeviseTokenAuth::TokenValidationsController 

  def render_validate_token_success
   render json: @resource, serializer: UserSerializer
  end 
end 