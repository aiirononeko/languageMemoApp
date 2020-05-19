class FolderSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :public, :created_at, :updated_at, :posts
end
