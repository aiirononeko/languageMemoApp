# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  VALID_REGEX = /\A[\w_]+\z/i

  validates :name, length: { maximum: 50 }
  validates :address, length: { maximum: 30 }
  validates :username, length: { maximum: 30 }, uniqueness: true, allow_nil: true
  validates :username, presence: true, format: { with: VALID_REGEX }, on: :update
  validates :password, format: { with: VALID_REGEX }, on: :create
end
