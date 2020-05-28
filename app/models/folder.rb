class Folder < ApplicationRecord
  belongs_to :user

  has_many :posts, dependent: :destroy

  validates :name, presence: true, length: { maximum: 50 }
  validates :public, inclusion: { in: [true, false] }
  validates :parent_id, presence: true, allow_nil: true
end
