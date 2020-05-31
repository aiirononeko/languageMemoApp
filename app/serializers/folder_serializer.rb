class FolderSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :public, :created_at, :updated_at, :posts, :parent_folder, :child_folders

  def parent_folder
    Folder.find_by(id: object.parent_id)
  end
end
