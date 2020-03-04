class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :nickname, :image, :profile, :address, :confirmed_at, :updated_at
end
