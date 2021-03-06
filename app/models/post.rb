class Post < ApplicationRecord
  belongs_to :user
  belongs_to :folder, optional: true

  validates :name, presence: true, length: { maximum: 100 }
  validates :content, presence: true
  validates :public, inclusion: { in: [true, false] }
end
