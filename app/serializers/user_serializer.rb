class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :nickname, :image, :confirmed_at, :updated_at
end
