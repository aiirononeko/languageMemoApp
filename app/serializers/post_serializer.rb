class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :content, :public, :user_id, :folder_id, :created_at, :updated_at
end
