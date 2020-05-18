class FolderSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :public, :created_at, :updated_at
  has_many :posts, serializer: PostSerializer
end
