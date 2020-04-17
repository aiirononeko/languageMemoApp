class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :image, :profile, :address, :created_at, :updated_at
end
