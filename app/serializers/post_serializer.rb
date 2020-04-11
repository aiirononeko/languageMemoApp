class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :content, :public, :user_id, :created_at, :updated_at
end
