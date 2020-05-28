class Folder < ApplicationRecord
  belongs_to :user

  has_many :posts, dependent: :destroy
  has_many :parent_relationships, dependent: :destroy, foreign_key: "parent_id", class_name: "FolderRelationship"
  has_many :child_relationships, dependent: :destroy, foreign_key: "child_id", class_name: "FolderRelationship"
  has_many :parent_folder, through: :parent_relationships, source: :parent
  has_many :child_folders, through: :child_relationships, source: :child

  validates :name, presence: true, length: { maximum: 50 }
  validates :public, inclusion: { in: [true, false] }
end
