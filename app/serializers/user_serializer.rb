class UserSerializer < ActiveModel::Serializer
  include Concerns::ImageUrl
  attributes :id, :name, :username, :image, :profile, :address, :twitter_link, :github_link, :created_at, :updated_at

  def image
    image = url_for(object.avatar) if object.avatar.attached?
    image = object.image unless object.avatar.attached?
    image
  end
end
