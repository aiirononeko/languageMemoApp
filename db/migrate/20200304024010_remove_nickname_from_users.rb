class RemoveNicknameFromUsers < ActiveRecord::Migration[5.2]
  def up
    remove_column :users, :nickname
  end

  def down
    add_column :users, :nickname, :string
  end
end
