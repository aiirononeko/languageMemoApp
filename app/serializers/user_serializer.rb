class UserSerializer < ActiveModel::Serializer
  include Concerns::ImageUrl
  attributes :id, :name, :username, :image, :profile, :address, :twitter_link, :github_link, :created_at, :updated_at

  def image
    object.avatar.attached? ?  url_for(object.avatar) : object.image
  end
end
