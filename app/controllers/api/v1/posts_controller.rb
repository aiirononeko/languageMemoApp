class Api::V1::PostsController < ApplicationController
  before_action :authenticate_api_v1_user!, except:[:show]
  before_action :set_posts, only: [:show, :edit, :update]

  def show
    render json: @post, serializer: PostSerializer
  end

  def new
    @post = Post.new
    render json: @post, serializer: PostSerializer
  end

  def create
    @post = current_api_v1_user.posts.build(post_paramas)
    if @post.save!
    else
      render json: @post, serializer: PostSerializer
    end
    
  end

  def edit
    render json: @post, serializer: PostSerializer
  end

  def update
    if @post.update(update_post_params)
    else
      render json: @post, serializer: PostSerializer
    end
  end

  def destroy
  end

  private

  def post_parama
    params.require(:post).permit(:name, :content, :public)
  end

  def set_posts
    @post = Post.find(params[:id])
  end

  def update_post_params
    params.require(:post).permit(:name, :content, :public)
  end
end
