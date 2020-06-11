class FolderSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :public, :created_at, :updated_at, :posts, :ancestor_folders, :child_folders

  def ancestor_folders
    ancestor_folders = []
    folder = object
    loop do
      folder = Folder.find_by(id: folder.parent_id)
      break if folder.nil?
      ancestor_folders << folder
    end
    ancestor_folders
  end
end
