class UserSerializer < ActiveModel::Serializer
  include Concerns::ImageUrl
  attributes :id, :name, :username, :image, :profile, :posts, :folders, :address, :twitter_link, :github_link, :created_at, :updated_at

  def image
    object.avatar.attached? ?  url_for(object.avatar) : object.image
  end

  def posts
    object.posts.where(folder_id: nil)
  end

  def folders
    object.folders.where(parent_id: nil)
  end
end
