# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  has_many :posts, dependent: :destroy
  has_many :folders, dependent: :destroy
  has_one_attached :avatar

  VALID_USERNAME_REGEX = /\A[\w_]+\z/i
  VALID_PASSWORD_REGEX = /\A[!-~]+\z/

  validates :name, length: { maximum: 50 }
  validates :address, length: { maximum: 30 }
  validates :username, length: { maximum: 30 }, uniqueness: true, allow_nil: true, presence: true, format: { with: VALID_USERNAME_REGEX }
  validates :password, presence: true, format: { with: VALID_PASSWORD_REGEX }, allow_nil: true
  validate :avatar_content_type, if: :was_attached?

  def avatar_content_type
    extension = ['image/png', 'image/jpg', 'image/jpeg']
    errors.add(:avatar, "の拡張子が間違っています") unless avatar.content_type.in?(extension)
  end

  def was_attached?
    self.avatar.attached?
  end
end
