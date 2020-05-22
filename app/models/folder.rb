class Folder < ApplicationRecord
  belongs_to :user

  has_many :posts, dependent: :destroy

  validates :name, presence: true, length: { maximum: 50 }
  validates :public, inclusion: { in: [true, false] }
end
