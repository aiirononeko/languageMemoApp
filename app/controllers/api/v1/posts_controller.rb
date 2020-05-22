class Api::V1::PostsController < ApplicationController
  before_action :authenticate_api_v1_user!, except:[:show]
  before_action :set_post, except: [:new,:create]
  before_action :correct_user?, only: [:update, :destroy]

  def show
    render json: @post, serializer: PostSerializer
  end

  def new
    @post = Post.new
    render json: @post, serializer: PostSerializer
  end

  def create
    @post = current_api_v1_user.posts.build(post_params)
    if @post.save
      render json: @post, serializer: PostSerializer
    else
      render json: { status: "error", errors: @post.errors }
    end
  end

  def edit
    render json: @post, serializer: PostSerializer
  end

  def update
    if @post.update(post_params)
      render json: @post, serializer: PostSerializer
    else
      render json: { status: "error", errors: @post.errors }
    end
  end

  def destroy
    if @post.destroy
      render json: @post, serializer: PostSerializer
    else
      render json: { status: "error", errors: @post.errors }
    end
  end

  private

  def post_params
    params.require(:post).permit(:name, :content, :public, :user_id, :folder_id)
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def correct_user?
    return if current_api_v1_user == @post.user
    render json: { success: false,
                   errors: ["You don't have the right to access this resource"] }
  end
end
