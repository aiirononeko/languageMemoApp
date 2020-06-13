class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :content, :public, :user_id, :ancestor_folders, :created_at, :updated_at

  def ancestor_folders
    ancestor_folders = []
    return nil if object.folder_id.nil?
    folder = Folder.find_by(id: object.folder_id)
    ancestor_folders << folder
    loop do
      folder = Folder.find_by(id: folder.parent_id)
      break if folder.nil?
      ancestor_folders << folder
    end
    ancestor_folders
  end
end
