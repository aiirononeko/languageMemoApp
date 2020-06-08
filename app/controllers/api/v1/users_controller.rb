class Api::V1::UsersController < ApplicationController
  def show
    @user = User.find_by(username: params[:username])
    if @user
      render json: @user, serializer: UserSerializer
    else
      head :not_found
    end
  end
end
