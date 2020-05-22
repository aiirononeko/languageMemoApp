class Api::V1::UsersController < ApplicationController
  def show
    @user = User.find_by(username: params[:username])
    render json: @user, serializer: UserSerializer
  end
end
