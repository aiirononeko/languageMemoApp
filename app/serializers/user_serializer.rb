class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :profile, :address, :created_at, :updated_at
end
