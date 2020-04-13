class Api::V1::PostsController < ApplicationController
  before_action :authenticate_api_v1_user!, except:[:show]
  before_action :set_posts, except: [:new, :create]

  def show
    render json: @post, serializer: PostSerializer
  end

  def new
    @post = Post.new
    render json: @post, serializer: PostSerializer
  end

  def create
    @post = current_api_v1_user.posts.build(post_paramas)
    if @post.save
      render status: :success, json: @post
    else
      render status: error, json: @post.errors
    end
    
  end

  def edit
    render json: @post, serializer: PostSerializer
  end

  def update
    if @post.update(update_post_params)
      render status: :success, json: @post
    else
      render status: error, json: @post.errors
    end
  end

  def destroy
    if @post.destroy
      render status: :success, json: @post
    else
      render status: error, json: @post.errors
    end
  end

  private

  def post_paramas
    params.require(:post).permit(:name, :content, :public, :user_id)
  end

  def set_posts
    @post = Post.find(params[:id])
  end

  def update_post_params
    params.require(:post).permit(:name, :content, :public)
  end
end
