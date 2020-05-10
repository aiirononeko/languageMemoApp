class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :image, :profile, :address, :twitter_link, :github_link, :created_at, :updated_at
end
