class FolderRelationship < ApplicationRecord
  belongs_to :child, class_name: "Folder"
  belongs_to :parent, class_name: "Folder"

  validates :parent_id, presence: true, uniqueness: { scope: [:child_id] }
  validates :child_id, presence: true
  validate :reverse_relation
  validate :same_relation

  protected

  def reverse_relation
    if self.class.exists?(parent_id: child_id, child_id: parent_id)
      errors.add(:parent_id, "とchild_idの関係が不正です")
    end
  end

  def same_relation
    errors.add(:parent_id, "とchild_idが同じです") if parent_id == child_id
  end
end
