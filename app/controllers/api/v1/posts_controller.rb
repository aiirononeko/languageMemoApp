class Api::V1::PostsController < ApplicationController
  before_action :authenticate_api_v1_user!, except:[:show]
  before_action :set_post, except: [:new,:create,:show]
  before_action :correct_user?, only: [:update, :destroy]

  def show
    @post = Post.find_by(uid: params[:uid])
    if @post 
      render json: @post, serializer: PostSerializer
    else
      head :not_found
    end
  end

  def create
    @post = current_api_v1_user.posts.build(post_params)
    if @post.save
      @post.update(uid: Digest::MD5.hexdigest(@post.id.to_s))
      render json: @post, serializer: PostSerializer
    else
      render status: :unprocessable_entity, json: @post.errors
    end
  end

  def update
    if @post.update(post_params)
      render json: @post, serializer: PostSerializer
    else
      render  status: :unprocessable_entity, json: @post.errors
    end
  end

  def destroy
    if @post.destroy
      render json: { status: 200, message: "削除に成功しました" }
    else
      render json: { status: "error", errors: @post.errors }
    end
  end

  private

  def post_params
    params.require(:post).permit(:name, :content, :public, :user_id, :folder_id, :uid)
  end

  def set_post
    @post = Post.find_by(id: params[:id])
  end

  def correct_user?
    return if current_api_v1_user == @post.user
    render status: 401, json: { success: false,
                   errors: ["アクセスする権限がありません"] }
  end
end
