class FolderRelationship < ApplicationRecord
  belongs_to :child, class_name: "Folder"
  belongs_to :parent, class_name: "Folder"
end
